<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

require_once '../../../database/conn.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $jsonData = file_get_contents("php://input");
    
    $data = json_decode($jsonData, true);

    
    $horaPessoa = ($data['horaPessoa'] == '') ? 0 : $data['horaPessoa'];
    $horaMaquina = ($data['horaMaquina'] == '') ? 0 : $data['horaMaquina'];
    $dataLancamento = $data['dataLancamento'];
    $nifTecnico = $data['nifTecnico'];
    $idProduto = $data['idProduto'];

    $stmt = $conn->prepare('INSERT INTO CargaHoraria VALUES (default, ?, ?, ?, ?, ?)');

    $stmt->bind_param('sssss', $idProduto, $nifTecnico, $horaPessoa, $horaMaquina, $dataLancamento);

    if ($stmt->execute()){
        $resposta = [
            'status' => 'success',
            'mensagem' => 'Hora lançada com sucesso'
        ];
    } else {
        $resposta = [
            'status' => 'error',
            'mensagem' => 'Erro ao lançar hora'
        ];
    }

    echo json_encode($resposta);

}
?>