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

    $nif = $_SESSION['nif'];

    $stmt = $conn->prepare("SELECT NIF, TipoUser, Nome, Sobrenome, Email FROM Usuarios WHERE NIF = ?");
    $stmt->bind_param("s", $nif);

    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows > 0) {
        $usuario = $resultado->fetch_assoc();


        $nif = $usuario['NIF'];
        $cargo = $usuario['TipoUser'];
        $nome = $usuario['Nome'];
        $sobrenome = $usuario['Sobrenome'];
        $email = $usuario['Email'];

        // Envindo a resposta para o front-end
        $resposta = [
            'status' => 'success',
            'dados' => [
                'nif' => $nif,
                'cargo' => $cargo,
                'email' => $email,
                'nome' => $nome,
                'sobrenome' => $sobrenome,
            ],
            'mensagem' => 'Bem vindo ' . $nome
        ];


    } else {
        $resposta = [
            'status' => 'error',
            'mensagem' => 'Nenhum usuário encontrado.'
        ];
    }

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