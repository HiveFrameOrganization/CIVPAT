<?php

header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

// Buscando o arquivo do banco:
require_once '../../../database/conn.php';


function verificarHoras($idProduto, $conn) {
    
    //Seleciona tudo que esta na tabela CargaHoraria, junto do NIF do usuario responsável pelo produto
    $stmt = $conn -> prepare ("SELECT * FROM vw_lancamentoHoras WHERE  fk_idProduto = ?");
    $stmt -> bind_param('s', $idProduto);
    $stmt -> execute();
    $resultado = $stmt -> get_result();

   

    if ($resultado -> num_rows > 0){
        $dados = mysqli_fetch_assoc($resultado);

        //Somar as horas diarias do tecnico para não ultrapassar de 10 horas
        $dataHoje = date('Y-m-d');
         $stmt = $conn -> prepare ("SELECT SUM(HorasPessoa) AS totalHorasPessoaDiarias FROM CargaHoraria WHERE datas = ? and fk_nifTecnico = ?");
        $stmt -> bind_param('ss', $dataHoje, $dados['NIF']);
        $stmt -> execute();
        $horasDiarias = $stmt -> get_result();
        $totalHorasPessoaDiarias = mysqli_fetch_assoc($horasDiarias);

        $dataHoje = date('Y-m-d');
         $stmt = $conn -> prepare ("SELECT SUM(HorasMaquina) AS totalHorasMaquinaDiarias FROM CargaHoraria WHERE datas = ? and fk_nifTecnico = ?");
        $stmt -> bind_param('ss', $dataHoje, $dados['NIF']);
        $stmt -> execute();
        $horasDiarias = $stmt -> get_result();
        $totalHorasMaquinaDiarias = mysqli_fetch_assoc($horasDiarias);


        //Somar as horas total da pessoa 
        $stmt = $conn -> prepare ("SELECT SUM(HorasPessoa) AS horasAcumuladasPessoa 
            FROM CargaHoraria WHERE fk_idProduto =?
         ");
        $stmt -> bind_param('s', $idProduto);
        $stmt -> execute();
        $horasTotalPessoa = $stmt -> get_result();
        $horasAcumuladasPessoa = mysqli_fetch_assoc($horasTotalPessoa);
        
        //Somar a horas total da máquina
        $stmt = $conn -> prepare ("SELECT SUM(HorasMaquina) AS horasAcumuladasMaquina
            FROM CargaHoraria WHERE fk_idProduto =?
         ");
        $stmt -> bind_param('s', $idProduto);
        $stmt -> execute();
        $horasTotalMaquina = $stmt -> get_result();
        $horasAcumuladasMaquina = mysqli_fetch_assoc($horasTotalMaquina);
        

    
        $dataHoje = date('Y-m-d');
        $stmt = $conn -> prepare("SELECT SUM(HorasPessoa) AS somaHoras from CargaHoraria WHERE Datas = ? and fk_idProduto = ?");
        $stmt -> bind_param('ss', $dataHoje, $idProduto);
        $stmt -> execute();
        $somaHoras = $stmt -> get_result();
        $somaHoras = mysqli_fetch_assoc($somaHoras);

        //Somar as horas diarias da máquina
        $dataHoje = date('Y-m-d');
        $stmt = $conn -> prepare("SELECT SUM(HorasMaquina) AS somaHorasMaquina from CargaHoraria WHERE Datas = ? AND fk_idProduto = ?");
        $stmt -> bind_param('ss', $dataHoje, $idProduto);
        $stmt -> execute();
        $somaHorasMaquinas = $stmt -> get_result();
        $somaHorasMaquina = mysqli_fetch_assoc($somaHorasMaquinas);



        //Passar as informações como objeto para o front
        $resposta = [
            "horaTotalPessoa" => $horasAcumuladasPessoa['horasAcumuladasPessoa'],
            "horaTotalMaquina" =>  $horasAcumuladasMaquina['horasAcumuladasMaquina'],

            "datas" => $dataHoje,

            "horasAcumuladasPessoa" => $somaHoras['somaHoras'],
            "horasAcumuladasMaquina" => $somaHorasMaquina['somaHorasMaquina'],

            "horasDiariasPessoas" => $somaHoras['somaHoras'],
            "horasDiariasMaquina" => $somaHorasMaquina['somaHorasMaquina'],

            "totalHorasPessoaDiarias" => $totalHorasPessoaDiarias['totalHorasPessoaDiarias'],
            "totalHorasMaquinaDiarias" => $totalHorasMaquinaDiarias['totalHorasMaquinaDiarias'],
             
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