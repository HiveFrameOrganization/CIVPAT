<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

// Buscando o arquivo do banco:
require_once '../../../database/conn.php';

function desativarUsuario($nif, $conn) {

    // Craindo a variável para passar como parâmetro
    $situacao = 'desativado';

    // Preprando a query
    $stmt = $conn->prepare("UPDATE Usuarios SET Status = ? WHERE NIF = ?");
    $stmt->bind_param('ss', $situacao, $nif);

    // Excutando e desativando o usuário
    $stmt->execute();

    // Verificando se foi desativado
    if ($stmt->affected_rows > 0) {

        // Resposta a ser retornada para o front-end
        $resposta = [
            'status' => 'sucesso',
            'mensagem' => 'Usuário desativado com sucesso!'
        ];

        echo json_encode($resposta);

    } else {

        // Resposta a ser retornada para o front-end
        $resposta = [
            'status' => 'erro',
            'mensagem' => 'Não foi possíevl desativar o usuário...'
        ];
        
        echo json_encode($resposta);

    }
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {

    // Pegando o corpo da resposta
    $json = file_get_contents('php://input');

    // Convertendo em um array associativo
    $dados = json_decode($json, true);

    // Função para desativar o usuário
    desativarUsuario($dados['nif'], $conn);

} else {

    // Resposta de erro a ser enviada para o front-end
    $resposta = [
        'status' => 'erro',
        'mensagem' => 'Algo deu errado...'
    ];

    echo json_encode($resposta);
}
?>