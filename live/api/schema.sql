-- Brand Envoy Africa MySQL Schema

CREATE DATABASE IF NOT EXISTS brand_envoy_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE brand_envoy_db;

-- Contacts / Brief Submissions Table
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255) NULL,
    phone VARCHAR(100) NULL,
    tier VARCHAR(50) NOT NULL, -- sme | enterprise | campaign
    message TEXT NOT NULL,
    budget VARCHAR(100) NULL,
    market VARCHAR(255) NULL,
    office_level VARCHAR(100) NULL,
    services JSON NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Affiliate Products Table
CREATE TABLE IF NOT EXISTS affiliates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    affiliate_url TEXT NOT NULL,
    product_info TEXT NOT NULL,
    generated_copy TEXT NULL,
    image_url TEXT NULL,
    category VARCHAR(100) NULL,
    published TINYINT(1) NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
