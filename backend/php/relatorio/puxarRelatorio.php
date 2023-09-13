<?php
session_start();

// Configuração básica do cors
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $data = $_GET['data'];
    

    echo json_encode($data);

} else {
    http_response_code(404);
}

?>