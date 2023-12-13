<?php
session_start();
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

$login = true;
// Buscando o arquivo do banco:
require_once '../../../database/conn.php';

function validarSenha($senhaUsuario, $dadosBanco)
{

    // Validando a senha
    if (password_verify($senhaUsuario, $dadosBanco['Senha'])) {

        /*
            Gerando o Token e também salvando as credênciais de login que só ficara no
            back-end para validações de autenticação e afins
        */
        $_SESSION['token'] = password_hash($dadosBanco['TipoUser'], PASSWORD_DEFAULT);
        $_SESSION['email'] = $dadosBanco['Email'];
        $_SESSION['nif'] = $dadosBanco['NIF'];
        $_SESSION['nome'] = $dadosBanco['Nome'];
        $_SESSION['sobrenome'] = $dadosBanco['Sobrenome'];
        $_SESSION['cargo'] = $dadosBanco['TipoUser'];
        $_SESSION['situacao'] = $dadosBanco['Situacao'];

        // Mandando o token para o cliente
        $resposta = [
            'login' => true,
            'token' => $_SESSION['token'],
            'cargo' => $dadosBanco['TipoUser'],
            'nif' => $dadosBanco['NIF'],
            'nome' => ucwords($dadosBanco['Nome']) . ' ' .  ucwords($dadosBanco['Sobrenome']),
            'mensagem' => 'Bem vindo ' . ucwords($dadosBanco['Nome']) . ' ' .  ucwords($dadosBanco['Sobrenome']),
            'status' => 'success',
            'situacao' => $dadosBanco['Status']
        ];

        echo json_encode($resposta);
    } else {

        // resposta a ser mandado para o front-end
        $resposta = [
            'mensagem' => 'E-mail e/ou senha inválidos',
            'login' => false,
            'status' => 'error'
        ];

        echo json_encode($resposta);
    }

}

function validarDados($dados, $conn)
{

    // Validadando o email primeiro
    $email = $dados['email'];
    $senhaUsuario = $dados['senha'];
    $status = 'ativo';

    // Fazendo a query para a validação
    $stmt = $conn->prepare("SELECT * FROM Usuarios WHERE Email = ? AND `Status` = ?");
    $stmt->bind_param('ss', $email, $status);

    // Executando a query e pegando o resultado
    $stmt->execute();
    $resultado = $stmt->get_result();

    // Verificando se retornou algum registro
    if ($resultado->num_rows > 0) {

        $registros = $resultado->fetch_assoc();

        validarSenha($senhaUsuario, $registros);

    } else {

        $resposta = [
            'mensagem' => 'E-mail e/ou senha inválidos',
            'login' => false,
            'status' => 'error'
        ];

        echo json_encode($resposta);
    }


}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Pegando o valor do corpo da requisição
    $json = file_get_contents('php://input');
    $dados = json_decode($json, true);

    validarDados($dados, $conn);

} else {

    $resposta = [
        'mensagem' => 'Algo deu errado...',
        'login' => false,
        'status' => 'error'
    ];

    echo json_encode($resposta);
}
?>