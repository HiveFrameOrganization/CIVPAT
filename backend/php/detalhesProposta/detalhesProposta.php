<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

// Buscando o arquivo do banco:
require_once '../../../database/conn.php';

function verificarDetalhes($idProposta, $conn) {
    $stmt = $conn->prepare("SELECT Propostas.*, `Usuarios`.`Nome`, `Representantes`.* FROM Propostas 

    INNER JOIN Usuarios ON `Usuarios`.`NIF` = `Propostas`.`fk_nifUsuarioCriador` 
    INNER JOIN Representantes ON `Representantes`.`idRepresentante` = `Propostas`.`fk_idRepresentante`
    
    WHERE idProposta = ?");


    
    $stmt->bind_param('s', $idProposta);
    $stmt->execute();
    $resultado = $stmt-> get_result();

    if ($resultado->num_rows > 0) {

        $dados = mysqli_fetch_assoc($resultado);

        if ($dados != null) {


            $stmt = $conn->prepare(" SELECT  DataInicial FROM Produtos  WHERE fk_idProposta = ? ORDER BY DataInicial ASC");
            $stmt->bind_param('s', $idProposta);
            $stmt->execute();
            $resultadoDataInicial = $stmt-> get_result();
            $dadosDataInicial = mysqli_fetch_assoc($resultadoDataInicial);

            $stmt = $conn->prepare(" SELECT  DataFinal FROM Produtos  WHERE fk_idProposta = ? ORDER BY DataFinal DESC");
            $stmt->bind_param('s', $idProposta);
            $stmt->execute();
            $resultadoDataFinal = $stmt-> get_result();
            $dadosDataFinal = mysqli_fetch_assoc($resultadoDataFinal);
            
            $stmt = $conn->prepare(" SELECT SUM(Valor) AS ValorTotal FROM Produtos  WHERE fk_idProposta = ?");
            $stmt->bind_param('s', $idProposta);
            $stmt->execute();
            $resultadoValorTotal = $stmt-> get_result();
            $dadosValorTotal = mysqli_fetch_assoc($resultadoValorTotal);
            
            $stmt = $conn->prepare("SELECT GerenteResponsavel.*, `Usuarios`.`Nome` 
            FROM GerenteResponsavel
            INNER JOIN Usuarios ON `Usuarios`.`NIF` = `GerenteResponsavel`.`fk_nifGerente` 
            WHERE fk_idProposta = ?");
            $stmt->bind_param('s', $idProposta);
            $stmt->execute();
            $gerentes = $stmt-> get_result();
            
            $registros = array();

            while ($row = $gerentes->fetch_assoc()){
                $registros[] = $row;
            }

           

            $dealhesProposta = [
                "TituloProposta" => $dados['TituloProposta'],
                "cnpj" => $dados['CNPJ'],
                "uniCriadora" => $dados['UnidadeCriadora'],
                "empresa" => $dados['Empresa'],
                "statusProposta" => $dados['Status'],
                "criadorProposta" => $dados['Nome'],
                "numeroSGSET" => $dados['numeroSGSET'],
                "dataPrimeiroProduto" => $dadosDataInicial['DataInicial'],
                "dataUltimoProduto" => $dadosDataFinal['DataFinal'],
                "valorTotalProdutos" => $dadosValorTotal['ValorTotal'],
                "Gerentes" => $registros, 
                "funil" => $dados['funil'],
                "momeContato" => $dados['nomeRepresentante'],
                "emailContato" => $dados['emailRepresentante'],
                "numeroContato" => $dados['telefoneRepresentante']

            ];

            echo json_encode($dealhesProposta);

        } else {
            $resposta = [
                'mensagem' => 'Algo deu errado',
                'status' => 'error'
            ];
        
            echo json_encode($resposta);
        }
    } else {
        $resposta = [
            'mensagem' => 'Algo deu errado , nenhum registro encontrado',
            'status' => 'error'
        ];
    
        echo json_encode($resposta);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $idProposta = $_GET['id'];
    verificarDetalhes($idProposta, $conn);
} else {
    $resposta = [
        'mensagem' => 'Algo deu errado',
        'status' => 'error'
    ];

    echo json_encode($resposta);
}
?>
