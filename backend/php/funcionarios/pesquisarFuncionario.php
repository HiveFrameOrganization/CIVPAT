<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

// Buscando o arquivo do banco:
require_once '../../../database/conn.php';

// Função para fazer a pesquisa no banco
function pesquisarUsuario($valor, $conn)
{
    $filtro = $_GET['filtros'];
    $numPagina = $_GET['pag'];
    $qtdFuncionariosTela = 5;
    $inicioFun = $numPagina * $qtdFuncionariosTela;

    // Jogando o nome em outra variável
    $valor = '%' . $valor . '%';
    // $sobrenome = '%' . $nome;

    if ($filtro == '') {
        $filtro = "%";
    }

    // Preparando a query
    $stmt = $conn->prepare("SELECT NIF, Nome, Sobrenome, Email, TipoUser, Status FROM Usuarios WHERE NIF = ? OR Nome LIKE ? OR Sobrenome LIKE ? AND `Status`LIKE ? LIMIT ?, ?");

    $stmt->bind_param('ssssii', $valor, $valor, $valor, $filtro, $inicioFun, $qtdFuncionariosTela);

    // Excutando a query
    $stmt->execute();

    $resultado = $stmt->get_result();

    $usuarios = array();

    if ($resultado->num_rows > 0) {

        // Iterando sobre os resultados e armazenando em um array
        while ($row = $resultado->fetch_assoc()) {
            $usuarios[] = $row;
        }

        // Enviando a resposta do servidor
        $resposta = [
            'status' => 'success',
            'mensagem' => 'Usuários retornados com sucesso',
            'usuarios' => $usuarios
        ];


        echo json_encode($resposta);

    } else {
        $resposta = [
            'status' => 'error',
            'mensagem' => 'Nenhum Usuário encontrado'
        ];

        echo json_encode($resposta);
    }


}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    // Pegando o valor da URL
    $valorPesquisa = $_GET['valor'];

    pesquisarUsuario($valorPesquisa, $conn);

} else {
    // Resposta de erro enviada ao front-end
    $resposta = [
        'mensagem' => 'Aconteceu algum erro...',
        'status' => 'error'
    ];

    echo json_encode($resposta);
}

?>