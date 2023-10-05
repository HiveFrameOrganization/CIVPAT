<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

// Buscando o arquivo do banco:
require_once '../../../database/conn.php';



//Função para verificar o metodo de requisição vindo do JavaScript
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $dados = json_decode(file_get_contents("php://input"));

    $idProposta = $_GET['id'];
    $tipoDeclinio = $_GET['tipoDeclinio'];

    $stmt = $conn->prepare('UPDATE Propostas SET `Status` = ? where idProposta = ?');

    $stmt->bind_param("ss", $tipoDeclinio, $idProposta);

    if($stmt->execute()){
        if ($tipoDeclinio == 'Declinado') {
            $resposta = [
                "status"=> "success",
                "mensagem"=>"Proposta declinada com sucesso!"
            ];

        } else {
            $resposta = [
                "status"=> "success",
                "mensagem"=>"Solicitação de declinio feita com sucesso!"
            ];
        }
    }else{
        if ($tipoDeclinio == 'Declinado') {
            $resposta =[
                "status"=>"error",
                "mensagem"=>"Erro ao declinar proposta!"
            ];
        } else {
            $resposta =[
                "status"=>"error",
                "mensagem"=>"Erro ao solicitar declinio!"
            ];
        }
        
    }

    $envio = json_encode($resposta);

    echo $envio;
        
} else {
    $resposta = [
        'mensagem' => 'Algo deu errado',
        'status' => 'error'
    ];

    echo json_encode($resposta);
}



?>


