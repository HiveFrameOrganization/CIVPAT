<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);             
// Definindo qual domínio pode acessar esse arquivo
header('Access-Control-Allow-Origin: http://localhost:8080');

// Definindo quais métodos podem ser usados
header('Access-Control-Allow-Methods: POST');

// Definindo quais cabeçalhos serão permitidos na requisição
header('Access-Control-Allow-Headers: Content-Type');

// Cabeçalho informando para o navegador que será retornado um JSON
header("Content-Type: application/json");

require_once '../../../database/conn.php' ;

// Verifique se a solicitação é do tipo POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Nome dos PDFs para a realização do loop
    $listaPdf = ['pdfOrcamento', 'pdfPropostaAssinada', 'pdfRelatorioFinal', 'pdfPesquisaDeSatisfacao'];

    // Contador para a mudança do fk_TIpoPDF do banco
    $contador = 1;

    // Inicia a transação das inserções no banco
    $conn->begin_transaction();

    try {
        // Loop para ver quais PDFs  forão mandados.
        foreach ($listaPdf as $pdf){
            if (isset($_FILES[$pdf])) {
                // Variável que irá pegar o pdf de acordo com a categoria que foi enviado
                $pdfs = file_get_contents($_FILES[$pdf]['tmp_name']);

                // Pega um dos nomes da lista de PDF para ser enviado como parâmetro da funçao e salvar o PDF com esse nome selecionado
                $nomeDoPdf = $listaPdf[$contador - 1];

                // Executa a função em si de salvar o pdf no  banco
                $salvou = salvarPdfNoBanco($pdfs, $conn, $contador, $nomeDoPdf);
            }
            $contador += 1;
        }

        // Caso todas as inserções sejam realizadas sem erro, isso irá commitar as mudançãs no banco
        $conn->commit();

        echo json_encode(['mensagem' => "PDFs salvos com sucesso",
            'status' => "success"]);

    } catch (Exception $e) {

        // Caso as inserções derem errado, o roolback cancela todas as inserções.
        $conn->rollback();

        error_log($errorMessage . $e);

        echo json_encode(['mensagem' => "Ocorreu uma falha na inserção dos PDF",
            'status' => "error"]);
    }

} else {
    echo json_encode(['mensagem' => "Método de solicitação recusado",
            'status' => "error"]);
}

// Função para salvar o conteúdo do PDF no banco de dados (exemplo).
function salvarPdfNoBanco ($pdf, $conn, $idTipoPdf, $nomePdf) {   
    // Prepare a consulta SQL para inserir o conteúdo do PDF no banco.

    // Pega o id da proposta enviada pelo link da requisição
    $idDaProposta = $_GET['id'];

    // Declaração SQL para verificar se existe um PDF naquela proposta com a mesma categoria do pdf enviado
    $verificaPdfNoBanco = $conn->prepare("SELECT (PDF) FROM PDF WHERE fk_idProposta = ? AND fk_idTipoPDF = ?");

    // Vincular o conteúdo pedido na consulta como parâmetro da declaração SQL.
    $verificaPdfNoBanco->bind_param('ss', $idDaProposta, $idTipoPdf);

     // Executa a declaração SQL
    $verificaPdfNoBanco->execute();

    // Captura o resultado da execução SQL
    $resultado = $verificaPdfNoBanco->get_result();

    // Verifica se a declaração SQL retornou algo do banco
    if ($resultado->num_rows == 0){
        // Preparar a declaração SQL.
        $stmt = $conn->prepare("INSERT INTO PDF VALUES (default, ?, ?, ?, ?);");

        // Vincular o conteúdo do PDF como parâmetro da declaração SQL.
        $stmt->bind_param("ssss",$idDaProposta ,$idTipoPdf, $nomePdf, $pdf);

        // Executa a declaração SQL
        $stmt->execute();
    } else {
        // Realiza a substituição do PDF já existente naquela proposta
        $stmt = $conn->prepare('UPDATE PDF SET PDF = ? WHERE fk_idProposta = ? AND fk_idTipoPDF = ?');

        // Vincular o conteúdo do PDF como parâmetro da declaração SQL.
        $stmt->bind_param("sss", $pdf, $idDaProposta, $idTipoPdf);

        // Executa a declaração SQL
        $stmt->execute();
    }
}

?>