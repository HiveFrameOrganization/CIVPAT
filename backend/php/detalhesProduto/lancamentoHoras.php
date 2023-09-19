<?php

header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

// Buscando o arquivo do banco:
require_once '../../../database/conn.php';


function verificarHoras($idProduto, $conn) {
    
    $stmt = $conn -> prepare ("SELECT CargaHoraria.*, `Usuarios`.`NIF`, `Produtos`.*
    FROM CargaHoraria
    INNER JOIN Usuarios ON `Usuarios`.`NIF` = `CargaHoraria`.`fk_nifTecnico`
    INNER JOIN Produtos ON `Produtos`.`idProduto` = `CargaHoraria`.`fk_idProduto`
    WHERE  fk_idProduto = ?");

    $stmt -> bind_param('s', $idProduto);
    $stmt -> execute();
    $resultado = $stmt -> get_result();

    $datas = date('y-m-d');

    if ($resultado -> num_rows > 0){
        $dados = mysqli_fetch_assoc($resultado);

        $stmt = $conn -> prepare ("SELECT SUM(HorasPessoa) AS horasAcumuladasPessoa 
            FROM CargaHoraria WHERE fk_idProduto =?
         ");
        $stmt -> bind_param('s', $idProduto);
        $stmt -> execute();
        $horasTotalPessoa = $stmt -> get_result();
        $horasAcumuladasPessoa = mysqli_fetch_assoc($horasTotalPessoa);
        

        $stmt = $conn -> prepare ("SELECT SUM(HorasMaquina) AS horasAcumuladasMaquina
            FROM CargaHoraria WHERE fk_idProduto =?
         ");
        $stmt -> bind_param('s', $idProduto);
        $stmt -> execute();
        $horasTotalMaquina = $stmt -> get_result();
        $horasAcumuladasMaquina = mysqli_fetch_assoc($horasTotalMaquina);
        

        $dataHoje = date('Y-m-d');
        $stmt = $conn -> prepare("SELECT SUM(HorasPessoa) AS somaHoras from CargaHoraria WHERE Datas = ?");
        $stmt -> bind_param('s', $dataHoje);
        $stmt -> execute();
        $somaHoras = $stmt -> get_result();
        $somaHoras = mysqli_fetch_assoc($somaHoras);

        $dataHoje = date('Y-m-d');
        $stmt = $conn -> prepare("SELECT SUM(HorasMaquina) AS somaHorasMaquina from CargaHoraria WHERE Datas = ?");
        $stmt -> bind_param('s', $dataHoje);
        $stmt -> execute();
        $somaHorasMaquinas = $stmt -> get_result();
        $somaHorasMaquina = mysqli_fetch_assoc($somaHorasMaquinas);


        $resposta = [
            "horaTotalPessoa" => $dados['HoraPessoa'],
            "horaTotalMaquina" => $dados['HoraMaquina'],
            "datas" => $dados['Datas'],
            "horasAcumuladasPessoa" => $horasAcumuladasPessoa['horasAcumuladasPessoa'],
            "horasAcumuladasMaquina" => $horasAcumuladasMaquina['horasAcumuladasMaquina'],
            "horasDiariasPessoas" => $somaHoras['somaHoras'],
            "horasDiariasMaquina" => $somaHorasMaquina['somaHorasMaquina'],
            
        ];
        //Passando ele em formato json para o front
        echo json_encode($resposta);
    } else {
        $resposta = [
            'mensagem' => 'Algo deu errado , nenhum registro encontrado',
            'status' => 'error'
        ];
    
        echo json_encode($resposta);
    }

};




//Função para verificar o metodo de requisição vindo do JavaScript
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $idProduto = $_GET['id'];
    
    verificarHoras($idProduto, $conn);

    //Se o metodo for get ele levará para função verificarDetalhes
    // Se não, ele levará de volta e irá dar erro
} else {
    $resposta = [
        'mensagem' => 'Algo deu errado',
        'status' => 'error'
    ];

    echo json_encode($resposta);
}

?>