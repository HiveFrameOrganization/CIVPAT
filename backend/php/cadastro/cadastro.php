<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

// Buscando o arquivo do banco:
require_once '../../../database/conn.php';

// Função para salvar os dados de cadastro no banco de dados
function salvaDadosNoBanco($dados, $conexao)
{

    // Desestruturando os dados
    $nif = $dados['nif'];
    $nome = $dados['nome'];
    $sobrenome = $dados['sobrenome'];
    $cargo = $dados['cargo'];
    $email = $dados['email'];
    $senha = $dados['senha'];

    // Preparando a query sql
    $stmt = $conexao->prepare("INSERT INTO Usuarios (NIF, Nome, Sobrenome, TipoUser, Email, Senha) VALUES (?, ?, ?, ?, ?, ?)");

    // Vincula os parâmetros usando os tipos de dados correspondentes ('s' para string)
    $stmt->bind_param("ssssss", $nif, $nome, $sobrenome, $cargo, $email, $senha);

    // Executa a declaração preparada
    if ($stmt->execute()) {
        echo json_encode(['Mensagem' => 'Usuário cadastrado com sucesso!']);
    } else {
        echo json_encode(['Mensagem' => 'Ocorreu algum erro ao inserir no banco']);
    }
}

// Função para verificar se os dados ja existem no banco
function verificaRegistroDuplicado($dados, $conexao) {

    // Desestruturando os dados
    $nif = $dados['nif'];
    $email = $dados['email'];

    // Preparando a consulta SQL
    $stmt = $conexao->prepare("SELECT * FROM Usuarios WHERE Nif = ? OR Email = ?");
    
    // Passando os valores por parâmetro
    $stmt->bind_param('ss', $nif, $email);

    // Excutando a consulta
    $stmt->execute();

    // Verificando o resultado
    $resultado = $stmt->get_result();

    // Verificando se retornou algum registro
    if ($resultado->num_rows > 0) {
        echo json_encode(['Erro' => 'O usuário já existe, portanto é impossível cadastrá-lo.']);
    } else {
        salvaDadosNoBanco($dados, $conexao);
    }

}

// Verificar o tipo da Aplicação
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    // Pegar o corpo da requisição
    $json = file_get_contents('php://input');

    // Tranformando os dados em objeto PHP
    $dados = json_decode($json, true);


    // Verificando se os dados são duplicados
    verificaRegistroDuplicado($dados, $conn);

} else {
    echo json_encode(['Mensagem' => 'Requisição não permitida...']);
}