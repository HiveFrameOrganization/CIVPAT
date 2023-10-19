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

    if ($pesquisaAtual == ''){
        $test = '1';
        $stmt = $conn->prepare('SELECT * FROM vw_home
        WHERE TituloProposta COLLATE utf8mb4_unicode_ci LIKE ?
        LIMIT ?, ?');
        // Limita os resultados a 10 propostas por página
        $stmt->bind_param('sii', $pesquisaAtual, $inicioProposta, $qtdPropostasTela);

    } else {

        if ($aba == ''){
            $test = '2';
            $stmt = $conn->prepare('SELECT * FROM vw_home
            WHERE TituloProposta COLLATE utf8mb4_unicode_ci LIKE ?
            LIMIT ?, ?');
            // Limita os resultados a 10 propostas por página
            $stmt->bind_param('sii', $pesquisaAtual, $inicioProposta, $qtdPropostasTela);

        } else {    
            if ($aba == 'solicitacoes') {

                $declinio = 'Solicitação de Declinio';
                $aceito = 'Solicitação de Aceite';

                $stmt = $conn->prepare('SELECT * FROM vw_home
                WHERE Status in (?, ?) AND TituloProposta COLLATE utf8mb4_unicode_ci LIKE ?
                LIMIT ?, ?');
                // Limita os resultados a 10 propostas por página
                $stmt->bind_param('sssii', $aceito, $declinio, $pesquisaAtual, $inicioProposta, $qtdPropostasTela);
            } else {

                $stmt = $conn->prepare('SELECT * FROM vw_home
                WHERE Status = ? AND TituloProposta COLLATE utf8mb4_unicode_ci LIKE ?
                LIMIT ?, ?');
                // Limita os resultados a 10 propostas por página
                $stmt->bind_param('ssii', $aba, $pesquisaAtual, $inicioProposta, $qtdPropostasTela);
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
    if ($_GET['qtdBotes'] == -1 || $_GET['pesquisado'] == 'sim') {
        $qtdBotoes = qtdBotoes($conn, $qtdPropostasTela, $aba, $pesquisaAtual);
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
        'atest' => $test
    ];

    $retorno  = json_encode($resposta);

    echo $retorno;

}

// Retorna a quantidade de Propostas
function qtdBotoes($conn, $qtdPropostasTela, $aba, $pesquisaAtual) {
    // preparando a query
    $stmt = $conn->prepare("SELECT COUNT(idProposta) FROM Propostas
    WHERE Status LIKE ? AND TituloProposta LIKE ?");

    $aba = '%' . $aba . '%';
    $stmt->bind_param('ss', $aba, $pesquisaAtual);

    // Excutando a query
    $stmt->execute();

    $resultado = $stmt->get_result();

    $qtdPropostas = intval($resultado->fetch_all()[0][0]);

    return ceil($qtdPropostas / $qtdPropostasTela);
}
