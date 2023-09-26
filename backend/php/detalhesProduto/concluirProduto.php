<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");


// Buscando o arquivo do banco:
require_once '../../../database/conn.php';

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {

    $idProduto = $_GET['id'];
    $situacao = 'Concluido';

    $stmt = $conn->prepare('UPDATE Produtos SET Situacao = ? WHERE idProduto = ?');

    $stmt->bind_param('ss', $situacao, $idProduto);

    if ($stmt->execute()){
        $resposta = [
            'status' => 'success',
            'mensagem' => 'Produto concluido com sucesso'
        ];
    } else {
        $resposta = [
            'status' => 'error',
            'mensagem' => 'Erro ao concluir produto'
        ];
    }

    echo json_encode($resposta);


} else {
    http_response_code(404);
}


?>