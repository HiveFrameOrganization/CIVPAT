<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

require_once '../../database/conn.php';

$dados = json_decode(file_get_contents("php://input")); 

$nomeProj = $dados->nomeProj;
$cnpj = $dados->cnpj;
$uniCriadora = $dados->uniCriadora;
$empresa = $dados->empresa;
$gerente = 1;

$dadosVerif = [
    'nomeProj' => $nomeProj
];

if (verificaRegistro($dadosVerif, $conn) == true) {
    $resposta = [
        'retorno' => false,
        'mensagem' => 'Já existe registro de projeto com esse nome'
    ];

    echo json_encode($resposta);
    
} else {

$stmt = $conn->prepare("INSERT INTO Propostas (TituloProj, CNPJ, UnidadeCriadora, Empresa, Gerente) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $nomeProj, $cnpj, $uniCriadora, $empresa, $gerente);

$resposta = ['retorno' => ($stmt->execute() ? true : false)];

echo json_encode($resposta);
}

//
// // 
//

function verificaRegistro($dados, $conn)
{
    $nomeProj = $dados['nomeProj'];

    $stmt = $conn->prepare("SELECT * FROM  Propostas WHERE TituloProj = ?");
    $stmt->bind_param("s", $nomeProj);
    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        return true;
    }

    return false;
}


// // Verificando o tipo de requisição
// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//     // Pegar o corpo da requisição
//     $json = file_get_contents('php://input');

//     // Tranformar o Corpo JSON em um objeto PHP
//     $dados = json_decode($json, true);

//     // Verificar se o JSON é válido
//     if ($dados === null) {
//         $resposta = [
//             'msgErro' => 'JSON inválido'
//         ];

//         echo json_encode($resposta);

//     } else {
//         // salvando dados no banco
//         verificaRegistro($dados, $conn);
//     }

// } else {
//     echo json_encode(['msgErro' => 'ALGO DEU ERRADO']);
// }
