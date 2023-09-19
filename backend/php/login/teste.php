<?php
session_start();
// Buscando o arquivo do banco:
// require_once '../../../database/conn.php';

// $stmt = $conn->prepare("SELECT * FROM Usuarios");
// $stmt->execute();
// $resultado = $stmt->get_result();
// print_r($resultado->fetch_all());

echo $_SESSION['cargo'];