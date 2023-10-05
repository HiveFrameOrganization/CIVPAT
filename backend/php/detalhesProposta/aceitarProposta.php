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
    $tipoAceite = $_GET['tipoAceite'];

    $stmt = $conn->prepare('UPDATE Propostas SET `Status` = ? where idProposta = ?');

    $stmt->bind_param("ss", $tipoAceite, $idProposta);

    if($stmt->execute()){
        if ($tipoAceite == 'Aceito') {
            $resposta = [
                "status"=> "success",
                "mensagem"=>"Proposta aceita com sucesso!"
            ]; 
        } else {
            $resposta = [
                "status"=> "success",
                "mensagem"=>"Solicitação feita com sucesso!"
            ];
        }
    }else{
        if ($tipoAceite == 'Aceito') {
            $resposta =[
                "status"=>"error",
                "mensagem"=>"Erro ao aceitar proposta!"
            ];
        } else {
            $resposta =[
                "status"=>"error",
                "mensagem"=>"Erro na solicitação de aceitação da proposta!"
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


