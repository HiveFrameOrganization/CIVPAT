<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

require_once '../../../database/conn.php';

$dados = json_decode(file_get_contents("php://input"));

$nomeProj = $dados->nomeProj;
$cnpj = $dados->cnpj;
$uniCriadora = $dados->uniCriadora;
$empresa = $dados->empresa;
$gerente = $dados->gerente;

$dadosVerif = [
    'nomeProj' => $nomeProj
];

// Se houver projeto cadastrado com o nome de projeto enviado, não é cadastrado
if (verificaRegistro($dadosVerif, $conn) === true) {
    $resposta = [
        'status' => 'error',
        'mensagem' => 'Registro existe'
    ];
    
} else {

    // Tenta cadastrar os dados enviados no banco e retorna 'sucesso' ou 'erro' dependendo se deu certo a query
    $stmt = $conn->prepare("INSERT INTO Propostas (TituloProj, CNPJ, UnidadeCriadora, Empresa, fk_idGerente) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $nomeProj, $cnpj, $uniCriadora, $empresa, $gerente);

    if ($stmt->execute()){
        $resposta = [
            'status'=> 'success',
            'mensagem' => 'Produto cadastrado com sucesso'
        ]
    } else {
        $resposta = [
            'status'=> 'error',
            'mensagem' => 'Erro ao salvar a proposta'
        ]
    }
}

echo json_encode($resposta);

//
// //
//

function verificaRegistro($dados, $conn)
{
    $nomeProj = $dados['nomeProj'];

    // Busca o nome de propostas para ver se já existe
    $stmt = $conn->prepare("SELECT * FROM  Propostas WHERE TituloProj = ?");
    $stmt->bind_param("s", $nomeProj);
    $stmt->execute();

    $result = $stmt->get_result();

    // Se existir, retorna true
    if ($result->num_rows > 0) {
        return true;
    }

    return false;
}