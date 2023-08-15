<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

// Buscando o arquivo do banco:
require_once '../../../database/conn.php';

function verificaNoBanco($email, $conexao)
{

    $stmt = $conexao->prepare("SELECT * FROM Usuarios WHERE Email = ?");

    // Passando os valores por parâmetro
    $stmt->bind_param('s', $email);

    // Excutando a consulta
    $stmt->execute();

    // Verificando o resultado
    $resultado = $stmt->get_result();

    // Verificando se retornou algum registro
    if ($resultado->num_rows > 0) {

        // Pegando o que foi retornado pela query
        $linha = $resultado->fetch_assoc();

        // Verificando se é o primeiro login do funcionario
        if ($linha['Senha'] === 'senai115') {
            echo json_encode(['novoUsuario' => true]);
        } else {
            echo json_encode(['novoUsuario' => false]);
        }

    } else {
        echo json_encode(['Erro' => 'USUÁRIO NÃO CADASTRADO']);
    }

}

// Verificando o tipo da requisição
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    // Pegando o conteeúdo da requisição
    $json = file_get_contents('php://input');

    $email = json_decode($json, true);

    verificaNoBanco($email['email'], $conn);

}
?>