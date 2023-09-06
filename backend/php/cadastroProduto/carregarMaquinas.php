<?php 
session_start();
// Específica qual URL pode acessar
header('Access-Control-Allow-Origin: http://localhost:8080');

// Especifica qual método http é aceito
header('Access-Control-Allow-Methods: GET');

// Cabeçalhos que podem ser recebidos
header('Access-Control-Allow-Headers: Content-Type');

// Tipo de conteúdo que é aceito no back-end
header("Content-Type: application/json");

// Requerindo o arquivo que faz a conexão com o banco de dados
require_once '../../../database/conn.php';

// Função para buscar as máquinas cadastradas no banco e mandar para o front-end
function buscandoMaquinas($conn) {

    // Preparando a query
    $stmt = $conn->prepare("SELECT * from Maquinas");

    $stmt->execute();
    $resultado = $stmt->get_result();

    // Array para pegar todos os produtos retornados
    $produtos = array();

    if ($resultado->num_rows > 0) {

        while ($linha = $resultado->fetch_assoc()) {
            // Processar os resultados
            $maquinas[] = $linha;
        }
    
        // Enviando a resposta do servidor
        $resposta = [
            'status' => 'success',
            'mensagem' => 'Máquinas retornadas com sucesso',
            'maquinas' => $maquinas
        ];

    } else {

        $resposta = [
            'status' => 'error',
            'mensagem' => 'Nenhuma máquina encontrado'
        ];

    }

    
    echo json_encode($resposta);

}

// Verificando o tipo de requisição
if($_SERVER['REQUEST_METHOD'] === 'GET') {

    // Buscando as máquinas cadastradas e manadando para o frontend
    buscandoMaquinas($conn);

} else {

    // Mandando a resposta para o front-end
    $resposta = [
        'status' => 'error',
        'mensagem' => 'Aconteceu algum erro...'
    ];
    
    echo json_encode($resposta);
    
}
?>