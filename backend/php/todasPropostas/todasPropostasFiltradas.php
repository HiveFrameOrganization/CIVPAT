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
    
    $filtroPagina = $_GET['filtroPagina'];
    $filtro = $_GET['filtro'];
    $numPagina = $_GET['pag'];
    $qtdPropostasTela = 5;
    $inicioProposta = $numPagina * $qtdPropostasTela - $qtdPropostasTela;

    if ($filtro == ''){
        
        $stmt = $conn->prepare('SELECT `Propostas`.`idProposta`, `Propostas`.`nSGSET`, `Propostas`.`TituloProposta`,
        `Propostas`.`Inicio`, `Propostas`.`Fim`, `Propostas`.`Status`, `Usuarios`.`Nome`,
        `Usuarios`.`FotoDePerfil` FROM Propostas
        INNER JOIN Usuarios ON `Propostas`.`fk_nifUsuarioCriador` = `Usuarios`.`NIF`
        WHERE `Propostas`.`TituloProposta` COLLATE utf8mb4_unicode_ci LIKE ?
        LIMIT ?, ?');
        // Limita os resultados a 10 propostas por página
        $stmt->bind_param('sii', $filtro, $inicioProposta, $qtdPropostasTela);

    } else {

        if ($filtroPagina == ''){
            $stmt = $conn->prepare('SELECT `Propostas`.`idProposta`, `Propostas`.`nSGSET`, `Propostas`.`TituloProposta`,
            `Propostas`.`Inicio`, `Propostas`.`Fim`, `Propostas`.`Status`, `Usuarios`.`Nome`,
            `Usuarios`.`FotoDePerfil` FROM Propostas
            INNER JOIN Usuarios ON `Propostas`.`fk_nifUsuarioCriador` = `Usuarios`.`NIF`
            WHERE `Propostas`.`TituloProposta` COLLATE utf8mb4_unicode_ci LIKE ?
            LIMIT ?, ?');
            // Limita os resultados a 10 propostas por página
            $stmt->bind_param('sii', $filtro, $inicioProposta, $qtdPropostasTela);

        } else {
            $stmt = $conn->prepare('SELECT `Propostas`.`idProposta`, `Propostas`.`nSGSET`, `Propostas`.`TituloProposta`,
            `Propostas`.`Inicio`, `Propostas`.`Fim`, `Propostas`.`Status`, `Usuarios`.`Nome`,
            `Usuarios`.`FotoDePerfil` FROM Propostas
            INNER JOIN Usuarios ON `Propostas`.`fk_nifUsuarioCriador` = `Usuarios`.`NIF`
            WHERE `Propostas`.`Status` = ? AND `Propostas`.`TituloProposta` COLLATE utf8mb4_unicode_ci LIKE ?
            LIMIT ?, ?');
            // Limita os resultados a 10 propostas por página
            $stmt->bind_param('ssii', $filtroPagina, $filtro, $inicioProposta, $qtdPropostasTela);

        }

    }


    $stmt->execute();

    $resultado = $stmt->get_result();

    $dados = array();

    while ($linha = $resultado->fetch_assoc()) {
        $dados[] = $linha;
    }

    $quantidadeDePropostasPorStatus = quantidadeDePropostasPeloStatus($conn);

    // Caso a quantidade de botoes já tenha sido calculada anteriormente
    // ele evitará de fazer uma busca ao banco desnecessária
    if ($_GET['qtdBotes'] == -1 || $_GET['pesquisado'] == 'sim') {
        $qtdBotoes = qtdBotoes($conn, $qtdPropostasTela, $filtroPagina, $filtro);
    } else {
        $qtdBotoes = $_GET['qtdBotes'];
    }

    $resposta = [
        'status' => 'success',
        'mensagem' => 'Dados retornados com sucesso',
        'propostas' => $dados,
        'Em Análise' => $quantidadeDePropostasPorStatus['somaAnalise'],
        'Aceito' => $quantidadeDePropostasPorStatus['somaAceito'],
        'Declinado' => $quantidadeDePropostasPorStatus['somaDeclinado'],
        'Concluido' => $quantidadeDePropostasPorStatus['somaConcluido'],
        'qtdBotoes' => $qtdBotoes,
        'atest' => $_GET['qtdBotes'] == -1 || $_GET['pesquisado'] == 'sim'
    ];

    $retorno  = json_encode($resposta);

    echo $retorno;

}

// Retorna a quantidade de Propostas
function qtdBotoes($conn, $qtdPropostasTela, $filtroPagina, $filtro) {
    // preparando a query
    $stmt = $conn->prepare("SELECT COUNT(idProposta) FROM Propostas
    WHERE Status LIKE ? AND TituloProposta LIKE ?");

    $filtroPagina = '%' . $filtroPagina . '%';
    $stmt->bind_param('ss', $filtroPagina, $filtro);

    // Excutando a query
    $stmt->execute();

    $resultado = $stmt->get_result();

    $qtdPropostas = intval($resultado->fetch_all()[0][0]);

    return ceil($qtdPropostas / $qtdPropostasTela);
}


?>