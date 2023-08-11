<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

// Verificar o tipo da Aplicação
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    // Pegar o corpo da requisição
    $json = file_get_contents('php://input');

    // Tranformando os dados em objeto PHP
    $dados = json_decode($json, true);

    // Retornando resposta ao front-end
    echo json_encode(['mensagem' => 'DEU CERTO!!!!']);


} else {
    echo json_encode(['Mensagem' => 'Requisição não permitida...']);
}

?>