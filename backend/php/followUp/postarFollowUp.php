<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

require_once '../../../database/conn.php';

// Verificando o tipo de requisição
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Pegar o corpo da requisição
    $json = file_get_contents('php://input');

    // Tranformar o Corpo JSON em um objeto PHP
    $dados = json_decode($json, true);
    
    // Verificar se o JSON é válido
    if ($dados === null) {
        $resposta = ['mensagem' => 'JSON inválido', 'status' => "Erro"];
        echo json_encode($resposta);
    } else {
        // Pega os valores do JSON
        $idProposta = $dados['idProposta']; // Corrigir
        $dataFollowUp = $dados['dataFollowUp'];
        $comentario = $dados['comentario'];
        $dataFollowUpProx = $dados['dataFollowUpProx'];

        try {
            // Executa a inserção dos dados no banco
            $stmt = $conn->prepare("INSERT INTO FollowUp VALUES (default, ?, ?, ?, ?)");
            $stmt->bind_param("ssss", $idProposta, $dataFollowUp, $comentario, $dataFollowUpProx);
            $stmt->execute();
            // Retorna um aviso de Sucesso para o front
            echo json_encode(['mensagem' => "Follow Up adicionado com Sucesso",
            'status' => "Sucesso"]);
        } catch (Exception $e) {
            $errorMessage = "Ocorreu uma falha na inserção do Follow UP: ";
            error_log($errorMessage . $e);
            echo json_encode(['mensagem' => "Ocorreu uma falha na inserção do Follow UP",
            'status' => "Erro"]);
        }
    }
} else {
    echo json_encode(['mensagem' => 'Por favor, use POST',
    'status' => "Erro"]);
}
