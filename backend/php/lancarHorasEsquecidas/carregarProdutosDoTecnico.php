<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

require_once '../../../database/conn.php';


//Função para verificar o metodo de requisição vindo do JavaScript
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $nif = $_GET['nif'];

    $stmt = $conn->prepare('SELECT Produtos.area, Produtos.situacao, Produtos.DataFinal, Maquinas.Maquina, NomeProduto.NomeProduto, ServicoCategoria.ServicoCategoria FROM Produtos INNER JOIN Maquinas ON Maquinas.idMaquina = Produtos.fk_idMaquina INNER JOIN NomeProduto ON NomeProduto.idNomeProduto = Produtos.fk_idNomeProduto INNER JOIN ServicoCategoria ON ServicoCategoria.idServicoCategoria = Produtos.fk_idServicoCategoria WHERE fk_nifTecnico = ?');

    $stmt->bind_param('s', $nif);

    if ($stmt->execute()){

        $resultado = $stmt->get_result();

        $resposta = array();
    
        while ($linha = $resultado->fetch_assoc()) {
            $resposta[] = $linha;
        }
        
    } else {
        $resposta = [
            'status' => 'error',
            'mensagem' => 'Erro ao puxar os produtos'
        ];

    }

    echo json_encode($resposta);

}



?>