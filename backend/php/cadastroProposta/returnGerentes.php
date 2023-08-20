<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

require_once '../../../database/conn.php';

$query = "SELECT * FROM Usuarios WHERE TipoUser = 'ger'";

if ($result = mysqli_query($conn, $query)) {

    $gerentes = array(); 
    
    while ($row = mysqli_fetch_assoc($result)) {
        $gerente = array(
            "nif" => $row['NIF'],
            "nome" => $row['Nome'],
            "sobrenome" => $row['Sobrenome']
        );
        $gerentes[] = $gerente;
    }
    
    $response = array(
        'retorno' => true,
        'mensagem' => 'Gerentes buscados com sucesso.',
        'gerentesRetornados' => $gerentes
    );

} else {
    $response = array(
        'retorno' => false
    );
}
echo json_encode($response);