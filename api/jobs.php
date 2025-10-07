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
if ($method === 'GET') {
  $q = $mysqli->query('SELECT id,title,company,location,job_type as type,salary,description FROM jobs ORDER BY id DESC');
  $rows = [];
  while($r = $q->fetch_assoc()) $rows[] = $r;
  respond([ 'ok' => true, 'jobs' => $rows ]);
  exit;
}

if ($method === 'POST') { ensure_admin();
  $b = json_body();
  $stmt = $mysqli->prepare('INSERT INTO jobs(title,company,location,job_type,salary,description) VALUES(?,?,?,?,?,?)');
  $stmt->bind_param('ssssss', $b['title'], $b['company'], $b['location'], $b['type'], $b['salary'], $b['description']);
  $stmt->execute();
  respond([ 'ok' => true, 'id' => $mysqli->insert_id ]);
  exit;
}

if ($method === 'PUT') { ensure_admin();
  $b = json_body();
  $stmt = $mysqli->prepare('UPDATE jobs SET title=?,company=?,location=?,job_type=?,salary=?,description=? WHERE id=?');
  $stmt->bind_param('ssssssi', $b['title'], $b['company'], $b['location'], $b['type'], $b['salary'], $b['description'], $b['id']);
  $stmt->execute();
  respond([ 'ok' => true ]);
  exit;
}

if ($method === 'DELETE') { ensure_admin();
  $id = intval($_GET['id'] ?? 0);
  $stmt = $mysqli->prepare('DELETE FROM jobs WHERE id=?');
  $stmt->bind_param('i', $id);
  $stmt->execute();
  respond([ 'ok' => true ]);
  exit;
}

respond([ 'ok' => false, 'error' => 'NOT_FOUND' ], 404);
?>



