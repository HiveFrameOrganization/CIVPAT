<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);             
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

// nome proposta, numero sGSET, data inicio e termino, gerente e status, foto do gerente caso tenha'

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    
    $stmt = $conn->prepare('SELECT `Propostas`.`idProposta`, `Propostas`.`nSGSET`, `Propostas`.`TituloProj`, `Propostas`.`Inicio`, `Propostas`.`Fim`, `Propostas`.`Status`, `Usuarios`.`Nome`, `Usuarios`.`FotoDePerfil` FROM Propostas INNER JOIN Usuarios ON `Propostas`.`fk_idGerente` = `Usuarios`.`NIF`;');

    $stmt->execute();

    $resultado = $stmt->get_result();

    $dados = array();

    while ($linha = $resultado->fetch_assoc()) {
        $dados[] = $linha;
    }

    $resposta = [
        'status' => 'sucesso',
        'mensagem' => 'Dados retornados com sucesso',
        'propostas' => $dados
    ];

    $retorno  = json_encode($resposta);

    echo $retorno;

}


?>