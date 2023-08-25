<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

require_once '../../../database/conn.php';

// Pegando os dados que vieram do front-end
$dados = json_decode(file_get_contents("php://input"), true);

/*
-------------------------------------------------------------------------------------------
                            FUNÇÕES
-------------------------------------------------------------------------------------------
*/
function verificaRegistro($dados, $conn)
{
    $nomeProjeto = $dados['nomeProjeto'];

    // Busca o nome de propostas para ver se já existe
    $stmt = $conn->prepare("SELECT * FROM  Propostas WHERE TituloProposta = ?");
    $stmt->bind_param("s", $nomeProjeto);
    $stmt->execute();

    $resultado = $stmt->get_result();

    // Se existir, retorna true
    if ($resultado->num_rows > 0) {
        return true;
    }

    return false;
}

function cadastrarRepresentante($dados, $conn){

    // Desestruturando dados
    $representante = $dados['representante'];
    $emailRepresentante = $dados['emailRepresentante'];
    $telefoneRepresentante = $dados['telefoneRepresentante'];

    // Preparando a inserção
    $stmt = $conn->prepare("INSERT INTO Propostas (nomeRepresentante, telefoneRepresentante, emailRepresentante) VALUES (?, ?, ?)");

    // Passando os valores como parâmetro
    $stmt->bind_param('sss', $representante, $telefoneRepresentante, $emailRepresentante);

    if ($stmt->execute()) {

        $dadosDoRepresentante = [
            'emailRepresentante' => $emailRepresentante
        ];

        verificarRepresentante($dadosDoRepresentante, $conn);

    } else {

        $resposta = [
            'status' => 'error',
            'mensagem' => 'Não foi possível cadastrar a proposta'
        ];

        json_encode($resposta);

    }

}

function cadastrarProposta($dados, $idRepresentante, $conn) {

    // Desestruturando...
    $nomeProjeto = $dados['nomeProjeto'];
    $resumo = $dados['resumo'];
    $unidadeCriadora = $dados['unidadeCriadora'];
    $empresa = $dados['empresa'];
    $nif = $_SESSION['nif'];
    $status = 'Em Análise';

    // Preparando a inserção
    $stmt = $conn->prepare("INSERT INTO Propostas (fk_idRepresentante, fk_nifUsuarioCriador, TituloProposta, Resumo, UnidadeCriadora, Empresa, `Status`) VALUES (?, ?, ?, ?, ?, ?, ?)");

    // Passando os valores como parâmetro
    $stmt->bind_param('issssss', $idRepresentante, $nif, $nomeProjeto, $resumo, $unidadeCriadora, $empresa, $status);

    if ($stmt->execute()) {

        $resposta = [
            'status' => 'success',
            'mensagem' => 'Proposta cadastrada com sucesso!'
        ];

    } else {

        $resposta = [
            'status' => 'error',
            'mensagem' => 'Não foi possível cadastrar a proposta'
        ];

    }

    // Retornando uma resposta para o front-end
    echo json_encode($resposta);

}



function verificarRepresentante($dados, $conn){

    // Verificando a existência do representante por email
    $emailRepresentante = $dados['emailRepresentante'];

    // Preparando a consulta
    $stmt = $conn->prepare("SELECT * FROM Representantes WHERE emailRepresentante = ?");

    // Passando os parâmetros
    $stmt->bind_param('s', $emailRepresentante);

    // Excutando...
    $stmt->execute();

    $resultadoConsulta = $stmt->get_result();

    if ($resultadoConsulta->num_rows > 0) {

        // Pegando os dados que foram retornados do programa
        $dadosRepresentante = $resultadoConsulta->fetch_assoc();

        // Cadastrando a proposta
        cadastrarProposta($dados, $dadosRepresentante['idRepresentante'], $conn);

    } else {

        // Cadastrar o representante
        cadastrarRepresentante($dados, $conn);

    }

    return false;
}

/*
-------------------------------------------------------------------------------------------
                            LÓGICA DO PROGRAMA
-------------------------------------------------------------------------------------------
*/

$dadosVerif = [
    'nomeProjeto' => $nomeProjeto
];

// Se houver projeto cadastrado com o nome de projeto enviado, não é cadastrado
if (verificaRegistro($dadosVerif, $conn) === true) {
    $resposta = [
        'status' => 'error',
        'mensagem' => 'Registro existe'
    ];

} else {

    verificarRepresentante($dados, $conn);

}