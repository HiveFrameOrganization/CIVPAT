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

    $stmt = $conn -> prepare("SELECT SUM(HorasPessoa) AS somaHoras from CargaHoraria WHERE Datas = ?");
    $stmt -> bind_param('s', $dataHoje);
    $stmt -> execute();
    $somaHoras = $stmt -> get_result();
    $somaHoras = mysqli_fetch_assoc($somaHoras);

    
    // $stmt = $conn -> prepare("INSERT INTO CargaHoraria (fk_idProduto, fk_nifTecnico,  HorasPessoa,  HorasMaquina, Datas) values (?, ?, ?, ?, ?)");
    // $stmt->bind_param('iiss', $idProduto, $nifPerfil, $horaPessoaDiaria, $horaMaquinaDiaria, $dataHoje);
    // $stmt -> execute();
    // $resultado = $stmt -> get_result();
    // $resultado = mysqli_fetch_assoc($resultado);



    echo json_encode($somaHoras);
}
?>