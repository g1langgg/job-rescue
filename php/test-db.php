<?php
/**
 * Quick Database Connection Test
 * URL: http://localhost/info-loker/test-db.php
 */

error_reporting(E_ALL);
ini_set('display_errors', 1);

$DB_HOST = '127.0.0.1';
$DB_USER = 'root';
$DB_PASS = '';
$DB_NAME = 'job-rescue';

header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Database Test - JobRescue</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f5f5f5;
            padding: 20px;
            margin: 0;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 { color: #333; margin-bottom: 20px; }
        .test-item {
            padding: 15px;
            margin: 10px 0;
            border-radius: 8px;
            border-left: 4px solid #ddd;
        }
        .success {
            background: #d4edda;
            border-left-color: #28a745;
            color: #155724;
        }
        .error {
            background: #f8d7da;
            border-left-color: #dc3545;
            color: #721c24;
        }
        .info {
            background: #d1ecf1;
            border-left-color: #17a2b8;
            color: #0c5460;
        }
        pre {
            background: #f4f4f4;
            padding: 10px;
            border-radius: 5px;
            overflow-x: auto;
        }
        .btn {
            display: inline-block;
            padding: 10px 20px;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
        .btn:hover { background: #5568d3; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔍 Database Connection Test</h1>
        
        <?php
        // Test 1: MySQL Connection
        echo '<div class="test-item">';
        echo '<strong>Test 1: MySQL Server Connection</strong><br>';
        $mysqli = @new mysqli($DB_HOST, $DB_USER, $DB_PASS);
        if ($mysqli->connect_errno) {
            echo '<div class="error">❌ Failed: ' . htmlspecialchars($mysqli->connect_error) . '</div>';
            echo '<p>Pastikan MySQL di XAMPP sudah running!</p>';
        } else {
            echo '<div class="success">✅ Success: Connected to MySQL server</div>';
            
            // Test 2: Database Exists
            echo '<br><strong>Test 2: Database Exists</strong><br>';
            $result = $mysqli->query("SHOW DATABASES LIKE '{$DB_NAME}'");
            if ($result && $result->num_rows > 0) {
                echo '<div class="success">✅ Success: Database "' . htmlspecialchars($DB_NAME) . '" exists</div>';
                
                // Test 3: Select Database
                if ($mysqli->select_db($DB_NAME)) {
                    echo '<br><strong>Test 3: Users Table</strong><br>';
                    $result = $mysqli->query("SHOW TABLES LIKE 'users'");
                    if ($result && $result->num_rows > 0) {
                        echo '<div class="success">✅ Success: Table "users" exists</div>';
                        
                        // Test 4: Count Users
                        echo '<br><strong>Test 4: User Count</strong><br>';
                        $result = $mysqli->query("SELECT COUNT(*) as count FROM users");
                        if ($result) {
                            $row = $result->fetch_assoc();
                            echo '<div class="info">ℹ️ Total users: ' . $row['count'] . '</div>';
                            
                            // Test 5: List Users
                            echo '<br><strong>Test 5: User List</strong><br>';
                            $result = $mysqli->query("SELECT id, name, email, role FROM users");
                            if ($result && $result->num_rows > 0) {
                                echo '<table style="width:100%; border-collapse: collapse; margin-top:10px;">';
                                echo '<tr style="background:#f8f9fa;"><th style="padding:8px; border:1px solid #ddd;">ID</th><th style="padding:8px; border:1px solid #ddd;">Name</th><th style="padding:8px; border:1px solid #ddd;">Email</th><th style="padding:8px; border:1px solid #ddd;">Role</th></tr>';
                                while ($user = $result->fetch_assoc()) {
                                    echo '<tr>';
                                    echo '<td style="padding:8px; border:1px solid #ddd;">' . htmlspecialchars($user['id']) . '</td>';
                                    echo '<td style="padding:8px; border:1px solid #ddd;">' . htmlspecialchars($user['name']) . '</td>';
                                    echo '<td style="padding:8px; border:1px solid #ddd;">' . htmlspecialchars($user['email']) . '</td>';
                                    echo '<td style="padding:8px; border:1px solid #ddd;">' . htmlspecialchars($user['role']) . '</td>';
                                    echo '</tr>';
                                }
                                echo '</table>';
                            } else {
                                echo '<div class="info">ℹ️ No users found in database</div>';
                            }
                        }
                    } else {
                        echo '<div class="error">❌ Failed: Table "users" does not exist</div>';
                        echo '<p>Jalankan <a href="setup.php">setup.php</a> untuk membuat tabel</p>';
                    }
                }
            } else {
                echo '<div class="error">❌ Failed: Database "' . htmlspecialchars($DB_NAME) . '" does not exist</div>';
                echo '<p>Jalankan <a href="setup.php">setup.php</a> untuk membuat database</p>';
            }
            
            $mysqli->close();
        }
        echo '</div>';
        ?>
        
        <div class="test-item info">
            <strong>📋 Configuration</strong><br>
            <pre>Host: <?= htmlspecialchars($DB_HOST) ?>
User: <?= htmlspecialchars($DB_USER) ?>
Database: <?= htmlspecialchars($DB_NAME) ?></pre>
        </div>
        
        <a href="setup.php" class="btn">🔧 Run Setup</a>
        <a href="login.html" class="btn">🚀 Go to Login</a>
        <a href="test-db.php" class="btn">🔄 Refresh Test</a>
    </div>
</body>
</html>
