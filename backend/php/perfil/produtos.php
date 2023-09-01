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

// Função para retornar todos os produtos
function retornaProdutos($nif, $conn) {

    // Preparando a query
    $stmt = $conn->prepare("SELECT * FROM Usuarios INNER JOIN Produtos ON Usuarios.NIF = Produtos.fk_nifTecnico INNER JOIN ServicoCategoria ON Produtos.fk_idServicoCategoria = ServicoCategoria.idServicoCategoria INNER JOIN NomeProduto ON Produtos.fk_idNomeProduto = NomeProduto.idNomeProduto INNER JOIN Maquinas ON Produtos.fk_idMaquina = Maquinas.idMaquina WHERE Usuarios.NIF = ? ");
    $stmt->bind_param("s", $nif); // "i" indica um valor inteiro

    $stmt->execute();
    $resultado = $stmt->get_result();

    // Array para pegar todos os produtos retornados
    $produtos = array();

    if ($resultado->num_rows > 0) {

        while ($linha = $resultado->fetch_assoc()) {
            // Processar os resultados
            $produtos[] = $linha;
        }
    
        // Enviando a resposta do servidor
        $resposta = [
            'status' => 'success',
            'mensagem' => 'Produtos retornados com sucesso',
            'usuarios' => $produtos
        ];

    } else {

        $resposta = [
            'status' => 'error',
            'mensagem' => 'Nenhum produto encontrado'
        ];

    }

    
    echo json_encode($resposta);

}

// Verificando a requisição
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    // Pegando o nif para realizar a query e puxar todos os produtos que são vinculados com o técnico em especifico
    $nif = $_GET['nif'];

    retornaProdutos($nif, $conn);

} else {

    // Envindo a resposta para o front-end
    $resposta = [
        'status' => 'error',
        'Mensagem' => 'Ocorreu algum erro...'
    ];

    echo json_encode($resposta);
}
?>