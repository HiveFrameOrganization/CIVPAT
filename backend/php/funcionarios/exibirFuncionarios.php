<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

// Buscando o arquivo do banco:
require_once '../../../database/conn.php';

function retornaFuncionarios($conn)
{
    // preparando a query
    $stmt = $conn->prepare("SELECT NIF, Nome, Sobrenome, Email, TipoUser, Status FROM Usuarios");

    // Excutando a query
    $stmt->execute();

    $resultado = $stmt->get_result();

    $usuarios = array();

    // Iterando sobre os resultados e armazenando em um array
    while ($linha = $resultado->fetch_assoc()) {
        $usuarios[] = $linha;
    }

    // Enviando a resposta do servidor
    $resposta = [
        'status' => 'success',
        'mensagem' => 'Usuários retornados com sucesso',
        'usuarios' => $usuarios
    ];


    echo json_encode($resposta);

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