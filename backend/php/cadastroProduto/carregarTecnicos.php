<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

// Chamar a variável de conexão do banco.
require_once '../../../database/conn.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $stmt = $conn->prepare('SELECT Nome FROM Usuarios');

    if($stmt->execute()){

        $nomes = array(); // Inicializa um array para armazenar os nomes
    
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $nomes[] = $row['Nome']; // Adiciona cada nome ao array
        }
       
        $resposta = json_encode($nomes);
    
        echo $resposta;

    } else {
        $resposta = [
            'status' => 'error',
            'mensagem' => 'Erro ao buscar os técnicos'
        ];

        $resposta = json_encode($resposta);

        echo $resposta;
    }

    

} else {
    // Handle other HTTP request methods if needed
    http_response_code(405); // Method Not Allowed
}
?>
