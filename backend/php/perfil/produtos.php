<?php
session_start();
// Específica qual URL pode acessar
header('Access-Control-Allow-Origin: http://localhost:8080');

// Especifica qual método http é aceito
header('Access-Control-Allow-Methods: GET');

// Cabeçalhos que podem ser recebidos
header('Access-Control-Allow-Headers: Content-Type');

// Tipo de conteúdo que é aceito no back-end
header("Content-Type: application/json");

// Requerindo o arquivo que faz a conexão com o banco de dados
require_once '../../../database/conn.php';

// Função para retornar todos os produtos
function retornaProdutos($nif, $pagina, $conn)
{

    $quantidadeDeProdutos = 5;

    $inicioProdutos = $pagina * $quantidadeDeProdutos;

    // Preparando a query
    $stmt = $conn->prepare("SELECT Produtos.idProduto, Produtos.Area, Produtos.Valor, Produtos.HoraPessoa, Produtos.Situacao, Produtos.HoraMaquina, Produtos.DataInicial, Produtos.DataFinal, Maquinas.Maquina, Maquinas.idMaquina, Usuarios.NIF, Usuarios.Nome, Usuarios.TipoUser, ServicoCategoria.ServicoCategoria, NomeProduto.NomeProduto, Propostas.TituloProposta, Propostas.nSGSET, Propostas.Status
    FROM Usuarios INNER JOIN Produtos ON Usuarios.NIF = Produtos.fk_nifTecnico 
    INNER JOIN Propostas ON Produtos.fk_idProposta = Propostas.idProposta
    INNER JOIN ServicoCategoria ON Produtos.fk_idServicoCategoria = ServicoCategoria.idServicoCategoria 
    INNER JOIN NomeProduto ON Produtos.fk_idNomeProduto = NomeProduto.idNomeProduto 
    INNER JOIN Maquinas ON Produtos.fk_idMaquina = Maquinas.idMaquina 
    WHERE Usuarios.NIF = ? AND (Propostas.Status = 'Aceito' OR Propostas.Status = 'Em Análise')  LIMIT ?, ?");
    $stmt->bind_param("sii", $nif, $inicioProdutos, $quantidadeDeProdutos); // "i" indica um valor inteiro

    $stmt->execute();
    $resultado = $stmt->get_result();

    // Array para pegar todos os produtos retornados
    $produtos = array();

    if ($resultado->num_rows > 0) {

        while ($linha = $resultado->fetch_assoc()) {
            // Processar os resultados
            $produtos[] = $linha;
        }

        // Caso a quantidade de botoes já tenha sido calculada anteriormente
        // ele evitará de fazer uma busca ao banco desnecessária
        if ($_GET['qtdBotoes'] == -1) {
            $qtdBotoes = qtdBotoes($conn, $quantidadeDeProdutos, $nif);
        } else {
            $qtdBotoes = $_GET['qtdBotoes'];
        }

        // Enviando a resposta do servidor
        $resposta = [
            'status' => 'success',
            'mensagem' => 'Produtos retornados com sucesso',
            'produtos' => $produtos,
            'qtdBotoes' => $qtdBotoes
        ];

    } else {

        $resposta = [
            'status' => 'error',
            'mensagem' => 'Nenhum produto encontrado'
        ];

    }


    echo json_encode($resposta);

}

// Retorna a quantidade de funcionários
function qtdBotoes($conn, $quantidadeDeProdutosTela, $nif) {
    // preparando a query
    $stmt = $conn->prepare("SELECT COUNT(idProduto) FROM Produtos WHERE fk_nifTecnico = ? ");

    $stmt->bind_param('s', $nif);

    // Excutando a query
    $stmt->execute();

    $resultado = $stmt->get_result();

    // Retornando a quantidade de funcionarios
    $qtdProdutos = intval($resultado->fetch_all()[0][0]);

    // Calculando a quantidade de botoes, dividindo a quantidade de funcionarios no banco 
    // pela quantidade de funcionario por tela
    return ceil($qtdProdutos / $quantidadeDeProdutosTela);
}

// Verificando a requisição
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    // Pegando o nif para realizar a query e puxar todos os produtos que são vinculados com o técnico em especifico
    $nif = $_GET['nif'];

    // Pegando a numerção da página
    $pagina = $_GET['pagina'];

    retornaProdutos($nif, $pagina, $conn);

} else {

    // Envindo a resposta para o front-end
    $resposta = [
        'status' => 'error',
        'Mensagem' => 'Ocorreu algum erro...'
    ];

    echo json_encode($resposta);
}
?>