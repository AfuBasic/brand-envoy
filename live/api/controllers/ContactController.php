<?php

class ContactController {

    public static function handleRequest(string $method, array $uriParts, array $query): void {
        if ($method === 'POST') {
            self::submitContact();
        } elseif ($method === 'GET') {
            self::listContacts($query);
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Method Not Allowed']);
        }
    }

    private static function submitContact(): void {
        $rawInput = file_get_contents('php://input');
        $data = json_decode($rawInput, true);

        if (!is_array($data)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid JSON body']);
            return;
        }

        $name = trim($data['name'] ?? '');
        $email = trim($data['email'] ?? '');
        $tier = trim($data['tier'] ?? '');
        $message = trim($data['message'] ?? '');

        if (empty($name) || empty($email) || empty($tier) || empty($message)) {
            http_response_code(400);
            echo json_encode(['error' => 'Name, email, tier, and message are required fields.']);
            return;
        }

        $db = Database::getConnection();
        $stmt = $db->prepare("
            INSERT INTO contacts (name, email, company, phone, tier, message, budget, market, office_level, services)
            VALUES (:name, :email, :company, :phone, :tier, :message, :budget, :market, :office_level, :services)
        ");

        $servicesJson = isset($data['services']) && is_array($data['services']) 
            ? json_encode($data['services']) 
            : null;

        $stmt->execute([
            ':name'         => $name,
            ':email'        => $email,
            ':company'      => $data['company'] ?? null,
            ':phone'        => $data['phone'] ?? null,
            ':tier'         => $tier,
            ':message'      => $message,
            ':budget'       => $data['budget'] ?? null,
            ':market'       => $data['market'] ?? null,
            ':office_level' => $data['officeLevel'] ?? null,
            ':services'     => $servicesJson,
        ]);

        $id = (int)$db->lastInsertId();

        $fetchStmt = $db->prepare("SELECT * FROM contacts WHERE id = :id");
        $fetchStmt->execute([':id' => $id]);
        $row = $fetchStmt->fetch();

        self::formatContactRow($row);

        // Dispatch branded email notification to templeobike.com
        $subject = "New " . strtoupper($tier) . " Lead: " . $name . " — Brand Envoy Africa";
        $htmlContent = Mailer::buildBrandedTemplate(
            "New Inbound Lead Submission (" . strtoupper($tier) . ")",
            "<p><strong>Name:</strong> " . htmlspecialchars($name) . "</p>" .
            "<p><strong>Email:</strong> <a href='mailto:" . htmlspecialchars($email) . "'>" . htmlspecialchars($email) . "</a></p>" .
            "<p><strong>Phone:</strong> " . htmlspecialchars($data['phone'] ?? '—') . "</p>" .
            "<p><strong>Company:</strong> " . htmlspecialchars($data['company'] ?? '—') . "</p>" .
            "<p><strong>Tier:</strong> " . htmlspecialchars(strtoupper($tier)) . "</p>" .
            "<p><strong>Budget:</strong> " . htmlspecialchars($data['budget'] ?? '—') . "</p>" .
            "<p><strong>Market:</strong> " . htmlspecialchars($data['market'] ?? '—') . "</p>" .
            "<p><strong>Office Level:</strong> " . htmlspecialchars($data['officeLevel'] ?? '—') . "</p>" .
            "<div style='margin-top:15px;padding:15px;background:#f9fafb;border-left:4px solid #FF5733;border-radius:4px;'><strong>Message / Brief:</strong><br>" . nl2br(htmlspecialchars($message)) . "</div>"
        );
        Mailer::send($subject, $htmlContent);

        http_response_code(201);
        echo json_encode($row);
    }

    private static function listContacts(array $query): void {
        $tier = $query['tier'] ?? null;
        $limit = isset($query['limit']) ? (int)$query['limit'] : 50;
        $offset = isset($query['offset']) ? (int)$query['offset'] : 0;

        $db = Database::getConnection();

        if ($tier) {
            $stmt = $db->prepare("
                SELECT * FROM contacts 
                WHERE tier = :tier 
                ORDER BY created_at DESC 
                LIMIT :limit OFFSET :offset
            ");
            $stmt->bindValue(':tier', $tier, PDO::PARAM_STR);
        } else {
            $stmt = $db->prepare("
                SELECT * FROM contacts 
                ORDER BY created_at DESC 
                LIMIT :limit OFFSET :offset
            ");
        }

        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();

        $rows = $stmt->fetchAll();
        foreach ($rows as &$row) {
            self::formatContactRow($row);
        }

        echo json_encode($rows);
    }

    private static function formatContactRow(array &$row): void {
        $row['id'] = (int)$row['id'];
        if (isset($row['services']) && is_string($row['services'])) {
            $row['services'] = json_decode($row['services'], true) ?: [];
        } else {
            $row['services'] = [];
        }
        $row['officeLevel'] = $row['office_level'] ?? null;
        unset($row['office_level']);
        $row['createdAt'] = $row['created_at'] ?? date('c');
    }
}
