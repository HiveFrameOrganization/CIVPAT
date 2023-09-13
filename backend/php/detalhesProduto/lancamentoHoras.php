<?php

header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

// Buscando o arquivo do banco:
require_once '../../../database/conn.php';


function verificarHoras($idProduto, $conn) {
    
    $stmt = $conn -> prepare ("SELECT CargaHoraria.*, `Usuarios`.`NIF`, `Usuarios`.`Nome`
    FROM CargaHoraria
    INNER JOIN Usuarios ON `Usuarios`.`NIF` = `CargaHoraria`.` fk_nifTecnico`
    WHERE  fk_idProduto = ?");

    $stmt -> bind_param('s', $idProduto);
    $stmt -> execute();
    $resultado = $stmt -> get_result();

    if ($resultado -> num_rows > 0){
        $dados = mysqli_fetch_assoc($resultado);

    
        $resposta = [
            "Horas" => $dados['Horas'],
            "Datas" => $dados['Datas'],
            "Nome" => $dados['nome'],
        ];
        //Passando ele em formato json para o front
        echo json_encode($resposta);
    } else {
        $resposta = [
            'mensagem' => 'Algo deu errado , nenhum registro encontrado',
            'status' => 'error'
        ];
    
        echo json_encode($resposta);
    }

};




//Função para verificar o metodo de requisição vindo do JavaScript
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $idProduto = $_GET['id'];
    verificarHoras($idProduto, $conn);

    //Se o metodo for get ele levará para função verificarDetalhes
    // Se não, ele levará de volta e irá dar erro
} else {
    $resposta = [
        'mensagem' => 'Algo deu errado',
        'status' => 'error'
    ];

    echo json_encode($resposta);
}

?>