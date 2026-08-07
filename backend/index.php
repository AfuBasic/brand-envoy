<?php
/**
 * Brand Envoy Africa — PHP Backend API Router
 */

// Error reporting for development
error_reporting(E_ALL);
ini_set('display_errors', '0');

// Load environment configuration
require_once __DIR__ . '/config/env.php';
loadEnv(__DIR__ . '/../.env');

// CORS Headers
$origin = $_ENV['CORS_ORIGIN'] ?? getenv('CORS_ORIGIN') ?: '*';
header("Access-Control-Allow-Origin: {$origin}");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Handle OPTIONS preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Autoload Controllers & Core Files
require_once __DIR__ . '/config/Database.php';
require_once __DIR__ . '/config/Mailer.php';
require_once __DIR__ . '/controllers/ContactController.php';
require_once __DIR__ . '/controllers/AffiliateController.php';
require_once __DIR__ . '/controllers/BlogController.php';
require_once __DIR__ . '/controllers/PrintQuoteController.php';

// Parse Request URI
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$requestUri = rtrim($requestUri, '/');
$method = $_SERVER['REQUEST_METHOD'];

// Parse query params
$query = [];
parse_str($_SERVER['QUERY_STRING'] ?? '', $query);

// Split path into segments
$parts = array_values(array_filter(explode('/', $requestUri)));

// Remove leading subdirectory if any, ensuring 'api' is matched correctly
$apiIndex = array_search('api', $parts);
if ($apiIndex !== false) {
    $parts = array_slice($parts, $apiIndex);
}

// Router Logic
if (empty($parts) || $parts[0] !== 'api') {
    http_response_code(404);
    echo json_encode(['error' => 'API route not found']);
    exit;
}

$route = $parts[1] ?? 'health';

switch ($route) {
    case 'health':
        if ($method === 'GET') {
            echo json_encode([
                'status'    => 'healthy',
                'timestamp' => date('c'),
                'php'       => phpversion(),
            ]);
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Method Not Allowed']);
        }
        break;

    case 'contact':
        ContactController::handleRequest($method, $parts, $query);
        break;

    case 'affiliates':
        AffiliateController::handleRequest($method, $parts, $query);
        break;

    case 'blog':
        BlogController::handleRequest($method, $parts, $query);
        break;

    case 'print-quote':
        PrintQuoteController::handleRequest($method);
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found']);
        break;
}
