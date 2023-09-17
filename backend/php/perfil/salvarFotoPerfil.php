<?php 
// Específica qual URL pode acessar
header('Access-Control-Allow-Origin: http://localhost:8080');

// Especifica qual método http é aceito
header('Access-Control-Allow-Methods: POST');

// Cabeçalhos que podem ser recebidos
header('Access-Control-Allow-Headers: Content-Type');

// Tipo de conteúdo que é aceito no back-end
header("Content-Type: application/json");

require_once '../../../database/conn.php' ;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $nomeImagem = $_GET['nomeImagem'];
    $foto = file_get_contents($_FILES['imagem']["tmp_name"]);
    $nif = $_GET['nif'];

    $stmt = $conn->prepare('UPDATE Usuarios SET FotoDePerfil = ? WHERE nif = ?');

    $stmt->bind_param('ss', $foto, $nif);

    if ($stmt->execute()){
        $resposta = [
            'status' => 'success',
            'mensagem' => 'Foto alterada com sucesso'
        ];
    } else {
        $resposta = [
            'status' => 'error',
            'mensagem' => 'Erro ao alterar a foto de perfil'
        ];
    }

    

    echo json_encode($resposta);
} else {
    http_response_code(405); // Method Not Allowed
}


?>