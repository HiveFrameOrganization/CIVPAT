<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

// Buscando o arquivo do banco:
require_once '../../../database/conn.php';

// Função para alterar a senha padrão de novo usuário
function alteraSenhaBanco($dados, $conn)
{

    $email = $dados['email'];

    // Criptografando a senha antes de jogar no banco
    $senha = password_hash($dados['senha'], PASSWORD_DEFAULT);

    // Preparando a query
    $stmt = $conn->prepare("UPDATE Usuarios SET Senha = ? WHERE Email = ?");

    $stmt->bind_param('ss', $senha, $email);

    $stmt->execute();

    if ($stmt->affected_rows > 0) {

        // Resposta a ser retronada para o servidor
        $resposta = [
            'mensagem' => 'Senha salva com sucesso!',
            'status' => 'success'
        ];

        echo json_encode($resposta);

    } else {

        $resposta = [
            'mensagem' => 'Não foi possível alterar a senha...',
            'status' => 'error'
        ];

        echo json_encode($resposta);
    }

}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Guardar o corpo da requisição em uma variável
    $json = file_get_contents('php://input');

    // Colocando a variável em um objeto
    $dados = json_decode($json, true);

    alteraSenhaBanco($dados, $conn);

} else {
    $resposta = [
        'mensagem' => 'Algo deu errado...',
        'status' => 'erro'
    ];

    echo json_encode($resposta);
}

?>