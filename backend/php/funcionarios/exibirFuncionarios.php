<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

// Buscando o arquivo do banco:
require_once '../../../database/conn.php';

function retornaFuncionarios($conn)
{
    $numPagina = $_GET['pag'];
    $qtdFuncionariosTela = 10;
    $limiteFun = intval($numPagina) * $qtdFuncionariosTela;
    $inicioFun = $limiteFun - $qtdFuncionariosTela;

    // preparando a query
    $stmt = $conn->prepare("SELECT NIF, Nome, Sobrenome, Email, TipoUser, Status FROM Usuarios LIMIT ?, ?");
    // Limita os resultados a 10 funcionarios
    $stmt->bind_param('ii', $inicioFun, $limiteFun);

    // Excutando a query
    $stmt->execute();

    $resultado = $stmt->get_result();

    $usuarios = array();

    // Iterando sobre os resultados e armazenando em um array
    while ($linha = $resultado->fetch_assoc()) {
        $usuarios[] = $linha;
    }

    $qtdBotoes = qtdBotoes($conn, $qtdFuncionariosTela);

    // Enviando a resposta do servidor
    $resposta = [
        'status' => 'success',
        'mensagem' => 'Usuários retornados com sucesso',
        'usuarios' => $usuarios,
        'qtdBotoes' => $qtdBotoes,
        'teste' => $inicioFun
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

    $qtdFuncionarios = intval($resultado->fetch_all()[0][0]);

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