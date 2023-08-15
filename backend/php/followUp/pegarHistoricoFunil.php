<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json; charset=utf-8");

require_once '../../../database/conn.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Pega os status de funil da tabela StatusFunil
    $stmt =
    $conn->prepare("SELECT
    SF_atual.StatusFunil as SF_atual, SF_anterior.StatusFunil as SF_anterior, DataInicial, DataFinal
    FROM Historico as H
    JOIN StatusFunil as SF_atual ON H.fk_idStatusAtual = SF_atual.idStatusFunil
    JOIN StatusFunil as SF_anterior ON H.fk_idStatusAnterior = SF_anterior.idStatusFunil
    WHERE fk_idProposta = ?");

    $stmt->bind_param("s", $_GET['idProposta']);
    $stmt->execute();

    // Pega o resultado da query
    $resultado = $stmt->get_result();
    $data = $resultado->fetch_all();

    echo json_encode($data);
}
