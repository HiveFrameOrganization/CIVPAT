<?php
$host = getenv("DATABASE_HOST"); // Host do banco de dados
$usuario = getenv("DATABASE_USER"); // Usuário do banco de dados
$senha = getenv("DATABASE_PASSWORD"); // Senha do banco de dados
$banco = getenv("DATABASE_NAME"); // Nome do banco de dados
$conn = mysqli_connect($host, $usuario, $senha, $banco);
