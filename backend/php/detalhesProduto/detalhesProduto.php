<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

// Buscando o arquivo do banco:
require_once '../../../database/conn.php';

function verificarDetalhes($idProduto, $conn) {
    $stmt = $conn->prepare("SELECT `Produtos`.*, `Maquinas`.`Maquina` FROM Produtos 
    INNER JOIN Maquinas ON `Produtos`.`fk_idMaquina` = `Maquinas`.`idMaquina`
    WHERE idProduto = ?");
    
    // $stmt = $conn->prepare("SELECT * FROM Propostas WHERE idProposta = ?");
    
    $stmt->bind_param('s', $idProduto);
    $stmt->execute();
    $resultado = $stmt-> get_result();

    $dados = array();

    while ($row = $resultado->fetch_assoc()) {
        $dados[] = $row; // Adicione cada linha ao array $registros
    }

    $resposta = json_encode($dados);

    echo $resposta;
   
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $idProduto = $_GET['id'];
    verificarDetalhes($idProduto, $conn);
} else {
    $resposta = [
        'mensagem' => 'Algo deu errado',
        'status' => 'error'
    ];

    echo json_encode($resposta);
}
