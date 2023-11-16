<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

// Buscando o arquivo do banco:
require_once '../../../database/conn.php';

function verificarHora($nifTecnico, $dataLancaHora, $conn){
    $stmt = $conn->prepare('SELECT SUM(HorasPessoa) AS HorasPessoa FROM CargaHoraria WHERE fk_nifTecnico = ? and Datas = ? ');
    $stmt->bind_param('ss', $nifTecnico, $dataLancaHora);
    $stmt->execute();
    $horasPessoas = $stmt-> get_result();
    
    $stmt = $conn->prepare('SELECT SUM(HorasMaquina) AS HorasMaquina FROM CargaHoraria WHERE fk_nifTecnico = ? and Datas = ? ');
    $stmt->bind_param('ss', $nifTecnico, $dataLancaHora);
    $stmt->execute();
    $horasMaquinas = $stmt-> get_result();

    $rowPessoa = $horasPessoas->fetch_assoc();
    $rowMaquina = $horasMaquinas->fetch_assoc();

    $horasPessoa = $rowPessoa['HorasPessoa'];
    $horasMaquina = $rowMaquina['HorasMaquina'];


    $resposta = [
        'tec' => $nifTecnico,
        'Data' => $dataLancaHora,
        'horaPessoaTrabalhadas'=> $horasPessoa,
        'horaMaquinaTrabalhadas'=> $horasMaquina,
    ];
    echo json_encode($resposta);
    
}


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $nifTecnico = $_GET['nifTecnico'];
    $dataLancaHora = $_GET['dataDoLancamento'];
    verificarHora($nifTecnico, $dataLancaHora, $conn);
} else {
    $resposta = [
        'mensagem' => 'Algo deu errado',
        'status' => 'error'
    ];

    echo json_encode($resposta);
}


?>