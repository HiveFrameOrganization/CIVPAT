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