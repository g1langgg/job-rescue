<?php
require_once __DIR__.'/db.php';
require_once __DIR__.'/util.php';

session_start();
$method = $_SERVER['REQUEST_METHOD'];
$path = $_GET['action'] ?? '';

if ($path === 'register' && $method === 'POST') {
  $b = json_body();
  $name = trim($b['name'] ?? '');
  $email = strtolower(trim($b['email'] ?? ''));
  $password = $b['password'] ?? '';
  if (!$name || !$email || strlen($password) < 6) return respond([ 'ok' => false, 'error' => 'INVALID_INPUT' ], 400);
  $stmt = $mysqli->prepare('SELECT id FROM users WHERE email=? LIMIT 1');
  $stmt->bind_param('s', $email);
  $stmt->execute(); $stmt->store_result();
  if ($stmt->num_rows > 0) return respond([ 'ok' => false, 'error' => 'EMAIL_EXISTS' ], 409);
  $hash = hash_password($password);
  $role = 'user';
  $stmt = $mysqli->prepare('INSERT INTO users(name,email,password_hash,role) VALUES(?,?,?,?)');
  $stmt->bind_param('ssss', $name, $email, $hash, $role);
  $stmt->execute();
  return respond([ 'ok' => true ]);
}

if ($path === 'login' && $method === 'POST') {
  $b = json_body();
  $email = strtolower(trim($b['email'] ?? ''));
  $password = $b['password'] ?? '';
  $stmt = $mysqli->prepare('SELECT id,name,email,password_hash,role FROM users WHERE email=? LIMIT 1');
  $stmt->bind_param('s', $email);
  $stmt->execute(); $res = $stmt->get_result();
  $user = $res->fetch_assoc();
  if (!$user || !verify_password($password, $user['password_hash'])) return respond([ 'ok' => false, 'error' => 'INVALID_CREDENTIALS' ], 401);
  $_SESSION['user'] = [ 'id' => (int)$user['id'], 'name' => $user['name'], 'email' => $user['email'], 'role' => $user['role'] ];
  return respond([ 'ok' => true, 'user' => $_SESSION['user'] ]);
}

if ($path === 'me' && $method === 'GET') {
  return respond([ 'ok' => true, 'user' => ($_SESSION['user'] ?? null) ]);
}

if ($path === 'logout' && $method === 'POST') {
  $_SESSION = [];
  session_destroy();
  return respond([ 'ok' => true ]);
}

respond([ 'ok' => false, 'error' => 'NOT_FOUND' ], 404);
?>





