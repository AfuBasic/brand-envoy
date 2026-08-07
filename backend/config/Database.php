<?php
/**
 * Database Connection Manager (MySQL PDO)
 */
class Database {
    private static ?PDO $instance = null;

    public static function getConnection(): PDO {
        if (self::$instance === null) {
            $host = $_ENV['DB_HOST'] ?? getenv('DB_HOST') ?: '127.0.0.1';
            $port = $_ENV['DB_PORT'] ?? getenv('DB_PORT') ?: '3306';
            $dbname = $_ENV['DB_NAME'] ?? getenv('DB_NAME') ?: 'brand_envoy_db';
            $user = $_ENV['DB_USER'] ?? getenv('DB_USER') ?: 'root';
            $pass = $_ENV['DB_PASS'] ?? getenv('DB_PASS') ?: '';

            $dsn = "mysql:host={$host};port={$port};dbname={$dbname};charset=utf8mb4";

            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];

            try {
                self::$instance = new PDO($dsn, $user, $pass, $options);
            } catch (PDOException $e) {
                // If database doesn't exist yet, try connecting without dbname and create it
                if ($e->getCode() == 1049) {
                    try {
                        $tmpDsn = "mysql:host={$host};port={$port};charset=utf8mb4";
                        $pdo = new PDO($tmpDsn, $user, $pass, $options);
                        $pdo->exec("CREATE DATABASE IF NOT EXISTS `{$dbname}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
                        self::$instance = new PDO($dsn, $user, $pass, $options);
                    } catch (PDOException $ex) {
                        http_response_code(500);
                        echo json_encode(["error" => "Database connection failed: " . $ex->getMessage()]);
                        exit;
                    }
                } else {
                    http_response_code(500);
                    echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
                    exit;
                }
            }
        }
        return self::$instance;
    }
}
