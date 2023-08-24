<?php
// Definindo qual domínio pode acessar esse arquivo
header('Access-Control-Allow-Origin: http://localhost:8080');

// Definindo quais métodos podem ser usados
header('Access-Control-Allow-Methods: GET');

// Definindo quais cabeçalhos serão permitidos na requisição
header('Access-Control-Allow-Headers: Content-Type');

// Cabeçalho informando para o navegador que será retornado um JSON
header("Content-Type: application/json");

// Chamar a variável de conexão do banco.
require_once '../../../database/conn.php';

// nome proposta, numero sGSET, data inicio e termino, gerente e status, foto do gerente caso tenha'


function quantidadeDePropostasPeloStatus ($conn) {
    $stmt = $conn->prepare('SELECT SUM(CASE WHEN Status = "Em Análise" THEN 1 ELSE 0 END) AS somaAnalise,
    SUM(CASE WHEN Status = "Aceito" THEN 1 ELSE 0 END) AS somaAceito,
    SUM(CASE WHEN Status = "Declinado" THEN 1 ELSE 0 END) AS somaDeclinado,
    SUM(CASE WHEN Status = "Concluido" THEN 1 ELSE 0 END) AS somaConcluido
    FROM Propostas');

    $stmt->execute();

    $resultado = $stmt->get_result();

    $linha = $resultado->fetch_assoc();

    return $linha;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    
    $stmt = $conn->prepare('SELECT `Propostas`.`idProposta`, `Propostas`.`nSGSET`, `Propostas`.`TituloProposta`,
    `Propostas`.`Inicio`, `Propostas`.`Fim`, `Propostas`.`Status`, `Usuarios`.`Nome`,
    `Usuarios`.`FotoDePerfil` FROM Propostas
    INNER JOIN Usuarios ON `Propostas`.`fk_nifUsuarioCriador` = `Usuarios`.`NIF`;');

    $stmt->execute();

    $resultado = $stmt->get_result();

    $dados = array();

    while ($linha = $resultado->fetch_assoc()) {
        $dados[] = $linha;
    }

    $quantidadeDePropostasPorStatus = quantidadeDePropostasPeloStatus($conn);

    $resposta = [
        'status' => 'success',
        'mensagem' => 'Dados retornados com sucesso',
        'propostas' => $dados,
        'Em Análise' => $quantidadeDePropostasPorStatus['somaAnalise'],
        'Aceito' => $quantidadeDePropostasPorStatus['somaAceito'],
        'Declinado' => $quantidadeDePropostasPorStatus['somaDeclinado'],
        'Concluido' => $quantidadeDePropostasPorStatus['somaConcluido']
    ];

    $retorno  = json_encode($resposta);

    echo $retorno;

}


?>