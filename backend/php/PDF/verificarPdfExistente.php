<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

// Buscando o arquivo do banco:
require_once '../../../database/conn.php';

function verificarPdfExistente($idProposta, $conn){
    $tipoPdf = ['botaoOrcamento', 'botaoPropostaAssinada', 'botaoRelatorioFinal', 'botaoPesquisaDeSatisfacao'];
    $contador = 1;

    $listaPdfs = array();

    foreach ($tipoPdf as $pdf){
        $stmt = $conn->prepare('SELECT PDF FROM PDF WHERE fk_idProposta = ? AND fk_idTipoPDF = ?');

        $stmt->bind_param('ss', $idProposta, $contador);
        $stmt->execute();
        $resultado = $stmt->get_result();

        if ($resultado->num_rows > 0) {
            $listaPdfs[$tipoPdf[$contador - 1]] = true;
        } else {
            $listaPdfs[$tipoPdf[$contador - 1]] = false;
        }
        
        $contador += 1;
    }

    echo json_encode($listaPdfs);
}





if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $idProposta = $_GET['id'];

    verificarPdfExistente($idProposta, $conn);


} else {
    $resposta = [
        'mensagem' => 'Algo deu errado',
        'status' => 'error'
    ];

    echo json_encode($resposta);
}
?>