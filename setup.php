<?php
/**
 * Database Setup Script for JobRescue
 * Access this file once via browser to setup the database automatically
 * URL: http://localhost/info-loker/setup.php
 */

error_reporting(E_ALL);
ini_set('display_errors', 1);

$DB_HOST = '127.0.0.1';
$DB_USER = 'root';
$DB_PASS = '';
$DB_NAME = 'job-rescue';

$messages = [];
$errors = [];

// Step 1: Connect to MySQL (without database)
$mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS);
if ($mysqli->connect_errno) {
    $errors[] = "Failed to connect to MySQL: " . $mysqli->connect_error;
} else {
    $messages[] = "✓ Connected to MySQL server";
    
    // Step 2: Create database
    $mysqli->set_charset('utf8mb4');
    $sql = "CREATE DATABASE IF NOT EXISTS `{$DB_NAME}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
    if ($mysqli->query($sql)) {
        $messages[] = "✓ Database '{$DB_NAME}' created or already exists";
    } else {
        $errors[] = "Failed to create database: " . $mysqli->error;
    }
    
    // Step 3: Select database
    if ($mysqli->select_db($DB_NAME)) {
        $messages[] = "✓ Selected database '{$DB_NAME}'";
        
        // Step 4: Create users table
        $sql = "CREATE TABLE IF NOT EXISTS `users` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `name` VARCHAR(255) NOT NULL,
            `email` VARCHAR(255) NOT NULL UNIQUE,
            `password_hash` VARCHAR(255) NOT NULL,
            `role` ENUM('user', 'admin') DEFAULT 'user',
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX `idx_email` (`email`),
            INDEX `idx_role` (`role`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";
        
        if ($mysqli->query($sql)) {
            $messages[] = "✓ Table 'users' created or already exists";
        } else {
            $errors[] = "Failed to create users table: " . $mysqli->error;
        }
        
        // Step 5: Insert default admin user
        $adminEmail = 'admin@jobrescue.local';
        $adminPassword = 'admin123';
        $adminHash = password_hash($adminPassword, PASSWORD_BCRYPT);
        
        $stmt = $mysqli->prepare("INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, 'admin') ON DUPLICATE KEY UPDATE name=?, password_hash=?");
        $adminName = 'Administrator';
        $stmt->bind_param('sssss', $adminName, $adminEmail, $adminHash, $adminName, $adminHash);
        
        if ($stmt->execute()) {
            $messages[] = "✓ Admin user created/updated (email: {$adminEmail}, password: {$adminPassword})";
        } else {
            $errors[] = "Failed to create admin user: " . $stmt->error;
        }
        
        // Step 6: Insert demo user (elang@gmail.com)
        $demoEmail = 'elang@gmail.com';
        $demoPassword = '11111111';
        $demoHash = password_hash($demoPassword, PASSWORD_BCRYPT);
        
        $stmt = $mysqli->prepare("INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, 'user') ON DUPLICATE KEY UPDATE name=?, password_hash=?");
        $demoName = 'Elang Demo';
        $stmt->bind_param('sssss', $demoName, $demoEmail, $demoHash, $demoName, $demoHash);
        
        if ($stmt->execute()) {
            $messages[] = "✓ Demo user created/updated (email: {$demoEmail}, password: {$demoPassword})";
        } else {
            $errors[] = "Failed to create demo user: " . $stmt->error;
        }
        
    } else {
        $errors[] = "Failed to select database: " . $mysqli->error;
    }
    
    $mysqli->close();
}

?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Database Setup - JobRescue</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            max-width: 600px;
            width: 100%;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        h1 {
            color: #667eea;
            margin-bottom: 10px;
            font-size: 2rem;
        }
        .subtitle {
            color: #666;
            margin-bottom: 30px;
            font-size: 1rem;
        }
        .message, .error {
            padding: 12px 16px;
            margin-bottom: 10px;
            border-radius: 8px;
            font-size: 0.95rem;
        }
        .message {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        .error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        .status {
            margin-top: 30px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 10px;
            border-left: 4px solid #667eea;
        }
        .status h2 {
            color: #333;
            margin-bottom: 15px;
            font-size: 1.3rem;
        }
        .btn {
            display: inline-block;
            padding: 12px 24px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            margin-top: 20px;
            font-weight: 600;
            transition: transform 0.2s;
        }
        .btn:hover {
            transform: translateY(-2px);
        }
        .success-icon {
            font-size: 3rem;
            text-align: center;
            margin-bottom: 20px;
        }
        code {
            background: #f4f4f4;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <div class="container">
        <?php if (empty($errors)): ?>
            <div class="success-icon">✅</div>
            <h1>Setup Berhasil!</h1>
            <p class="subtitle">Database JobRescue telah berhasil diinisialisasi</p>
        <?php else: ?>
            <div class="success-icon">⚠️</div>
            <h1>Setup Selesai dengan Peringatan</h1>
            <p class="subtitle">Beberapa langkah gagal, silakan periksa error di bawah</p>
        <?php endif; ?>
        
        <?php foreach ($messages as $msg): ?>
            <div class="message"><?= htmlspecialchars($msg) ?></div>
        <?php endforeach; ?>
        
        <?php foreach ($errors as $err): ?>
            <div class="error"><?= htmlspecialchars($err) ?></div>
        <?php endforeach; ?>
        
        <?php if (empty($errors)): ?>
            <div class="status">
                <h2>Kredensial Login</h2>
                <p><strong>Admin:</strong></p>
                <p>Email: <code>admin@jobrescue.local</code></p>
                <p>Password: <code>admin123</code></p>
                <br>
                <p><strong>Demo User:</strong></p>
                <p>Email: <code>elang@gmail.com</code></p>
                <p>Password: <code>11111111</code></p>
            </div>
            
            <a href="login.html" class="btn">🚀 Mulai Login</a>
            <a href="admin-login.html" class="btn">🔐 Login Admin</a>
        <?php else: ?>
            <div class="status">
                <h2>Troubleshooting</h2>
                <p>1. Pastikan XAMPP MySQL sudah berjalan</p>
                <p>2. Periksa kredensial database di <code>api/db.php</code></p>
                <p>3. Pastikan user MySQL memiliki permission untuk CREATE DATABASE</p>
            </div>
            <a href="setup.php" class="btn">🔄 Coba Lagi</a>
        <?php endif; ?>
    </div>
</body>
</html>
