<?php
session_start();
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Destruir completamente a sessão
    session_unset();
    session_destroy();

    echo json_encode(['Mensagem' => 'O USUÁRIO SAIU DA CONTA...']);

} else {
    echo json_encode(['Erro' => 'ALGO DEU ERRADO...']);
}

?>