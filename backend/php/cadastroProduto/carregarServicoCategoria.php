<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

// Buscando o arquivo do banco:
require_once '../../../database/conn.php';


function pegarServicoCategoria($conexao) {
    $stmt = $conexao->prepare("SELECT ServicoCategoria FROM ServicoCategoria;");
    
    // Executa a consulta
    $stmt->execute();
    
    // Liga uma variável ao resultado da coluna
    $stmt->bind_result($nomeCategoria);
    
    $categorias = array(); // Array para armazenar os nomes das categorias
    
    // Recupera os resultados
    while ($stmt->fetch()) {
        $categorias[] = $nomeCategoria;
    }
    
    // Fecha o statement
    $stmt->close();

    $retorno = json_encode($categorias);
    
    echo $retorno; // Retorna o array de nomes das categorias
}


// Verificar o tipo da Aplicação
if ($_SERVER['REQUEST_METHOD'] == 'GET') {


    // Verificando se os dados são duplicados
    pegarServicoCategoria($conn);

} else {
    echo json_encode(['Mensagem' => 'Requisição não permitida...']);
}






?>