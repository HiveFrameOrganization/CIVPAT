<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json; charset=utf-8");

require_once '../../database/conn.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Pega os status de funil da tabela StatusFunil
    $stmt = $conn->prepare("SELECT StatusFunil FROM StatusFunil");
    $stmt->execute();
    // Pega o resultado da query
    $stmt->bind_result($statusFunil);
    $resultados = array();

    for ($counter = 1; $stmt->fetch(); $counter++) {
        $resultados += array($counter => $statusFunil);
    }

    echo json_encode($resultados);
}
