<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
// Definindo qual domínio pode acessar esse arquivo
header('Access-Control-Allow-Origin: http://localhost:8080');

// Definindo quais métodos podem ser usados
header('Access-Control-Allow-Methods: GET, POST');

// Definindo quais cabeçalhos serão permitidos na requisição
header('Access-Control-Allow-Headers: Content-Type');

// Cabeçalho informando para o navegador que será retornado um JSON
header("Content-Type: application/json");



// Verifique se a solicitação é do tipo POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Verifique se um arquivo foi enviado com o nome "pdfFile"
    if (isset($_FILES['pdfOrcamento'])) {
        $pdfOrcamento = file_get_contents($_FILES['pdfOrcamento']['tmp_name']); //Essa
        //linha lê o conteúdo do arquivo PDF enviado pelo formulário. Ela utiliza
        //a função file_get_contents() para obter o conteúdo do arquivo a partir
        //do caminho temporário onde o arquivo é armazenado temporariamente após
        //o envio.
        $salvou = salvarPdfOrcamentoNoBanco($pdfOrcamento);

        if ($salvou !== false) {
            echo "PDF salvo com sucesso com o ID: ";
        } else {
            echo "Falha ao salvar o PDF do orçamento no banco de dados.";
        }
    } else {
        echo "Nenhum arquivo PDF enviado.";
    }
} else {
    echo "Método de solicitação não permitido.";
}

// Função para salvar o conteúdo do PDF no banco de dados (exemplo).
function salvarPdfOrcamentoNoBanco ($pdfOrcamento) {
    require_once('../../../database/conn.php');
    // Prepare a consulta SQL para inserir o conteúdo do PDF no banco.

    // Preparar a declaração SQL.
    $stmt = $conn->prepare("INSERT INTO PDF VALUES (default, ?, ?, ?, ?);");

    $idProposta = 1;
    $nomePdf = 'Orçamento';
    $idTipoPdf = 1;
    // Vincular o conteúdo do PDF como parâmetro da declaração SQL.
    $stmt->bind_param("ssss",$idProposta ,$idTipoPdf, $nomePdf, $pdfOrcamento);

    // Executar a declaração SQL.
    if ($stmt->execute()) {
        // Se a inserção for bem sucedido, a variável irá receber true.
        $salvou = true;
    } else {
        // Caso ocorra um erro na inserção, defina o salvamento como false.
        $salvou = false;
    }

    // Fechar a declaração e a conexão.
    $stmt->close();
    $conn->close();

    // Retornar o ID do registro recém-inserido ou false em caso de falha.
    return $salvou;

}

// function salvarPdfPropostaAssinadaNoBanco ($pdfPropostaAssinada) {
//     require_once('../../backend/database/conn.php');
//     // Prepare a consulta SQL para inserir o conteúdo do PDF no banco.
//     $sql = "INSERT INTO PDF VALUES ('default', ?, ?, ?, ?)"; // Substitua 'tabela_pdf' pelo nome da tabela que você utiliza.

//     // Preparar a declaração SQL.
//     $stmt = $conn->prepare($sql);

//     // Vincular o conteúdo do PDF como parâmetro da declaração SQL.
//     $stmt->bind_param("ssss", 1, );

//     // Executar a declaração SQL.
//     // Executar a declaração SQL.
//     if ($stmt->execute()) {
//         // Se o salvamento for bem sucedido, a função retornará true.
//         $salvou = true;
//     } else {
//         // Caso ocorra um erro na inserção, defina o salvamento como false.
//         $salvou = false;
//     }

//     // Fechar a declaração e a conexão.
//     $stmt->close();
//     $conn->close();

//     // Retornar o ID do registro recém-inserido ou false em caso de falha.
//     return $salvou;

// }

// function salvarPdfRelatorioFinalNoBanco ($pdfRelatorioFinal) {
//     require_once('../../backend/database/conn.php');
//     // Prepare a consulta SQL para inserir o conteúdo do PDF no banco.
//     $sql = "INSERT INTO PDF VALUES ('default', ?, ?, ?, ?)"; // Substitua 'tabela_pdf' pelo nome da tabela que você utiliza.

//     // Preparar a declaração SQL.
//     $stmt = $conn->prepare($sql);

//     // Vincular o conteúdo do PDF como parâmetro da declaração SQL.
//     $stmt->bind_param("ssss", 1, );

//     // Executar a declaração SQL.
//     // Executar a declaração SQL.
//     if ($stmt->execute()) {
//         // Se o salvamento for bem sucedido, a função retornará true.
//         $salvou = true;
//     } else {
//         // Caso ocorra um erro na inserção, defina o salvamento como false.
//         $salvou = false;
//     }

//     // Fechar a declaração e a conexão.
//     $stmt->close();
//     $conn->close();

//     // Retornar o ID do registro recém-inserido ou false em caso de falha.
//     return $salvou;

// }

// function salvarPdfPesquisaDeSatisfacaoNoBanco ($pdfPesquisaDeSatisfacao) {
//     require_once('../../backend/database/conn.php');
//     // Prepare a consulta SQL para inserir o conteúdo do PDF no banco.
//     $sql = "INSERT INTO PDF VALUES ('default', ?, ?, ?, ?)"; // Substitua 'tabela_pdf' pelo nome da tabela que você utiliza.

//     // Preparar a declaração SQL.
//     $stmt = $conn->prepare($sql);

//     // Vincular o conteúdo do PDF como parâmetro da declaração SQL.
//     $stmt->bind_param("ssss", 1, );

//     // Executar a declaração SQL.
//     // Executar a declaração SQL.
//     if ($stmt->execute()) {
//         // Se o salvamento for bem sucedido, a função retornará true.
//         $salvou = true;
//     } else {
//         // Caso ocorra um erro na inserção, defina o salvamento como false.
//         $salvou = false;
//     }

//     // Fechar a declaração e a conexão.
//     $stmt->close();
//     $conn->close();

//     // Retornar o ID do registro recém-inserido ou false em caso de falha.
//     return $salvou;

// }
?>