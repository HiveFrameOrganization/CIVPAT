<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

// Buscando o arquivo do banco:
require_once '../../../database/conn.php';

function verificarHora($idProduto, $dataLancaHora, $conn){
    $stmt = $conn->prepare('SELECT  ');
}


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $idProduto = $_GET['id'];
    $dataLancaHora = $_GET['Data'];
    verificarHora($idProduto, $dataLancaHora, $conn);
} else {
    $resposta = [
        'mensagem' => 'Algo deu errado',
        'status' => 'error'
    ];

    echo json_encode($resposta);
}


?>