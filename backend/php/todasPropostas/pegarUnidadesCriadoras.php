<?php
// Definindo qual domínio pode acessar esse arquivo
header('Access-Control-Allow-Origin: http://localhost:8080');

// Definindo quais métodos podem ser usados
header('Access-Control-Allow-Methods: GET');

// Definindo quais cabeçalhos serão permitidos na requisição
header('Access-Control-Allow-Headers: Content-Type');

// Cabeçalho informando para o navegador que será retornado um JSON
header("Content-Type: application/json");

// Chamar a variável de conexão do banco.
require_once '../../../database/conn.php';


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        
    $stmt = $conn->prepare('SELECT idUnidadeCriadora, UnidadeCriadora FROM UnidadeCriadora;');

    if ($stmt->execute()) {

        $resultado = $stmt->get_result();

        // Pegando os resultados e armazená-los em uma variável
        $registros = array(); 

        while ($row = $resultado->fetch_assoc()) {
            $registros[] = $row; // Adicione cada linha ao array $registros
        }

        $resposta = json_encode($registros);

        echo $resposta;
        
    } else {
        $retorno = [
            'status' => 'error',
            'mensagem' => 'Erro ao pegar as unidades criadoras'
        ];

        $resposta = json_encode($retorno);

        echo $resposta;

    }

    // echo $resposta;

} else {
    http_response_code(405); // Method Not Allowed
}
?>