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

        $stmt = $conn->prepare("SELECT * FROM vw_relatorioSemMaquina
        WHERE MONTH(CargaHoraria.Datas) = ? AND YEAR(CargaHoraria.Datas) = ? AND Usuarios.NIF = ?");

    } else {

        $stmt = $conn->prepare("SELECT * FROM vw_relatorioComMaquina 
        WHERE MONTH(CargaHoraria.Datas) = ? AND YEAR(CargaHoraria.Datas) = ? AND Usuarios.NIF = ?");
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