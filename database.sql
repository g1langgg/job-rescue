-- JobRescue Database Schema
-- Run this file in phpMyAdmin or MySQL CLI to setup the database

CREATE DATABASE IF NOT EXISTS `job-rescue` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `job-rescue`;

-- Users table
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('user', 'admin') DEFAULT 'user',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_email` (`email`),
  INDEX `idx_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default admin user
-- Email: admin@jobrescue.local
-- Password: admin123
INSERT INTO `users` (`name`, `email`, `password_hash`, `role`) VALUES
('Administrator', 'admin@jobrescue.local', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin')
ON DUPLICATE KEY UPDATE `name`='Administrator';

-- Insert demo user for testing
-- Email: elang@gmail.com
-- Password: 11111111
INSERT INTO `users` (`name`, `email`, `password_hash`, `role`) VALUES
('Elang Demo', 'elang@gmail.com', '$2y$10$YourHashedPasswordHere', 'user')
ON DUPLICATE KEY UPDATE `name`='Elang Demo';
