<?php
// Database connection for XAMPP local
// Update credentials if needed
$DB_HOST = getenv('DB_HOST') ?: '127.0.0.1';
$DB_USER = getenv('DB_USER') ?: 'root';
$DB_PASS = getenv('DB_PASS') ?: '';
$DB_NAME = getenv('DB_NAME') ?: 'job-rescue';

$mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
if ($mysqli->connect_errno) {
  http_response_code(500);
  header('Content-Type: application/json');
  echo json_encode([ 'ok' => false, 'error' => 'DB_CONNECT_ERROR', 'detail' => $mysqli->connect_error ]);
  exit;
}
$mysqli->set_charset('utf8mb4');
?>





