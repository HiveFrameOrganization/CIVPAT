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
    
    $filtros = $_GET['filtros'];
    $numPagina = $_GET['pag'];
    $qtdPropostasTela = 5;
    $inicioProposta = $numPagina * $qtdPropostasTela - $qtdPropostasTela;
    $cargo = $_SESSION['cargo'];
    $nif = $_SESSION['nif'];

    if($cargo == 'ger') {

        if ($filtros == ''){
            $stmt = $conn->prepare('SELECT * FROM vw_home WHERE NIF = ?
            LIMIT ?, ?');
    
            $stmt->bind_param('sii', $nif, $inicioProposta, $qtdPropostasTela);
        } else {
            $stmt = $conn->prepare('SELECT * FROM vw_home
            WHERE Status = ? AND NIF = ?
            LIMIT ?, ?');
            // Limita os resultados a 10 propostas por página
            $stmt->bind_param('ssii', $filtros, $nif, $inicioProposta, $qtdPropostasTela);
    
        }

    } else {
        if ($filtros == ''){
            $stmt = $conn->prepare('SELECT * FROM vw_home
            LIMIT ?, ?');
    
            $stmt->bind_param('ii', $inicioProposta, $qtdPropostasTela);
        } else {
            $stmt = $conn->prepare('SELECT * FROM vw_home
            WHERE Status = ?
            LIMIT ?, ?');
            // Limita os resultados a 10 propostas por página
            $stmt->bind_param('sii', $filtros, $inicioProposta, $qtdPropostasTela);
    
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
    $qtdBotoes = qtdBotoes($conn, $qtdPropostasTela, $filtros, $nif, $cargo);

    $resposta = [
        'status' => 'success',
        'mensagem' => 'Dados retornados com sucesso',
        'propostas' => $dados,
        'Em Análise' => $quantidadeDePropostasPorStatus['somaAnalise'],
        'Aceito' => $quantidadeDePropostasPorStatus['somaAceito'],
        'Declinado' => $quantidadeDePropostasPorStatus['somaDeclinado'],
        'Concluido' => $quantidadeDePropostasPorStatus['somaConcluido'],
        'qtdBotoes' => $qtdBotoes
    ];

    $retorno  = json_encode($resposta);

    echo $retorno;

}

// Retorna a quantidade de Propostas
function qtdBotoes($conn, $qtdPropostasTela, $filtros, $nif, $cargo) {
    // preparando a query
    if ($cargo != 'ger') {
        $nif = '%%';
    }

    $stmt = $conn->prepare("SELECT COUNT(idProposta) FROM Propostas 
    INNER JOIN `GerenteResponsavel` ON Propostas.`idProposta` = GerenteResponsavel.`fk_idProposta`
    WHERE Status LIKE ? AND `fk_nifGerente` LIKE ?");

    $filtro = '%' . $filtros . '%';
    $stmt->bind_param('ss', $filtro, $nif);

    // Excutando a query
    $stmt->execute();

    $resultado = $stmt->get_result();

    $qtdPropostas = intval($resultado->fetch_all()[0][0]);

    return ceil($qtdPropostas / $qtdPropostasTela);
}


?>