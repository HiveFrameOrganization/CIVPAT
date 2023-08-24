<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

// Buscando o arquivo do banco:
require_once '../../../database/conn.php';

function salvarNoBanco($dados, $conn) {
    $stmt = $conn ->prepare ("SELECT NIF FROM Usuarios WHERE NOME = ?");
    $stmt->bind_param('s', $dados['gerenteProposta']);
    $stmt->execute();

    $resultado = $stmt-> get_result();

    if ($resultado->num_rows > 0) {

        $dadosBanco = mysqli_fetch_assoc($resultado);

        $nifGerente = $dadosBanco['NIF'];

        $stmt = $conn -> prepare("UPDATE Propostas SET fk_idGerente = ?, TituloProj = ?, CNPJ = ?, UnidadeCriadora =?, Empresa =?, nSGSET = ?, Inicio = ?, Fim = ?, Valor = ? ");

    
}
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Pegar o corpo da requisição
    $json = file_get_contents('php://input');

    // Tranformar o Corpo JSON em um objeto PHP
    $dados = json_decode($json, true);

    salvarNoBanco($dados, $conn);

} else {
    $resposta = [
        'mensagem' => 'Algo deu errado',
        'status' => 'error'
    ];

    echo json_encode($resposta);
}

?>