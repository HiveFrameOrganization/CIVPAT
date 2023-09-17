<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");


// Buscando o arquivo do banco:
require_once '../../../database/conn.php';


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $nif = $_GET['nif'];

    // Consulta SQL para obter a imagem (substitua 'sua_tabela' e 'seu_id' pelos valores apropriados)
    $stmt = $conn->prepare("SELECT FotoDePerfil FROM Usuarios WHERE NIF = ?");
    $stmt->bind_param('s', $nif);

    $stmt->execute();

    $resultado = $stmt->get_result();

    if ($resultado->num_rows > 0) {
        $row = $resultado->fetch_assoc();

        // Definir os cabeçalhos para indicar que estamos enviando uma imagem
        header("Content-Type: image/jpeg"); // Altere o tipo de imagem conforme necessário
        echo $row['FotoDePerfil'];

    }
}

?>