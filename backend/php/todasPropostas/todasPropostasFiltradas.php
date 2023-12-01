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
    $stmt = $conn->prepare('SELECT * FROM vw_kpi');

    $stmt->execute();

    $resultado = $stmt->get_result();

    $linha = $resultado->fetch_assoc();

    return $linha;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    
    $aba = $_GET['aba'];
    $pesquisaAtual = $_GET['pesquisaAtual'];
    $numPagina = $_GET['pag'];
    $qtdPropostasTela = 5;
    $inicioProposta = $numPagina * $qtdPropostasTela - $qtdPropostasTela;
    $test = '';
    $cargo = $_SESSION['cargo'];
    $nif = $_SESSION['nif'];

    if ($cargo != 'ger') {
        $nif = '%%';
    }

    if ($pesquisaAtual == ''){
        $stmt = $conn->prepare('SELECT * FROM vw_home
        WHERE TituloProposta COLLATE utf8mb4_unicode_ci LIKE ? AND fk_nifGerente LIKE ?
        LIMIT ?, ?');
        // Limita os resultados a 10 propostas por página
        $stmt->bind_param('ssii', $pesquisaAtual, $nif, $inicioProposta, $qtdPropostasTela);

    } else {

        if ($aba == ''){
            $test = $pesquisaAtual;
            $stmt = $conn->prepare('SELECT * FROM vw_home
            WHERE TituloProposta COLLATE utf8mb4_unicode_ci LIKE ? AND fk_nifGerente LIKE ?
            LIMIT ?, ?');
            // Limita os resultados a 10 propostas por página
            $stmt->bind_param('ssii', $pesquisaAtual, $nif, $inicioProposta, $qtdPropostasTela);

        } else {    
            if ($aba == 'solicitacoes') {
                $declinio = 'Solicitação de Declinio';
                $aceito = 'Solicitação de Aceite';

                $stmt = $conn->prepare('SELECT * FROM vw_home
                WHERE Status in (?, ?) AND TituloProposta COLLATE utf8mb4_unicode_ci LIKE ? AND fk_nifGerente LIKE ?
                LIMIT ?, ?');
                // Limita os resultados a 10 propostas por página
                $stmt->bind_param('ssssii', $aceito, $declinio, $pesquisaAtual, $nif, $inicioProposta, $qtdPropostasTela);
            } else {
                $stmt = $conn->prepare('SELECT * FROM vw_home
                WHERE Status = ? AND TituloProposta COLLATE utf8mb4_unicode_ci LIKE ? AND fk_nifGerente LIKE ?
                LIMIT ?, ?');
                // Limita os resultados a 10 propostas por página
                $stmt->bind_param('sssii', $aba, $pesquisaAtual, $nif, $inicioProposta, $qtdPropostasTela);
            }

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
    $qtdBotoes = qtdBotoes($conn, $qtdPropostasTela, $aba, $pesquisaAtual, $nif, $cargo);

    $resposta = [
        'status' => 'success',
        'mensagem' => 'Dados retornados com sucesso',
        'propostas' => $dados,
        'Em Análise' => $quantidadeDePropostasPorStatus['somaAnalise'],
        'Aceito' => $quantidadeDePropostasPorStatus['somaAceito'],
        'Declinado' => $quantidadeDePropostasPorStatus['somaDeclinado'],
        'Concluido' => $quantidadeDePropostasPorStatus['somaConcluido'],
        'SolicitacaoDeAceite' => $quantidadeDePropostasPorStatus['somaSolicitacoes'],
        'qtdBotoes' => $qtdBotoes
    ];

    $retorno  = json_encode($resposta);

    echo $retorno;

}

// Retorna a quantidade de Propostas
function qtdBotoes($conn, $qtdPropostasTela, $aba, $pesquisaAtual, $nif, $cargo) {
    // preparando a query
    if ($cargo != 'ger') {
        $nif = '%%';
    }

    $stmt = $conn->prepare("SELECT COUNT(idProposta) FROM Propostas
    INNER JOIN `GerenteResponsavel` ON Propostas.`idProposta` = GerenteResponsavel.`fk_idProposta`
    WHERE Status LIKE ? AND TituloProposta LIKE ? AND `fk_nifGerente` LIKE ?");

    $aba = '%' . $aba . '%';
    $stmt->bind_param('sss', $aba, $pesquisaAtual, $nif);

    // Excutando a query
    $stmt->execute();

    $resultado = $stmt->get_result();

    $qtdPropostas = intval($resultado->fetch_all()[0][0]);

    return ceil($qtdPropostas / $qtdPropostasTela);
}
