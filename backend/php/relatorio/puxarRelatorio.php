<?php
session_start();

// Configuração básica do cors
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

// Buscando o arquivo do banco:
require_once '../../../database/conn.php';

// Função para puxar o relatório
function puxarRelatorio($conn)
{

    $mes = $_GET['mes'];
    $ano = $_GET['ano'];
    $valor = $_GET['valor'];
    $cargo = $_GET['cargo'];

    if ($cargo === "tec") {

        $stmt = $conn->prepare("SELECT  NomeProduto.NomeProduto, Propostas.TituloProposta, SUM(CargaHoraria.HorasPessoa) as `HorasPessoa`, CargaHoraria.Datas FROM Usuarios 
        INNER JOIN CargaHoraria ON Usuarios.NIF = CargaHoraria.fk_nifTecnico 
        INNER JOIN Produtos ON Produtos.idProduto = CargaHoraria.fk_idProduto 
        INNER JOIN NomeProduto ON NomeProduto.idNomeProduto = Produtos.fk_idNomeProduto
        INNER JOIN Propostas ON Propostas.idProposta = Produtos.fk_idProposta WHERE MONTH(CargaHoraria.Datas) = ? AND YEAR(CargaHoraria.Datas) = ? 
        AND Usuarios.NIF = ?
        GROUP BY Datas, Propostas.TituloProposta, NomeProduto.NomeProduto LIMIT 0, 100");

    } else {

        $stmt = $conn->prepare("SELECT Usuarios.Nome, Usuarios.NIF, Usuarios.Sobrenome, NomeProduto.NomeProduto, Propostas.TituloProposta, Maquinas.Maquina, SUM(CargaHoraria.HorasPessoa) as `HorasPessoa`, SUM(CargaHoraria.HorasMaquina) as `HorasMaquina`, CargaHoraria.Datas FROM Usuarios 
        INNER JOIN CargaHoraria ON Usuarios.NIF = CargaHoraria.fk_nifTecnico 
        INNER JOIN Produtos ON Produtos.idProduto = CargaHoraria.fk_idProduto 
        INNER JOIN NomeProduto ON NomeProduto.idNomeProduto = Produtos.fk_idNomeProduto
        INNER JOIN Maquinas ON Maquinas.idMaquina = Produtos.fk_idMaquina 
        INNER JOIN Propostas ON Propostas.idProposta = Produtos.fk_idProposta WHERE MONTH(CargaHoraria.Datas) = ? AND YEAR(CargaHoraria.Datas) = ? 
        AND Usuarios.NIF = ?
        GROUP BY Datas, Usuarios.NIF, Maquinas.Maquina, Propostas.TituloProposta, NomeProduto.NomeProduto LIMIT 0, 100");

    }

    $stmt->bind_param('sss', $mes, $ano, $valor);




    $stmt->execute();
    $resultado = $stmt->get_result();

    // Array para pegar todos os produtos retornados
    $dados = array();

    if ($resultado->num_rows > 0) {

        while ($linha = $resultado->fetch_assoc()) {
            // Processar os resultados
            $dados[] = $linha;
        }

        // Enviando a resposta do servidor
        $resposta = [
            'status' => 'success',
            'mensagem' => 'dados retornados com sucesso',
            'dados' => $dados
        ];

    } else {

        $resposta = [
            'status' => 'error',
            'mensagem' => 'Nenhum registro encontrado'
        ];

    }


    echo json_encode($resposta);

}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    puxarRelatorio($conn);

} else {
    http_response_code(404);
}

?>