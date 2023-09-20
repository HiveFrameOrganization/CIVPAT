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

    $nifPerfil = $dados['nifPerfil'];
    $idProduto = $dados['id'] ;
    $horaPessoaDiaria= $dados['horaPessoaDiaria'] ;
    $horaMaquinaDiaria= $dados['horaMaquinaDiaria'];
    $dataHoje = date('Y-m-d');

    $stmt = $conn ->prepare("INSERT INTO CargaHoraria ( idCargaHoraria,fk_idProduto, fk_nifTecnico, HorasPessoa, HorasMaquina, Datas) VALUES (default,?,?,?,?,?)");
    $stmt-> bind_param('sssss',  $idProduto, $nifPerfil,$horaPessoaDiaria, $horaMaquinaDiaria, $dataHoje);


    if ($stmt->execute()) {
        $resposta = [
            'mensagem' => 'Lancameto de horas feita com sucesso',
            'status' => 'success'
        ];
    } else {
        $resposta = [
            'mensagem' => 'Erro ao lançar hora',
            'status' => 'error'
        ];
    }

    echo json_encode($resposta);
   
  
}
?>