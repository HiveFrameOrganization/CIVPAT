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

    $idProduto = $data["idProduto"];
    $tempoMaquina = intval($data["tempoMaquina"]);
    $tempoPessoa = intval($data["tempoPessoa"]);
    $unidade = $data["unidadeRealizadora"];
    $dataInicial = $data["dataInicial"];
    $dataFinal = $data["dataFinal"];
    $servico = intval($data["servico"]);
    $valor = floatval($data["valor"]);
    $area = $data["area"];
    $nifTecnico = $data["tecnico"];
    $idNomeProduto = $data["produto"];
    $idProposta = intval($data["idProposta"]);

    $dataInicialFormatada = date("Y-m-d", strtotime($dataInicial));
    $dataFinalFormatada = date("Y-m-d", strtotime($dataFinal));
    
    $stmt = $conn->prepare('UPDATE Produtos SET fk_nifTecnico = ?,
    fk_idNomeProduto = ?,
    fk_idServicoCategoria = ?,
    fk_idUnidadeRealizadora = ?,
    Area = ?,
    Valor = ?,
    HoraPessoa = ?,
    HoraMaquina = ?,
    DataInicial = ?,
    DataFinal = ?
    WHERE idProduto = ?;');

    $stmt->bind_param("sssssssssss", $nifTecnico, $idNomeProduto, $servico, $unidade, $area, $valor, $tempoPessoa, $tempoMaquina, $dataInicial, $dataFinal, $idProduto);

    if ($stmt->execute()){

        $stmt3 = $conn->prepare('SELECT Inicio, Fim FROM Propostas WHERE idProposta = ?');

        $stmt3->bind_param('i', $idProposta);

        $stmt3->execute();

        $resultado = $stmt3-> get_result();

        $dados = $resultado->fetch_assoc();

        if ($dados['Inicio'] == null || $dataInicialFormatada < $dados['Inicio']){
            $stmt4 = $conn->prepare('UPDATE Propostas SET Inicio = ? WHERE idProposta = ?');

            $stmt4->bind_param('si', $dataInicial, $idProposta);

            $stmt4->execute();
        }

        if ($dados['Fim'] == null || $dataFinalFormatada > $dados['Fim']) {
            $stmt5 = $conn->prepare('UPDATE Propostas SET Fim = ? WHERE idProposta = ?');

            $stmt5->bind_param('si', $dataFinal, $idProposta);

            $stmt5->execute();
        }
        $resposta = [
            'status' => 'success',
            'mensagem' => 'Produto atualizado com sucesso'
        ];

        $retorno = json_encode($resposta);

        echo $retorno;
    } else {
        $resposta = [
            'status' => 'error',
            'mensagem' => 'Erro ao atualizar produto'
        ];

        $retorno = json_encode($resposta);

        echo $retorno;
    }


}
?>