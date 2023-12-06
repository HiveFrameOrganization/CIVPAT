<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

// Buscando o arquivo do banco:
require_once '../../../database/conn.php';

require_once '../historico/inserirHistorico.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Pegar o corpo da requisição
    $json = file_get_contents('php://input');

    // Tranformar o Corpo JSON em um objeto PHP
    $dados = json_decode($json, true);

    $idProposta = $dados['idProposta'];
    // $nomeProposta = $dados['nomeProposta'];
    // $statusProposta = $dados['statusProposta'];
    // $criadorProposta = $dados['criadorProposta'];
    $cnpj = $dados['cnpj'];
    $empresa = $dados['empresa'];
    $uniCriadora = $dados['uniCriadora'];
    // $dataInicio = $dados['dataInicio'];
    // $dataFim = $dados['dataFim'];
    // $valor = $dados['valor'];
    $funil = $dados['funil'];
    $primeiroGerenteAntigo = $dados['primeiroGerenteAntigo'];
    $segundoGerenteAntigo = $dados['segundoGerenteAntigo'];
    $primeiroGerenteNovo = $dados['primeiroGerenteNovo'];
    $segundoGerenteNovo = $dados['segundoGerenteNovo'];
    $numeroSGSET = $dados['numeroSGSET'];
    $nomeContato = $dados['nomeContato'];
    $emailContato = $dados['emailContato'];
    $numeroContato = $dados['numeroContato'];
    $idRepresentante = $dados['idRepresentante'];


    $stmt2 = $conn->prepare('UPDATE Propostas SET 
    fk_idRepresentante = ?,
    fk_idUnidadeCriadora = ?,
    Empresa = ?,
    nSGSET = ?,
    CNPJ = ?
    WHERE idProposta = ?');

    $stmt2->bind_param('ssssss', $idRepresentante, $uniCriadora, $empresa,
    $numeroSGSET, $cnpj, $idProposta);

    $stmt2->execute();

    if ($conn->commit()) {
        if ($segundoGerenteAntigo == null && $segundoGerenteNovo != null) {
            $stmt3 = $conn->prepare('INSERT INTO GerenteResponsavel VALUES
            (default, ?,?)');

            $stmt3->bind_param('ss', $idProposta, $segundoGerenteNovo);

            $stmt3->execute();

        } else if ($segundoGerenteAntigo != $segundoGerenteNovo){
            $stmt3 = $conn->prepare('UPDATE GerenteResponsavel
            SET fk_nifGerente = ? where fk_idProposta = ? and fk_nifGerente = ?');

            $stmt3->bind_param('sss', $segundoGerenteNovo, $idProposta, $segundoGerenteAntigo);

            $stmt3->execute();
        }
        
        if ($primeiroGerenteAntigo != $primeiroGerenteNovo){
            $stmt4 = $conn->prepare('UPDATE GerenteResponsavel
            SET fk_nifGerente = ? where fk_idProposta = ? and fk_nifGerente = ?');

            $stmt4->bind_param('sss', $primeiroGerenteNovo, $idProposta, $primeiroGerenteAntigo);

            $stmt4->execute();
        }

        inserirHistorico($conn, $funil, $idProposta, false);

        if ($conn->commit()){
            $resposta = [
                'status' => 'success',
                'mensagem' => 'Atualização feita com sucesso'
            ];

            echo json_encode($resposta);
        } else {
            $resposta = [
                'status' => 'error',
                'mensagem' => 'Erro ao atualizar a proposta'
            ];

            $conn->rollback();

        }

        $stmt4 = $conn->prepare('UPDATE Representantes SET NomeRepresentante = ?,  TelefoneRepresentante = ?,EmailRepresentante = ? WHERE idRepresentante = ?; ');

        $stmt4->bind_param('ssss', $nomeContato, $numeroContato, $emailContato, $idRepresentante);

        $stmt4->execute();
    } else {
        $resposta = [
            'status' => 'error',
            'mensagem' => 'Erro ao atualizar a proposta'
        ];

        $conn->rollback();

    }

} else {
    $resposta = [
        'mensagem' => 'Algo deu errado',
        'status' => 'error'
    ];

    echo json_encode($resposta);
}

?>