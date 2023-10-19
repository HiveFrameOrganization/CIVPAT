<?php 
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

// Verificando a requisição
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    // Envindo a resposta para o front-end
    $resposta = [
        'status' => 'success',
        'dados' => [
            'nif' => $_SESSION['nif'],
            'cargo' => $_SESSION['cargo'],
            'email' => $_SESSION['email'],
            'nome' => $_SESSION['nome'],
            'sobrenome' => $_SESSION['sobrenome'],
        ],
        'mensagem' => 'Bem vindo ' . $_SESSION['nome']
    ];

    echo json_encode($resposta);

} else {
    
    // Envindo a resposta para o front-end
    $resposta = [
        'status' => 'error',
        'Mensagem' => 'Ocorreu algum erro...'
    ];

    echo json_encode($resposta);
}
?>