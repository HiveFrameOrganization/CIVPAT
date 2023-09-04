<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

// Buscando o arquivo do banco:
require_once '../../../database/conn.php';



if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Pegar o corpo da requisição
    $json = file_get_contents('php://input');

    // Tranformar o Corpo JSON em um objeto PHP
    $dados = json_decode($json, true);

    $idProposta = $dados['idProposta'];
    $nomeProposta = $dados['nomeProposta'];
    $statusProposta = $dados['statusProposta'];
    // $criadorProposta = $dados['criadorProposta'];
    $cnpj = $dados['cnpj'];
    $empresa = $dados['empresa'];
    $uniCriadora = $dados['uniCriadora'];
    $dataInicio = $dados['dataInicio'];
    $dataFim = $dados['dataFim'];
    $valor = $dados['valor'];
    $funil = $dados['funil'];
    $primeiroGerente = $dados['primeiroGerente'];
    $segundoGerente = $dados['segundoGerente'];
    $numeroSGSET = $dados['numeroSGSET'];
    $nomeContato = $dados['nomeContato'];
    $emailContato = $dados['emailContato'];
    $numeroContato = $dados['numeroContato'];

    $stmt= $conn->prepare('SELECT idRepresentante FROM Representantes WHERE NomeRepresentante = ?;');

    $stmt->bind_param('s', $nomeContato);

    $stmt->execute();

    $stmt->bind_result($idRepresentante);

    $stmt->fetch();

    $conn->begin_transaction();

    $stmt2 = $conn->prepare('UPDATE Propostas SET 
    fk_idRepresentante = ?,
    TituloProposta = ?,
    fk_idUnidadeCriadora = ?,
    Empresa = ?,
    `Status` = ?,
    nSGSET = ?,
    CNPJ = ?
    Inicio = ?,
    Fim = ?,
    Valor = ?
    WHERE idProposta = ?;');

    $stmt2->bind_param('sssssssssss', $idRepresentante,
    $nomeProposta, $uniCriadora, $empresa, $statusProposta,
    $numeroSGSET, $cnpj, $dataInicio, $dataFim, $valor);

    $stmt2->execute();

    if ($conn->commit()) {
        // if ($primeiroGerente != null){
        //     $stmt3 = $conn->prepare('UPDATE GerenteResponsavel
        //     SET fk_nifGerente = ? where id')

        // }
    } else {
        $resposta = [
            'status' => 'error',
            'mensagem' => 'Erro ao atualizar a proposta'
        ];

    }




} else {
    $resposta = [
        'mensagem' => 'Algo deu errado',
        'status' => 'error'
    ];

    echo json_encode($resposta);
}

?>