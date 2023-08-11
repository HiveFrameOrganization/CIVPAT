<?php

header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

require_once '../database/conn.php';

$resposta = [
    'mensagem' => 'Deu certo'
];

// $dados = json_decode($_POST['dados']);

// $nomeProj = $dados['nomeProj'];
// $cnpj = $dados['cnpj'];
// $uniCriadora = $dados['uniCriadora'];
// $empresa = $dados['empresa'];

// $stmt = $mysqli->prepare("INSERT INTO Propostas (TituloProj, CNPJ, UnidadeCriadora, Empresa) VALUES (?, ?, ?, ?)");
// $stmt->bind_param("ssss", $nomeProj, $cnpj, $uniCriadora, $empresa);
// $stmt->execute();

// if (true == true) {
//     $resposta = [
//         'mensagem' => 'Deu certo'
//     ];
// }
// else {
//     $resposta = [
//         'mensagem' => 'NÃO deu certo'
//     ];
// }

echo json_encode($resposta);


// Função para verificar ja existe os registros antes de salvar
function verificaRegistro($dados, $conexao)
{
    // Pegando os dados pessoais do array de dados para salvar no banco
    $nome = $dados['nome'];
    $email = $dados['email'];

    $query = "SELECT * FROM clientes WHERE nome = '$nome' AND email = '$email'";
    $resultado = mysqli_query($conexao, $query);

    if (mysqli_num_rows($resultado) > 0) {
        echo json_encode(['mensagem' => 'Esse usuário já existe no banco']);
    } else {
        guardaBanco($dados, $conexao);
    }
}


// Verificando o tipo de requisição
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Pegar o corpo da requisição
    $json = file_get_contents('php://input');

    // Tranformar o Corpo JSON em um objeto PHP
    $dados = json_decode($json, true);

    // Verificar se o JSON é válido
    if ($dados === null) {
        $resposta = [
            'msgErro' => 'JSON inválido'
        ];

        echo json_encode($resposta);

    } else {
        // salvando dados no banco
        verificaRegistro($dados, $conn);
    }

} else {
    echo json_encode(['msgErro' => 'ALGO DEU ERRADO']);
}
