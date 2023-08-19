<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

// Buscando o arquivo do banco:
require_once '../../../database/conn.php';

// Função para fazer a pesquisa no banco
function pesquisarUsuario($valor, $conn){
    // Preparando a query
    $stmt = $conn->prepare("SELECT NIF, Nome, Sobrenome, Email, TipoUser, Status FROM Usuarios WHERE Status = ?");

    $stmt->bind_param('s', $valor);

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
            'status' => 'sucesso',
            'mensagem' => 'Usuários retornados com sucesso',
            'usuarios' => $usuarios
        ];


        echo json_encode($resposta);

    } else {
        $resposta = [
            'status' => 'erro',
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
        'status' => 'erro'
    ];

    echo json_encode($resposta);
}
?>