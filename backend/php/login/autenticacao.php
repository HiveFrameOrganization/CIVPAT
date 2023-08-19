<?php
session_start();
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

// Buscando o arquivo do banco:
require_once '../../../database/conn.php';

/*
    Essa validação consiste em verificar se o nível de permissão esta atrelado ao
    próprio nível de acesso do funcionário. A consulta é feita com base nas variáveis de sessão
    comaprando o email o nif e se o cargo dele corresponde ao cargo que foi pedido ao lado do
    cliente...
*/
function validacao($cargos, $conn)
{

    // Construir a lista de placeholders (?, ?, ?) com base no tamanho do array
    $placeholders = implode(', ', array_fill(0, count($cargos), '?'));

    // Preparando a query
    $stmt = $conn->prepare("SELECT * FROM Usuarios WHERE NIF = ? AND Email = ? AND TipoUser IN ($placeholders)");


    // Vincular os valores do array aos placeholders
    // O primeiro argumento de bind_param é uma string que define os tipos dos parâmetros.
    // No seu caso, são 2 strings (ss) seguidas do número de cargos (tantos quantos houver no array).
    $tiposParametro = 'ss' . str_repeat('s', count($cargos));
    $stmt->bind_param($tiposParametro, $_SESSION['nif'], $_SESSION['email'], ...$cargos);


    // Excutando
    $stmt->execute();

    // Resultado da execução
    $resultado = $stmt->get_result();

    // Verificando se registros foram retornados registros foram retornados
    if ($resultado->num_rows > 0)
        return true;

    return false;

}

// Verificando o tipo da requisição
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Armazenar o contéudo do corpo da requisição
    $json = file_get_contents('php://input');
    $dados = json_decode($json, true);

    //Verificando se o token de acesso é valido
    if ($dados['token'] === $_SESSION['token']) {

        // Se for válido sera feito um processo de avaliação para saber a permissão
        if (validacao($dados['cargo'], $conn)) {

            // Resposta a ser retronada para o servidor
            $resposta = [
                'autenticação' => true,
                'mensagem' => 'Usuário autenticado!',
                'status' => 'sucesso'
            ];

            echo json_encode($resposta);

        } else {
            // Resposta a ser retronada para o servidor
            $resposta = [
                'autenticação' => false,
                'mensagem' => 'Usuário não autenticado...',
                'status' => 'erro'
            ];

            echo json_encode($resposta);
        }

    } else {

        // Resposta a ser retronada para o servidor
        $resposta = [
            'mensagem' => 'Usuário inválido...',
            'status' => 'erro'
        ];

        echo json_encode($resposta);
    }

} else {
    // Resposta a ser retronada para o servidor
    $resposta = [
        'mensagem' => 'Algo deu errado...',
        'status' => 'erro'
    ];

    echo json_encode($resposta);
}

?>