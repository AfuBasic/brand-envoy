<?php
/**
 * Simple Dotenv Parser
 * Loads key-value pairs from .env into $_ENV, $_SERVER, and getenv()
 */
function loadEnv(string $path): void {
    if (!file_exists($path)) {
        // Fallback to current directory .env if path doesn't exist
        $altPath = __DIR__ . '/../.env';
        if (file_exists($altPath)) {
            $path = $altPath;
        } else {
            $dirPath = __DIR__ . '/.env';
            if (file_exists($dirPath)) {
                $path = $dirPath;
            } else {
                return;
            }
        }
    }

    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || strpos($line, '#') === 0) {
            continue;
        }

        if (strpos($line, '=') !== false) {
            list($name, $value) = explode('=', $line, 2);
            $name = trim($name);
            $value = trim($value);

            // Remove surrounding quotes if present
            if ((strpos($value, '"') === 0 && substr($value, -1) === '"') ||
                (strpos($value, "'") === 0 && substr($value, -1) === "'")) {
                $value = substr($value, 1, -1);
            }

            if (!array_key_exists($name, $_SERVER) && !array_key_exists($name, $_ENV)) {
                putenv("{$name}={$value}");
                $_ENV[$name] = $value;
                $_SERVER[$name] = $value;
            }
        }
    }
}
