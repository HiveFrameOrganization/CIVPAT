<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

// Chamar a variável de conexão do banco.
require_once '../../../database/conn.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $jsonData = file_get_contents("php://input");
    
    $data = json_decode($jsonData, true);

    $tempoMaquina = intval($data["tempoMaquina"]);
    $tempoPessoa = intval($data["tempoPessoa"]);
    $unidade = $data["unidadeRealizadora"];
    $dataInicial = $data["dataInicial"];
    $dataFinal = $data["dataFinal"];
    $idProposta = intval($data["idProposta"]);
    $servico = intval($data["servico"]);
    $produto = $data["produto"];
    $valor = floatval($data["valor"]);
    $area = $data["area"];


    $stmt = $conn->prepare('SELECT idNomeProduto FROM NomeProduto WHERE NomeProduto = ?');

    $stmt->bind_param('s', $produto);

    $stmt->execute();

    $resultado = $stmt->get_result();

    $linha = $resultado->fetch_assoc();

    if($linha){
        
        $idProduto = intval($linha['idNomeProduto']);


        $stmt2 = $conn->prepare('INSERT INTO Produtos (idProduto, fk_idProposta, fk_idNomeProduto, fk_idServicoCategoria, Area, Valor, HoraPessoa, HoraMaquina, Unidade, DataInicial, DataFinal) VALUES (default, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');

        $stmt2->bind_param('ssssssssss', $idProposta, $idProduto, $servico, $area, $valor, $tempoPessoa, $tempoMaquina,  $unidade, $dataInicial, $dataFinal);

        // Executa a declaração preparada
        if ($stmt2->execute()) {

            // Resposta a ser retronada para o servidor
            $resposta = [
                'mensagem' => 'Produto cadastrado com sucesso!',
                'status' => 'sucesso'
            ];

            echo json_encode($resposta);
        } else {
            // Resposta a ser retronada para o servidor
            $resposta = [
                'mensagem' => 'Algo deu errado ao cadastrar o produto',
                'status' => 'error'
            ];

            echo json_encode($resposta);
        }

    } else {
        // Resposta a ser retronada para o servidor
        $resposta = [
            'mensagem' => 'Algo deu errado ao cadastrar o produto',
            'status' => 'error'
        ];

        echo json_encode($resposta);
    }

} else {
    // Handle other HTTP request methods if needed
    http_response_code(405); // Method Not Allowed
}
?>
