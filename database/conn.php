<?php
try {
    session_start();
    if (!isset($_SESSION['cargo'])) {
        $cargo = 'auth';
    } else {
        $cargo = $_SESSION['cargo'];
    }

    $usuario = getenv("DATABASE_USER_$cargo"); // Usuário do banco de dados
    $senha = getenv("DATABASE_PASSWORD_$cargo"); // Senha do banco de dados
    $host = getenv("DATABASE_HOST"); // Host do banco de dados
    $banco = getenv("DATABASE_NAME"); // Nome do banco de dados
    $conn = mysqli_connect($host, $usuario, $senha, $banco);
    unset($cargo);
    unset($login);
} catch (Exception $e) {
    $errorMessage = "Ocorreu uma falha na conexão com o banco: ";
    error_log($errorMessage . $e);
    echo json_encode(['mensagem' => "Ocorreu uma falha na conexão com o banco",
    'status' => "Error"]);
    exit;
}
