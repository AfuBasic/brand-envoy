<?php

class AffiliateController {

    public static function handleRequest(string $method, array $uriParts, array $query): void {
        // Route matching logic
        // Parts after 'api/affiliates':
        // [] -> /api/affiliates
        // ['stats'] -> /api/affiliates/stats
        // ['{id}'] -> /api/affiliates/:id
        // ['{id}', 'publish'] -> /api/affiliates/:id/publish

        $sub = $uriParts[2] ?? null;
        $sub2 = $uriParts[3] ?? null;

        if ($sub === null) {
            if ($method === 'GET') self::listAffiliates($query);
            elseif ($method === 'POST') self::createAffiliate();
            else self::methodNotAllowed();
        } elseif ($sub === 'stats') {
            if ($method === 'GET') self::getStats();
            else self::methodNotAllowed();
        } elseif (is_numeric($sub)) {
            $id = (int)$sub;
            if ($sub2 === null) {
                if ($method === 'GET') self::getAffiliate($id);
                elseif ($method === 'PUT') self::updateAffiliate($id);
                elseif ($method === 'DELETE') self::deleteAffiliate($id);
                else self::methodNotAllowed();
            } elseif ($sub2 === 'publish') {
                if ($method === 'POST') self::publishAffiliate($id);
                else self::methodNotAllowed();
            } else {
                self::notFound();
            }
        } else {
            self::notFound();
        }
    }

    private static function generateCopy(string $productName, string $productInfo): string {
        $snippet = mb_strlen($productInfo) > 200 ? mb_substr($productInfo, 0, 200) . '...' : $productInfo;
        return "Discover {$productName} — {$snippet} We've vetted this product and believe it delivers real value. As an affiliate partner, we earn a commission at no extra cost to you.";
    }

    private static function listAffiliates(array $query): void {
        $publishedOnly = isset($query['publishedOnly']) ? filter_var($query['publishedOnly'], FILTER_VALIDATE_BOOLEAN) : true;
        $category = $query['category'] ?? null;
        $limit = isset($query['limit']) ? (int)$query['limit'] : 20;
        $offset = isset($query['offset']) ? (int)$query['offset'] : 0;

        $db = Database::getConnection();

        $where = [];
        $params = [];

        if ($publishedOnly) {
            $where[] = "published = 1";
        }
        if (!empty($category)) {
            $where[] = "category = :category";
            $params[':category'] = $category;
        }

        $sql = "SELECT * FROM affiliates";
        if (!empty($where)) {
            $sql .= " WHERE " . implode(" AND ", $where);
        }
        $sql .= " ORDER BY created_at DESC LIMIT :limit OFFSET :offset";

        $stmt = $db->prepare($sql);
        foreach ($params as $key => $val) {
            $stmt->bindValue($key, $val, PDO::PARAM_STR);
        }
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();

        $rows = $stmt->fetchAll();
        foreach ($rows as &$row) {
            self::formatRow($row);
        }

        echo json_encode($rows);
    }

    private static function createAffiliate(): void {
        $data = json_decode(file_get_contents('php://input'), true);

        if (!is_array($data) || empty($data['productName']) || empty($data['affiliateUrl']) || empty($data['productInfo'])) {
            http_response_code(400);
            echo json_encode(['error' => 'productName, affiliateUrl, and productInfo are required']);
            return;
        }

        $copy = !empty($data['generatedCopy']) 
            ? $data['generatedCopy'] 
            : self::generateCopy($data['productName'], $data['productInfo']);

        $db = Database::getConnection();
        $stmt = $db->prepare("
            INSERT INTO affiliates (product_name, affiliate_url, product_info, generated_copy, image_url, category, published)
            VALUES (:productName, :affiliateUrl, :productInfo, :generatedCopy, :imageUrl, :category, :published)
        ");

        $published = isset($data['published']) ? (int)(bool)$data['published'] : 0;

        $stmt->execute([
            ':productName'   => trim($data['productName']),
            ':affiliateUrl'  => trim($data['affiliateUrl']),
            ':productInfo'   => trim($data['productInfo']),
            ':generatedCopy' => $copy,
            ':imageUrl'      => $data['imageUrl'] ?? null,
            ':category'      => $data['category'] ?? null,
            ':published'     => $published,
        ]);

        $id = (int)$db->lastInsertId();
        self::getAffiliate($id, 201);
    }

    private static function getStats(): void {
        $db = Database::getConnection();

        $totalsStmt = $db->query("
            SELECT 
                COUNT(*) as total,
                SUM(CASE WHEN published = 1 THEN 1 ELSE 0 END) as published,
                SUM(CASE WHEN published = 0 THEN 1 ELSE 0 END) as unpublished
            FROM affiliates
        ");
        $totals = totalsStmt->fetch() ?: ['total' => 0, 'published' => 0, 'unpublished' => 0];

        $catStmt = $db->query("
            SELECT category, COUNT(*) as count 
            FROM affiliates 
            WHERE category IS NOT NULL AND category != ''
            GROUP BY category
        ");
        $categories = [];
        while ($c = $catStmt->fetch()) {
            $categories[] = [
                'category' => $c['category'],
                'count' => (int)$c['count'],
            ];
        }

        echo json_encode([
            'total'       => (int)($totals['total'] ?? 0),
            'published'   => (int)($totals['published'] ?? 0),
            'unpublished' => (int)($totals['unpublished'] ?? 0),
            'categories'  => $categories,
        ]);
    }

    private static function getAffiliate(int $id, int $statusCode = 200): void {
        $db = Database::getConnection();
        $stmt = $db->prepare("SELECT * FROM affiliates WHERE id = :id");
        $stmt->execute([':id' => $id]);
        $row = $stmt->fetch();

        if (!$row) {
            http_response_code(404);
            echo json_encode(['error' => 'Affiliate not found']);
            return;
        }

        self::formatRow($row);
        http_response_code($statusCode);
        echo json_encode($row);
    }

    private static function updateAffiliate(int $id): void {
        $db = Database::getConnection();
        $stmt = $db->prepare("SELECT * FROM affiliates WHERE id = :id");
        $stmt->execute([':id' => $id]);
        $existing = $stmt->fetch();

        if (!$existing) {
            http_response_code(404);
            echo json_encode(['error' => 'Affiliate not found']);
            return;
        }

        $data = json_decode(file_get_contents('php://input'), true);
        if (!is_array($data)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid JSON']);
            return;
        }

        $productName = $data['productName'] ?? $existing['product_name'];
        $productInfo = $data['productInfo'] ?? $existing['product_info'];

        $generatedCopy = $data['generatedCopy'] ?? null;
        if ($generatedCopy === null && isset($data['productInfo'])) {
            $generatedCopy = self::generateCopy($productName, $productInfo);
        } elseif ($generatedCopy === null) {
            $generatedCopy = $existing['generated_copy'];
        }

        $updateStmt = $db->prepare("
            UPDATE affiliates SET 
                product_name = :productName,
                affiliate_url = :affiliateUrl,
                product_info = :productInfo,
                generated_copy = :generatedCopy,
                image_url = :imageUrl,
                category = :category,
                published = :published
            WHERE id = :id
        ");

        $updateStmt->execute([
            ':productName'   => $productName,
            ':affiliateUrl'  => $data['affiliateUrl'] ?? $existing['affiliate_url'],
            ':productInfo'   => $productInfo,
            ':generatedCopy' => $generatedCopy,
            ':imageUrl'      => array_key_exists('imageUrl', $data) ? $data['imageUrl'] : $existing['image_url'],
            ':category'      => array_key_exists('category', $data) ? $data['category'] : $existing['category'],
            ':published'     => isset($data['published']) ? (int)(bool)$data['published'] : (int)$existing['published'],
            ':id'            => $id,
        ]);

        self::getAffiliate($id);
    }

    private static function deleteAffiliate(int $id): void {
        $db = Database::getConnection();
        $stmt = $db->prepare("DELETE FROM affiliates WHERE id = :id");
        $stmt->execute([':id' => $id]);

        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(['error' => 'Affiliate not found']);
            return;
        }

        http_response_code(204);
    }

    private static function publishAffiliate(int $id): void {
        $data = json_decode(file_get_contents('php://input'), true);
        if (!is_array($data) || !isset($data['published'])) {
            http_response_code(400);
            echo json_encode(['error' => 'published field is required']);
            return;
        }

        $published = (int)(bool)$data['published'];

        $db = Database::getConnection();
        $stmt = $db->prepare("UPDATE affiliates SET published = :published WHERE id = :id");
        $stmt->execute([':published' => $published, ':id' => $id]);

        if ($stmt->rowCount() === 0 && !self::exists($id)) {
            http_response_code(404);
            echo json_encode(['error' => 'Affiliate not found']);
            return;
        }

        self::getAffiliate($id);
    }

    private static function exists(int $id): bool {
        $db = Database::getConnection();
        $stmt = $db->prepare("SELECT 1 FROM affiliates WHERE id = :id");
        $stmt->execute([':id' => $id]);
        return (bool)$stmt->fetchColumn();
    }

    private static function formatRow(array &$row): void {
        $row['id'] = (int)$row['id'];
        $row['productName'] = $row['product_name'] ?? '';
        $row['affiliateUrl'] = $row['affiliate_url'] ?? '';
        $row['productInfo'] = $row['product_info'] ?? '';
        $row['generatedCopy'] = $row['generated_copy'] ?? '';
        $row['imageUrl'] = $row['image_url'] ?? null;
        $row['published'] = (bool)$row['published'];
        $row['createdAt'] = $row['created_at'] ?? date('c');
        $row['updatedAt'] = $row['updated_at'] ?? date('c');

        unset($row['product_name'], $row['affiliate_url'], $row['product_info'], $row['generated_copy'], $row['image_url'], $row['created_at'], $row['updated_at']);
    }

    private static function methodNotAllowed(): void {
        http_response_code(405);
        echo json_encode(['error' => 'Method Not Allowed']);
    }

    private static function notFound(): void {
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint Not Found']);
    }
}
