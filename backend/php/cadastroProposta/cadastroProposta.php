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

// Cadastrar o gerente responsável
function cadastrarGerente($dadosProposta, $conn, $dados) {

    // Desestruturando dados
    $gerente = $dados['gerente'];
    $idProposta = $dadosProposta['idProposta'];

    // Preparando a inserção
    $stmt = $conn->prepare("INSERT INTO GerenteResponsavel (fk_nifGerente, fk_idProposta) VALUES (?, ?)");

    // Passando os valores como parâmetro
    $stmt->bind_param('si', $gerente, $idProposta);

    if ($stmt->execute()) {

        $resposta = [
            'status' => 'success',
            'mensagem' => 'Proposta Cadastrada'
        ];

        echo json_encode($resposta);

    } else {

        $resposta = [
            'status' => 'error',
            'mensagem' => 'Não foi possível cadastrar a proposta'
        ];

        echo json_encode($resposta);

    }

}

// Verificar a proposta para vincular ao gerente que vai ser cadastrado 
function verificarProposta($nomeProjeto, $empresa, $id, $resumo, $conn, $dados) {
    // Preparando a consulta
    $stmt = $conn->prepare("SELECT * FROM Propostas WHERE TituloProposta = ? AND Empresa = ? AND fk_idRepresentante = ? AND Resumo = ?");

    // Passando os parâmetros
    $stmt->bind_param('ssis', $nomeProjeto, $empresa, $id, $resumo);

    // Excutando...
    $stmt->execute();

    $resultadoConsulta = $stmt->get_result();

    if ($resultadoConsulta->num_rows > 0) {
        // Pegando os dados que foram retornados do programa
        $dadosProposta = $resultadoConsulta->fetch_assoc();

        // Linkando o gerente com a proposta
        cadastrarGerente($dadosProposta, $conn, $dados);
    } else {

        $resposta = [
            'status' => 'error',
            'mensagem' => 'Não foi possível cadastrar a proposta'
        ];

        json_encode($resposta);

    }
}



// Verificação se a proposta já existe
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
    $stmt = $conn->prepare("INSERT INTO Representantes (nomeRepresentante, telefoneRepresentante, emailRepresentante) VALUES (?, ?, ?)");

    // Passando os valores como parâmetro
    $stmt->bind_param('sss', $representante, $telefoneRepresentante, $emailRepresentante);

    if ($stmt->execute()) {

        verificarRepresentante($dados, $conn);

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
    $stmt = $conn->prepare("INSERT INTO Propostas (fk_idRepresentante, fk_nifUsuarioCriador, TituloProposta, Resumo, fk_idUnidadeCriadora, Empresa, `Status`) VALUES (?, ?, ?, ?, ?, ?, ?)");

    // Passando os valores como parâmetro
    $stmt->bind_param('issssss', $idRepresentante, $nif, $nomeProjeto, $resumo, $unidadeCriadora, $empresa, $status);

    if ($stmt->execute()) {

        // Função para fazer a verificação da proposta e vincular ao gerente responsável 
        verificarProposta($nomeProjeto, $empresa, $idRepresentante, $resumo, $conn, $dados);

    } else {

        $resposta = [
            'status' => 'error',
            'mensagem' => 'Não foi possível cadastrar a proposta'
        ];

        // Retornando uma resposta para o front-end
        echo json_encode($resposta);

    }

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
                            INICIO DO PROGRAMA
-------------------------------------------------------------------------------------------
*/

// Se houver projeto cadastrado com o nome de projeto enviado, não é cadastrado
if (verificaRegistro($dados, $conn) === true) {
    $resposta = [
        'status' => 'error',
        'mensagem' => 'Registro existe'
    ];

    echo json_encode($resposta);

} else {

    verificarRepresentante($dados, $conn);

}