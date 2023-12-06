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
    $tipoAceite = $_GET['tipoConclusao'];

    $stmt = $conn->prepare('SELECT COUNT(*) as total, (Select Count(*) FROM `Produtos` WHERE `fk_idProposta` = ? AND `Situacao` = "Concluido") as concluidos FROM `Produtos` WHERE `fk_idProposta` = ?');

    $stmt->bind_param("ss", $idProposta, $idProposta);

    $stmt->execute();

    $result = $stmt->get_result();

    $resultado = $result->fetch_assoc();

    $totalProdutos = $resultado['total'];

    $produtosConcluidos = $resultado['concluidos'];

    if ($totalProdutos == $produtosConcluidos) {

        $stmt = $conn->prepare('UPDATE Propostas SET `Status` = ? where idProposta = ?');
    
        $stmt->bind_param("ss", $tipoAceite, $idProposta);
    
        if($stmt->execute()){
            if ($tipoAceite == 'Concluido') {
                $resposta = [
                    "status"=> "success",
                    "mensagem"=>"Proposta concluida com sucesso!"
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
                    "mensagem"=>"Erro ao concluir proposta!"
                ];
            } else {
                $resposta =[
                    "status"=>"error",
                    "mensagem"=>"Erro na solicitação de conclusão da proposta!"
                ];
            }
            
        }
    
        $envio = json_encode($resposta);
    
        echo $envio;
            
    } else {
        $resposta = [
            'mensagem' => 'Existe produtos não concluidos ainda',
            'status' => 'error'
        ];
    
        echo json_encode($resposta);
    }

    



}



?>


