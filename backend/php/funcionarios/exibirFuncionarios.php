<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

// Buscando o arquivo do banco:
require_once '../../../database/conn.php';

function retornaFuncionarios($conn)
{
    //
    $filtro = $_GET['filtros'];
    $numPagina = $_GET['pag'];
    $qtdFuncionariosTela = 5;
    $inicioFun = $numPagina * $qtdFuncionariosTela - $qtdFuncionariosTela;

    if ($filtro == ''){
        // preparando a query
        $stmt = $conn->prepare("SELECT NIF, Nome, Sobrenome, Email, TipoUser, Status FROM Usuarios LIMIT ?, ?");
        // Limita os resultados a 10 funcionarios
        $stmt->bind_param('ii', $inicioFun, $qtdFuncionariosTela);

    } else {
        // preparando a query
        $stmt = $conn->prepare("SELECT NIF, Nome, Sobrenome, Email, TipoUser, Status FROM Usuarios WHERE Status = ? LIMIT ?, ?");
        // Limita os resultados a 10 funcionarios
        $stmt->bind_param('sii', $filtro, $inicioFun, $qtdFuncionariosTela);
    }

    // Excutando a query
    $stmt->execute();

    $resultado = $stmt->get_result();

    $usuarios = array();

    // Iterando sobre os resultados e armazenando em um array
    while ($linha = $resultado->fetch_assoc()) {
        $usuarios[] = $linha;
    }

    // Caso a quantidade de botoes já tenha sido calculada anteriormente
    // ele evitará de fazer uma busca ao banco desnecessária
    if ($_GET['qtdBotes'] == -1) {
        $qtdBotoes = qtdBotoes($conn, $qtdFuncionariosTela);
    } else {
        $qtdBotoes = $_GET['qtdBotes'];
    }

    // Enviando a resposta do servidor
    $resposta = [
        'status' => 'success',
        'mensagem' => 'Usuários retornados com sucesso',
        'usuarios' => $usuarios,
        'qtdBotoes' => $qtdBotoes
    ];


    echo json_encode($resposta);

}

// Retorna a quantidade de funcionários
function qtdBotoes($conn, $qtdFuncionariosTela) {
    // preparando a query
    $stmt = $conn->prepare("SELECT COUNT(NIF) FROM Usuarios");

    // Excutando a query
    $stmt->execute();

    $resultado = $stmt->get_result();

    // Retornando a quantidade de funcionarios
    $qtdFuncionarios = intval($resultado->fetch_all()[0][0]);

    // Calculando a quantidade de botoes, dividindo a quantidade de funcionarios no banco 
    // pela quantidade de funcionario por tela
    return ceil($qtdFuncionarios / $qtdFuncionariosTela);
}

// Veirifcando o tipo da requisição
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    retornaFuncionarios($conn);

} else {

    // Enviando uma resposta de erro para o frontend
    $resposta = [
        "mensagem" => 'Algo deu errado...',
        'status' => 'erro'
    ];

    echo json_encode($resposta);
}
?>