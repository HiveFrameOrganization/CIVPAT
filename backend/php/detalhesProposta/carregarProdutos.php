<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

// Buscando o arquivo do banco:
require_once '../../../database/conn.php';

function carregarProdutos($conn) {

    $idProposta = $_GET['id'];

    $stmt = $conn->prepare("SELECT `Produtos`.`idProduto`, `NomeProduto`.`NomeProduto`, `ServicoCategoria`.`ServicoCategoria`, `Usuarios`.`Nome`, `Produtos`.`Valor`, `Produtos`.`DataFinal` FROM Produtos
    INNER JOIN NomeProduto ON `NomeProduto`.`idNomeProduto` = `Produtos`.`fk_idNomeProduto`
    INNER JOIN ServicoCategoria ON `ServicoCategoria`.`idServicoCategoria` = `Produtos`.`fk_idServicoCategoria`
    INNER JOIN Usuarios ON `Usuarios`.`NIF` = `Produtos`.`fk_nifTecnico`
    WHERE fk_idProposta = ?");

    $stmt->bind_param('s', $idProposta);

    $stmt->execute();

    $resultado = $stmt->get_result();

    $dados = array();

    while ($linha = $resultado->fetch_assoc()) {
        $dados[] = $linha;
    }

    $resposta = [
        'status' => 'success',
        'mensagem' => 'Dados retornados com sucesso',
        'produtos' => $dados
    ];

    $retorno = json_encode($resposta);

    echo $retorno;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $idProposta = $_GET['id'];
    carregarProdutos($conn);
} else {
    $resposta = [
        'mensagem' => 'Algo deu errado',
        'status' => 'error'
    ];

    echo json_encode($resposta);
}
?>
