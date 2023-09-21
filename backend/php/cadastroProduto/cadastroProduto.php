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
    $idProduto = $data["produto"];
    $valor = floatval($data["valor"]);
    $area = $data["area"];
    $nifTecnico = $data["nifTecnico"];
    $idMaquina = $data['maquina'];

    $dataInicialFormatada = date("Y-m-d", strtotime($dataInicial));
    $dataFinalFormatada = date("Y-m-d", strtotime($dataFinal));
    

    $stmt2 = $conn->prepare('INSERT INTO Produtos (fk_idProposta, fk_nifTecnico, fk_idNomeProduto, fk_idServicoCategoria, Area, Valor, HoraPessoa, HoraMaquina, fk_idUnidadeRealizadora, DataInicial, DataFinal, fk_idMaquina) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);');

    $stmt2->bind_param('sssssssssssi', $idProposta, $nifTecnico, $idProduto, $servico, $area, $valor, $tempoPessoa, $tempoMaquina,  $unidade, $dataInicial, $dataFinal, $idMaquina);
    // Executa a declaração preparada
    if ($stmt2->execute()) {
        $stmt3 = $conn->prepare('SELECT Inicio, Fim FROM Propostas WHERE idProposta = ?');

        $stmt3->bind_param('s', $idProposta);

        $stmt3->execute();

        $resultado = $stmt3-> get_result();

        $dados = $resultado->fetch_assoc();

        if ($dados['Inicio'] == null || $dataInicialFormatada < $dados['Inicio']){
            $stmt4 = $conn->prepare('UPDATE Propostas SET Inicio = ? WHERE idProposta = ?');

            $stmt4->bind_param('ss', $dataInicial, $idProposta);

            $stmt4->execute();
        }

        if ($dados['Fim'] == null || $dataFinalFormatada > $dados['Fim']) {
            $stmt5 = $conn->prepare('UPDATE Propostas SET Fim = ? WHERE idProposta = ?');

            $stmt5->bind_param('ss', $dataFinal, $idProduto);

            $stmt5->execute();
        }



        // Resposta a ser retronada para o servidor
        $resposta = [
            'mensagem' => 'Produto cadastrado com sucesso!',
            'status' => 'success'
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
    // Handle other HTTP request methods if needed
    http_response_code(405); // Method Not Allowed
}
?>
