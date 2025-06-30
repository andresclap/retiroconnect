<?php
require 'db.php';

$user_id = $_GET['user_id'] ?? null;

if (!$user_id) {
  echo json_encode(['error' => 'No user_id']);
  exit;
}

// Obtener la última emoción del usuario
$sql_estado = "SELECT emocion_detectada FROM estado_emocional_usuario 
               WHERE user_id = $user_id ORDER BY fecha DESC LIMIT 1";
$res_estado = $conn->query($sql_estado);
$emocion_texto = $res_estado->fetch_assoc()['emocion_detectada'] ?? null;

$emocion_id = null;
if ($emocion_texto) {
  $sql_emocion_id = "SELECT id FROM emociones_catalogo WHERE emocion = '$emocion_texto' LIMIT 1";
  $res_id = $conn->query($sql_emocion_id);
  if ($res_id && $row = $res_id->fetch_assoc()) {
    $emocion_id = $row['id'];
  }
}

if ($emocion_id) {
  $sql = "SELECT * FROM eventos WHERE emocion_id = $emocion_id AND activo = 1";
} else {
  $sql = "SELECT * FROM eventos WHERE activo = 1";
}

$res_eventos = $conn->query($sql);
$eventos = [];

while ($row = $res_eventos->fetch_assoc()) {
  $eventos[] = $row;
}

echo json_encode($eventos);
?>
