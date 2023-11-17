<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

// Buscando o arquivo do banco:
require_once '../../../database/conn.php';

function editarUsuario($dados, $conn)
{

    // Preprando a query
    $stmt = $conn->prepare("UPDATE Usuarios SET Nome = ?, Sobrenome = ?, Email = ?, TipoUser = ?  WHERE NIF = ?");
    $stmt->bind_param('sssss', $dados['nome'], $dados['sobrenome'], $dados['email'], $dados['cargo'], $dados['nif']);

    // Excutando e desativando o usuário
    $stmt->execute();

    // Verificando se foi desativado
    if ($stmt->affected_rows > 0) {

        // Resposta a ser retornada para o front-end
        $resposta = [
            'status' => 'success',
            'mensagem' => 'Usuário alterado com sucesso!'
        ];


        echo json_encode($resposta);

    } else {

        // Resposta a ser retornada para o front-end
        $resposta = [
            'status' => 'error',
            'mensagem' => 'Não foi possível alterar o usuário...'
        ];

        echo json_encode($resposta);

    }
}

// Função para verificar se é um técnico e não deixar ele ser promovido até concluir todos os produtos;
function verificarTecnico($dados, $conn)
{

    $stmt = $conn->prepare('SELECT Usuarios.*, Produtos.Situacao 
    FROM Usuarios 
    INNER JOIN Produtos ON Usuarios.NIF = Produtos.fk_nifTecnico 
    WHERE Usuarios.NIF = ?;
    ');
    $stmt->bind_param('s', $dados['nif']);

    $stmt->execute();

    $resultado = $stmt->get_result();

    while ($linha = $resultado->fetch_assoc()) {

        if ($linha['TipoUser'] === 'tec' and $linha['TipoUser'] !== $dados['cargo']) {

            if ($linha['Situacao'] === 'Em andamento') {
                return true;
            }

        } else {
            return false;
        }



    }

    return false;

}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {

    // Pegando o corpo da resposta
    $json = file_get_contents('php://input');

    // Convertendo em um array associativo
    $dados = json_decode($json, true);

    if (verificarTecnico($dados, $conn)) {

        $resposta = [
            'status' => 'error',
            'mensagem' => 'O Técnico só pode subir de cargo ao terminar todos os produtos.'
        ];

        echo json_encode($resposta);
    } else {
        // Função para desativar o usuário
        editarUsuario($dados, $conn);
    }


} else {

    // Resposta de erro a ser enviada para o front-end
    $resposta = [
        'status' => 'error',
        'mensagem' => 'Algo deu errado...'
    ];

    echo json_encode($resposta);
}

?>