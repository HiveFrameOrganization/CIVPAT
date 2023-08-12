<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

require_once '../../../database/conn.php';

$query = "SELECT * FROM Usuarios WHERE TipoUser = 'ger'";
$result = mysqli_query($conn, $query);

while ($row = $result) {
    $rowResposta['nif'] = $row['NIF'];
    $rowResposta['nome'] = $row['Nome'];
    $rowResposta['sobrenome'] = $row['Sobrenome'];
}
