<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

// Chamar a variável de conexão do banco.
require_once '../../../database/conn.php';

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $idServicoCategoria = $_GET['id'];


    $stmt = $conn->prepare('SELECT idNomeProduto, NomeProduto FROM NomeProduto WHERE fk_idServicoCategoria = ?');

    $stmt->bind_param('s', $idServicoCategoria);

    $stmt->execute();

    $resultado = $stmt->get_result();

    // Pegando os resultados e armazená-los em uma variável
    $registros = array(); 

    while ($row = $resultado->fetch_assoc()) {
        $registros[] = $row; // Adicione cada linha ao array $registros
    }

    $resposta = json_encode($registros);

    echo $resposta;
    
} else {
    // Handle other HTTP request methods if needed
    http_response_code(405); // Method Not Allowed
}
?>
