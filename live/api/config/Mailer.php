<?php
/**
 * Standalone SMTP Mailer Helper with STARTTLS and HTML Branding
 */
class Mailer {

    public static function send(string $subject, string $htmlContent, ?string $toEmail = null): bool {
        $host     = $_ENV['SMTP_HOST'] ?? getenv('SMTP_HOST') ?: 'smtp.zeptomail.com';
        $port     = (int)($_ENV['SMTP_PORT'] ?? getenv('SMTP_PORT') ?: 587);
        $username = $_ENV['SMTP_USER'] ?? getenv('SMTP_USER') ?: '';
        $password = $_ENV['SMTP_PASS'] ?? getenv('SMTP_PASS') ?: '';
        $fromEmail = $_ENV['FROM_EMAIL'] ?? getenv('FROM_EMAIL') ?: 'noreply@templeobike.com';
        $fromName  = $_ENV['FROM_NAME'] ?? getenv('FROM_NAME') ?: 'Brand Envoy Africa';
        $recipient = $toEmail ?: ($_ENV['TO_EMAIL'] ?? getenv('TO_EMAIL') ?: 'admin@templeobike.com');

        if (empty($username) || empty($password)) {
            error_log("SMTP credentials missing. Email skipped.");
            return false;
        }

        try {
            $socket = fsockopen($host, $port, $errno, $errstr, 15);
            if (!$socket) {
                error_log("Failed to connect to SMTP server {$host}:{$port} - {$errstr}");
                return false;
            }

            self::getResponse($socket);

            fwrite($socket, "EHLO " . gethostname() . "\r\n");
            self::getResponse($socket);

            // Initiate STARTTLS for port 587
            if ($port === 587 || $port === 25) {
                fwrite($socket, "STARTTLS\r\n");
                $res = self::getResponse($socket);
                if (strpos($res, '220') === false) {
                    error_log("STARTTLS failed: {$res}");
                    fclose($socket);
                    return false;
                }

                $crypto = stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT | STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT);
                if (!$crypto) {
                    error_log("Crypto negotiation failed.");
                    fclose($socket);
                    return false;
                }

                // Send EHLO again after TLS handshake
                fwrite($socket, "EHLO " . gethostname() . "\r\n");
                self::getResponse($socket);
            }

            // Authenticate using AUTH LOGIN
            fwrite($socket, "AUTH LOGIN\r\n");
            self::getResponse($socket);

            fwrite($socket, base64_encode($username) . "\r\n");
            self::getResponse($socket);

            fwrite($socket, base64_encode($password) . "\r\n");
            $authRes = self::getResponse($socket);
            if (strpos($authRes, '235') === false) {
                error_log("SMTP authentication failed: {$authRes}");
                fclose($socket);
                return false;
            }

            // Envelope headers
            fwrite($socket, "MAIL FROM: <{$fromEmail}>\r\n");
            self::getResponse($socket);

            fwrite($socket, "RCPT TO: <{$recipient}>\r\n");
            self::getResponse($socket);

            fwrite($socket, "DATA\r\n");
            self::getResponse($socket);

            // Construct MIME headers and HTML payload
            $headers = [
                "From: {$fromName} <{$fromEmail}>",
                "To: <{$recipient}>",
                "Subject: {$subject}",
                "MIME-Version: 1.0",
                "Content-Type: text/html; charset=UTF-8",
                "Date: " . date('r'),
                "X-Mailer: BrandEnvoyPHP/1.0",
            ];

            $body = implode("\r\n", $headers) . "\r\n\r\n" . $htmlContent . "\r\n.\r\n";
            fwrite($socket, $body);
            $dataRes = self::getResponse($socket);

            fwrite($socket, "QUIT\r\n");
            fclose($socket);

            return strpos($dataRes, '250') !== false;

        } catch (\Throwable $e) {
            error_log("Mailer Exception: " . $e->getMessage());
            return false;
        }
    }

    public static function buildBrandedTemplate(string $title, string $bodyContent): string {
        $logoSvg = '<svg width="180" height="40" viewBox="0 0 200 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="8" fill="#FF5733"/>
            <path d="M12 12H28V16H16V22H26V26H16V32H12V12Z" fill="white"/>
            <text x="50" y="28" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#111827">BRAND</text>
            <text x="128" y="28" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#FF5733">ENVOY</text>
        </svg>';

        return <<<HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{$title}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: Arial, Helvetica, sans-serif; color: #1f2937;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f3f4f6; padding: 30px 10px;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border: 1px solid #e5e7eb;">
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #0f172a; padding: 24px 32px; text-align: left; border-bottom: 3px solid #FF5733;">
                            {$logoSvg}
                            <div style="color: #94a3b8; font-size: 13px; margin-top: 6px; letter-spacing: 0.5px;">BRAND ENVOY AFRICA</div>
                        </td>
                    </tr>
                    <!-- Title Bar -->
                    <tr>
                        <td style="background-color: #FF5733; padding: 14px 32px; color: #ffffff; font-size: 16px; font-weight: bold;">
                            {$title}
                        </td>
                    </tr>
                    <!-- Main Body Content -->
                    <tr>
                        <td style="padding: 32px; font-size: 15px; line-height: 1.6; color: #374151;">
                            {$bodyContent}
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8fafc; padding: 20px 32px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #64748b; text-align: center;">
                            Sent to <strong>templeobike.com</strong> &bull; Brand Envoy Africa &bull; Creative Branding &amp; Media Agency<br>
                            Lagos &bull; Accra &bull; Nairobi
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
HTML;
    }

    private static function getResponse($socket): string {
        $response = '';
        while ($str = fgets($socket, 512)) {
            $response .= $str;
            if (substr($str, 3, 1) === ' ') {
                break;
            }
        }
        return $response;
    }
}
