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
        $resposta = [
            'msgErro' => 'JSON inválido'
        ];
        echo json_encode($resposta);

    } else {
        $funil = $dados['funil'];
        $dataUp = $dados['dataUp'];
        $comentario = $dados['comentario'];
        $idProposta = 1;

        try {
            $stmt = $conn->prepare("INSERT INTO FollowUp VALUES (default, ?, ?, ?, ?)");
            $stmt->bind_param("ssss", $funil, $idProposta, $dataUp, $comentario);
            $stmt->execute();
            echo json_encode(['mensagem' => "Follow Up adicionado com Sucesso!"]);
        } catch (Exception $e) {
            $errorMessage = "Ocorreu uma falha na inserção do Follow UP";
            $errorDetails = "Erro no funil: " . $funil . "\nDetalhes do erro: " . $e;
            error_log($errorMessage . "\n" . $errorDetails);
            echo json_encode(['msgErro' => "Ocorreu uma falha na inserção do Follow UP"]);
        }

    }
} else {
    echo json_encode(['msgErro' => 'Por favor, use POST']);
}
