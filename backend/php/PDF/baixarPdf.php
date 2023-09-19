<?php
function pegarPdfDoBanco($idProposta, $tipoPdf) {
    require_once('../../../database/conn.php');

    // Execute uma consulta SQL para obter o conteúdo dos PDFs.
    $sql = "SELECT PDF FROM PDF WHERE fk_idProposta = ? AND fk_idTipoPDF = ?";

    // Prepare a declaração SQL.
    $stmt = $conn->prepare($sql);

    // Vincular os parâmetros da declaração SQL.
    $stmt->bind_param("ss", $idProposta, $tipoPdf);

    // Executar a declaração SQL.
    $stmt->execute();

    // Obter o resultado da consulta.
    $resultado = $stmt->get_result();

    // Verificar se há resultados.
    if ($resultado->num_rows > 0) {
        // Obter o conteúdo do PDF da primeira linha de resultado.
        $linha = $resultado->fetch_assoc();
        $pdf = $linha['PDF'];

        // Fechar a declaração e a conexão.
        $stmt->close();
        $conn->close();

        // Retornar o conteúdo do PDF.
        return $pdf;
    }  else {
        // Nenhum PDF encontrado.
        // Fechar a declaração e a conexão.
        $stmt->close();
        $conn->close();

        return false;
    }
}

// Verificar se o parâmetro 'id' está presente na URL.
if (isset($_GET['id'])) {
    $idProposta = $_GET['id'];
    $tipoPdf = $_GET['tipoPdf'];

    $pdfPegoDoBanco = pegarPdfDoBanco($idProposta, $tipoPdf);

    if ($pdfPegoDoBanco == false){
        echo json_encode(['mensagem' => "PDF não encontrado no banco",
            'status' => "Erro"]);
    } else {
        // Enviar o array de conteúdos de PDFs como resposta JSON para o JavaScript.
        header('Content-Type: application/pdf');
        header('Content-Disposition: inline; filename="orçamento.pdf"');
        echo $pdfPegoDoBanco;

    }

}


//pegar imagem do banco de dados
//dentro do header o image/ tem que colocar a extensao certinho da imagem.
// header('Content-type: image/jpg, image/png'); 