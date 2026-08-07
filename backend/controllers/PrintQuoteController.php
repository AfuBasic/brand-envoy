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
        $to = "dsfbrandenvoy@gmail.com";
        $subject = "New Quote Request from {$name} — Brand Envoy Africa";

        $itemList = implode("\n", array_map(fn($i) => "• " . htmlspecialchars($i), $items));

        $message = "New Quote Request — Brand Envoy Africa\n\n";
        $message .= "Name:     {$name}\n";
        $message .= "Email:    {$email}\n";
        $message .= "Phone:    " . ($phone ?: "—") . "\n";
        $message .= "Quantity: " . ($quantity ?: "—") . "\n\n";
        $message .= "Items Requested:\n{$itemList}\n\n";
        if (!empty($notes)) {
            $message .= "Notes:\n{$notes}\n";
        }

        $headers = "From: Brand Envoy Africa <noreply@brandsenvoy.com>\r\n";
        $headers .= "Reply-To: {$email}\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();

        // Attempt sending email via PHP native mail function
        @mail($to, $subject, $message, $headers);
    }
}
