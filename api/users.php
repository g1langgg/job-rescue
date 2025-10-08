<?php
require_once __DIR__.'/db.php';
require_once __DIR__.'/util.php';
session_start();

function ensure_admin() {
  if (!isset($_SESSION['user']) || ($_SESSION['user']['role'] ?? '') !== 'admin') {
    respond([ 'ok' => false, 'error' => 'FORBIDDEN' ], 403);
    exit;
  }
}

$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'GET') { ensure_admin();
  $q = $mysqli->query('SELECT id,name,email,role FROM users ORDER BY id DESC');
  $rows = [];
  while($r = $q->fetch_assoc()) $rows[] = $r;
  respond([ 'ok' => true, 'users' => $rows ]);
  exit;
}

if ($method === 'POST') { ensure_admin();
  $b = json_body();
  if (!isset($b['name'],$b['email'],$b['password'],$b['role'])) respond([ 'ok'=>false,'error'=>'INVALID_INPUT' ],400);
  $hash = hash_password($b['password']);
  $stmt = $mysqli->prepare('INSERT INTO users(name,email,password_hash,role) VALUES(?,?,?,?)');
  $stmt->bind_param('ssss', $b['name'], $b['email'], $hash, $b['role']);
  $stmt->execute();
  respond([ 'ok' => true, 'id' => $mysqli->insert_id ]);
  exit;
}

if ($method === 'DELETE') { ensure_admin();
  $id = intval($_GET['id'] ?? 0);
  $stmt = $mysqli->prepare('DELETE FROM users WHERE id=?');
  $stmt->bind_param('i', $id);
  $stmt->execute();
  respond([ 'ok' => true ]);
  exit;
}

respond([ 'ok' => false, 'error' => 'NOT_FOUND' ], 404);
?>





