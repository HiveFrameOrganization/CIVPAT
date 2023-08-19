<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

// Buscando o arquivo do banco:
require_once '../../../database/conn.php';

function verificarDetalhes($idProposta, $conn) {
    $stmt = $conn->prepare("SELECT Propostas.*, `Usuarios`.`nome` FROM Propostas INNER JOIN Usuarios ON `Usuarios`.`NIF` = `Propostas`.`fk_idGerente` WHERE idProposta = ?");
    // $stmt = $conn->prepare("SELECT * FROM Propostas WHERE idProposta = ?");
    
    $stmt->bind_param('s', $idProposta);
    $stmt->execute();
    $resultado = $stmt-> get_result();

    if ($resultado->num_rows > 0) {

        $pdf = pegarPdfDoBanco($idProposta, $conn);

        $dados = mysqli_fetch_assoc($resultado);


        if ($dados != null) {
            $dealhesProposta = [
                "nomeProposta" => $dados['TituloProj'],
                "cnpj" => $dados['cnpj'],
                "uniCriadora" => $dados['UnidadeCriadora'],
                "empresa" => $dados['Empresa'],
                "statusProposta" => $dados['Status'],
                "gerenteProposta" => $dados['nome'],
                "numeroSGSET" => $dados['numeroSGSET'],
                "dataPrimeiroProduto" => $dados['dataPrimeiroProduto'],
                "dataUltimoProduto" => $dados['dataUltimoProduto'],
                "valorTotalProdutos" => $dados['valorTotalProdutos'],
                "Pdf" => $pdf
            ];

            echo json_encode($dealhesProposta);

        } else {
            $resposta = [
                'mensagem' => 'Algo deu errado',
                'status' => 'error'
            ];
        
            echo json_encode($resposta);
        }
    } else {
        $resposta = [
            'mensagem' => 'Algo deu errado , nenhum registro encontrado',
            'status' => 'error'
        ];
    
        echo json_encode($resposta);
    }
}

function pegarPdfDoBanco($idProposta, $conn) {
    $stmt = $conn->prepare('SELECT `PDF`.`PDF`, `TipoPDF`.`TipoPDF` FROM PDF INNER JOIN TipoPDF ON `TipoPDF`.`idTipoPDF` = `PDF`.`fk_idTipoPDF` INNER JOIN Propostas ON `PDF`.`fk_idProposta` = `Propostas`.`idProposta` WHERE fk_idProposta = ?;');

    $stmt->bind_param('s', $idProposta);

    $stmt->execute();

    $resultado = $stmt->get_result();

    $dados = mysqli_fetch_assoc($resultado);

    $retorno = json_encode($dados);

    echo $retorno;

}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $idProposta = $_GET['id'];
    verificarDetalhes($idProposta, $conn);
} else {
    $resposta = [
        'mensagem' => 'Algo deu errado',
        'status' => 'error'
    ];

    echo json_encode($resposta);
}
?>
