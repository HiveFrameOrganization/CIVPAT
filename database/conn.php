<?php
try {
    // if (unset($_SESSION[])) {
        $host = getenv("DATABASE_HOST"); // Host do banco de dados
        $usuario = getenv("DATABASE_USER"); // Usuário do banco de dados
        $senha = getenv("DATABASE_PASSWORD"); // Senha do banco de dados
        $banco = getenv("DATABASE_NAME"); // Nome do banco de dados
    // }

    $conn = mysqli_connect($host, $usuario, $senha, $banco);
} catch (Exception $e) {
    $errorMessage = "Ocorreu uma falha na conexão com o banco: ";
    error_log($errorMessage . $e);
    echo json_encode(['mensagem' => "Ocorreu uma falha na conexão com o banco",
    'status' => "Erro"]);
    exit;
}
