<?php

class PrintQuoteController {

    public static function handleRequest(string $method): void {
        if ($method !== 'POST') {
            http_response_code(405);
            echo json_encode(['error' => 'Method Not Allowed']);
            return;
        }

        $data = json_decode(file_get_contents('php://input'), true);
        if (!is_array($data)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid JSON']);
            return;
        }

        $name = trim($data['name'] ?? '');
        $email = trim($data['email'] ?? '');
        $items = $data['items'] ?? [];

        if (empty($name)) {
            http_response_code(400);
            echo json_encode(['error' => 'Name is required.']);
            return;
        }
        if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(['error' => 'A valid email is required.']);
            return;
        }
        if (!is_array($items) || empty($items)) {
            http_response_code(400);
            echo json_encode(['error' => 'Please select at least one product.']);
            return;
        }

        $phone = trim($data['phone'] ?? '');
        $quantity = trim($data['quantity'] ?? '');
        $notes = trim($data['notes'] ?? '');

        // Try sending notification email if mail/SMTP configured
        self::sendNotificationEmail($name, $email, $phone, $items, $quantity, $notes);

        http_response_code(201);
        echo json_encode([
            'success' => true,
            'message' => 'Quote request received. Our team will be in touch within 24 hours.',
        ]);
    }

    private static function sendNotificationEmail(string $name, string $email, string $phone, array $items, string $quantity, string $notes): void {
        $subject = "New Print Quote Request from {$name} — Brand Envoy Africa";
        $itemListHtml = "<ul>" . implode("", array_map(fn($i) => "<li>" . htmlspecialchars($i) . "</li>", $items)) . "</ul>";

        $body = "<p><strong>Name:</strong> " . htmlspecialchars($name) . "</p>" .
                "<p><strong>Email:</strong> <a href='mailto:" . htmlspecialchars($email) . "'>" . htmlspecialchars($email) . "</a></p>" .
                "<p><strong>Phone:</strong> " . htmlspecialchars($phone ?: "—") . "</p>" .
                "<p><strong>Quantity:</strong> " . htmlspecialchars($quantity ?: "—") . "</p>" .
                "<div style='margin-top:15px;'><strong>Items Requested:</strong>" . $itemListHtml . "</div>";

        if (!empty($notes)) {
            $body .= "<div style='margin-top:15px;padding:12px;background:#f9fafb;border-radius:4px;'><strong>Notes:</strong><br>" . nl2br(htmlspecialchars($notes)) . "</div>";
        }

        $htmlContent = Mailer::buildBrandedTemplate("New Print & Merchandise Quote Request", $body);
        Mailer::send($subject, $htmlContent);
    }
}
