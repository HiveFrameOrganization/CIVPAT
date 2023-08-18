<?php

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $jsonData = file_get_contents("php://input");
    
    $data = json_decode($jsonData, true);

    $tempoMaquina = $data["tempoMaquina"];
    $tempoPessoa = $data["tempoPessoa"];
    $unidade = $data["unidade"];
    $dataInicial = $data["dataInicial"];
    $dataFinal = $data["dataFinal"];
    $tecnico = $data["tecnico"];
    $idProposta = $data["idProposta"];
    $servico = $data["servico"];
    $produto = $data["produto"];
    $valor = $data["valor"];

    // Now you can use these variables for further processing or database operations
    // For example:
    // Insert these values into a database

    // Return a response if needed
    $response = ["message" => "Data received successfully"];
    echo json_encode($response);
} else {
    // Handle other HTTP request methods if needed
    http_response_code(405); // Method Not Allowed
}
?>
