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
function validacao($dados, $conn)
{

    // Preparando a query
    $stmt = $conn->prepare("SELECT * FROM Usuarios WHERE NIF = ? AND Email = ? AND TipoUser IN (?, ?, ?)");

    // Jogando os valores no parâmetro
    $stmt->bind_param('sss', $_SESSION['nif'], $_SESSION['email'], $dados['cargo']);

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
        if (validacao($dados, $conn)) {
            echo json_encode(['acesso' => true]);
        } else {
            echo json_encode(['acesso' => false]);
        }

    } else {
        echo json_encode(['Mensagem' => 'USUÁRIO INVÁLIDO...']);
    }

} else {
    echo json_encode(['ERRO' => 'ALGO DEU ERRADO...']);
}

?>