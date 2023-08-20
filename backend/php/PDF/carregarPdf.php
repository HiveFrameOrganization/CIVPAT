<?php
// Função para recuperar o conteúdo do PDF do banco de dados (exemplo usando MySQLi).
function pegarConteudoPdfDoBanco(){
    require_once('../../../database/conn.php');

    // Supondo que você tem uma tabela chamada 'tabela_pdf' que contém o PDF armazenado como BLOB.
    // E que você possui um campo chamado 'conteudo_pdf' que armazena o conteúdo do PDF.

    // Execute uma consulta SQL para obter o conteúdo do PDF.
    $sql = "SELECT pdf FROM PDF WHERE fk_idProposta = ? and fk_idTipoPDF = ?"; // Altere 'tabela_pdf' e 'id' conforme necessário.

    // Prepare a declaração SQL.
    $stmt = $conn->prepare($sql);

    // Vincular o ID do PDF como parâmetro da declaração SQL.
    $idProposta = $_GET['id']; // Supondo que você esteja passando o ID do PDF na URL como parâmetro (ex: exibir_pdf.php?id=1).
    $tipoPdf = 1;
    $stmt->bind_param("ii", $idProposta, $tipoPdf);

    // Executar a declaração SQL.
    $stmt->execute();

    // Vincular o resultado da consulta a uma variável.
    $stmt->bind_result($conteudoPdf);

    // Obter o resultado da consulta (conteúdo do PDF).
    $stmt->fetch();

    // Fechar a declaração e a conexão.
    $stmt->close();
    $conn->close();

    // Retornar o conteúdo do PDF.
    return $conteudoPdf;
}

// Recuperar o conteúdo do PDF do banco de dados.
$conteudoPdf = pegarConteudoPdfDoBanco();

// Defina o cabeçalho para indicar que a resposta é um PDF.
header('Content-type: application/pdf');
header('Content-Disposition: inline; filename="orçamento.pdf"');

//pegar imagem do banco de dados
//dentro do header o image/ tem que colocar a extensao certinho da imagem.
// header('Content-type: image/jpg, image/png');

// Envie o conteúdo do PDF como resposta.
echo $conteudoPdf;