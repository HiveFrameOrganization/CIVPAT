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
        $funil = $dados['funil'];
        $dataUp = $dados['dataUp'];
        $comentario = $dados['comentario'];
        $idProposta = 1; // Corrigir

        try {
            // Executa a inserção dos dados no banco
            $historico = verificarHistorico($conn, $funil, $idProposta, $dataUp);
            
            if ($historico != "erro") {
                $stmt = $conn->prepare("INSERT INTO FollowUp VALUES (default, ?, ?, ?, ?)");
                $stmt->bind_param("ssss", $funil, $idProposta, $dataUp, $comentario);
                $stmt->execute();
                // Retorna um aviso de Sucesso para o front
                echo json_encode(['mensagem' => "Follow Up adicionado com Sucesso" . $historico,
                'status' => "Sucesso"]);
            } else {
                echo json_encode(['mensagem' => "Ocorreu uma falha na inserção do Historico: ",
                'status' => "Erro"]);
            }
        } catch (Exception $e) {
            $errorMessage = "Ocorreu uma falha na inserção do Follow UP: ";
            error_log($errorMessage . $e);
            echo json_encode(['mensagem' => "Ocorreu uma falha na inserção do Follow UP",
            'status' => "Erro"]);
        }
    }
} else {
    echo json_encode(['msgErro' => 'Por favor, use POST']);
}

function verificarHistorico($conn, $funil, $idProposta, $dataUp) {
    try {
        $stmt = $conn->prepare("SELECT `fk_idStatusFunil`, `Data` FROM `FollowUp`
        WHERE `idFollowUp` = (SELECT MAX(`idFollowUp`) FROM `FollowUp`)
        AND `fk_idProposta` = ?");
        $stmt->bind_param("s", $idProposta);
        $stmt->execute();
        $resultado = $stmt->get_result();
        $dadosFunil = $resultado->fetch_assoc();

        if ($dadosFunil['fk_idStatusFunil'] == null)
        {$dadosFunil['fk_idStatusFunil'] = $funil;}

        // Pegar a menor data do status atual (Select FollowUp)
        // e caso seja um status recorrente que (Select Historico)
        // seja maior que a data do último historico (Select Historico) Pegar a maior data Final
        // referente a esse status recorrente
        if ($funil == $dadosFunil['fk_idStatusFunil']) {
            $resp = "!";
        } else {
            $stmt = $conn->prepare("SELECT MIN(`Data`) FROM `FollowUp`
            WHERE `Data` >= COALESCE(
                (SELECT MAX(`DataFinal`) FROM `Historico`), '1900-01-01'
            )
            AND `fk_idProposta` = ?");
            $stmt->bind_param("s", $idProposta);
            $stmt->execute();
            $resultado = $stmt->get_result();
            $dadosHistorico = $resultado->fetch_assoc();
    
            $stmt = $conn->prepare("INSERT INTO Historico VALUES (default, ?, ?, ?, ?, ?)");
            $stmt->bind_param("sssss", $funil, $dadosFunil['fk_idStatusFunil'],
            $idProposta, $dadosHistorico['MIN(`Data`)'], $dataUp);
            $stmt->execute();
            $resp = " e Histórico atualizado!";
        }

    } catch (Exception $e) {
        $errorMessage = "Ocorreu uma falha na inserção do Historico: ";
        error_log($errorMessage . $e);
        return "erro";
    }
    return $resp;
}
