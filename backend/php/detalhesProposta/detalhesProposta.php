<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

// Buscando o arquivo do banco:
require_once '../../../database/conn.php';

function verificarDetalhes($idProposta, $conn) {

    // Criando uma variavel para reseber o resultado das querys

    $stmt = $conn->prepare("SELECT * FROM vw_detalhesPropostas WHERE idProposta = ?");

    // Subistituindo o valor do ? pelo parâmetro correnspondente
    $stmt->bind_param('s', $idProposta);
    $stmt->execute();
    $resultado = $stmt-> get_result();

    //Verificando se o resultado foi maior que 0
    if ($resultado->num_rows > 0) {

        $dados = mysqli_fetch_assoc($resultado);

        //Verificando caso valor seja nullo
        if ($dados != null) {

            //Nessa função a variável esta recebendo o primeiro valor da query, sendo ele o menor valor, por data, trazido do banco
            $stmt = $conn->prepare("SELECT DataInicial FROM Produtos  WHERE fk_idProposta = ? ORDER BY DataInicial ASC");
            $stmt->bind_param('s', $idProposta);
            $stmt->execute();
            $resultadoDataInicial = $stmt-> get_result();
            $dadosDataInicial = mysqli_fetch_assoc($resultadoDataInicial);

            //Esta função funciona iagual a anterios, porém ela pega o primeiro valor em ordem decrescente, ou seja, a maior data da tabela
            //Todas em relação ao id da proposta
            $stmt = $conn->prepare(" SELECT  DataFinal FROM Produtos  WHERE fk_idProposta = ? ORDER BY DataFinal DESC");
            $stmt->bind_param('s', $idProposta);
            $stmt->execute();
            $resultadoDataFinal = $stmt-> get_result();
            $dadosDataFinal = mysqli_fetch_assoc($resultadoDataFinal);
            
            //A função abaixo faz uma query de todos os preços dos produtos da proposta selecionada, enquanto ao mesmo tempo ela soma eles.
            $stmt = $conn->prepare(" SELECT SUM(Valor) AS ValorTotal FROM Produtos WHERE fk_idProposta = ?");
            $stmt->bind_param('s', $idProposta);
            $stmt->execute();
            $resultadoValorTotal = $stmt-> get_result();
            $dadosValorTotal = mysqli_fetch_assoc($resultadoValorTotal);

            $situacao = 'Concluido';
            $stmt = $conn->prepare('SELECT COUNT(idProduto) AS Concluidos FROM Produtos WHERE fk_idProposta = ? AND Situacao = ?');
            $stmt->bind_param('ss', $idProposta, $situacao);
            $stmt->execute();
            $resultado = $stmt->get_result();
            $dadosProdutosConcluidos = $resultado->fetch_assoc();

            //Buscando os valores dos responsáveis por cadastrar a proposta
            $stmt = $conn->prepare("SELECT * FROM vw_gerentesResponsaveis WHERE fk_idProposta = ?");
            $stmt->bind_param('s', $idProposta);
            $stmt->execute();
            $gerentes = $stmt-> get_result();
            
            //Criando um array para receber os valores, pos estes podem ser 1 ou 2.
            $registros = array();

            //Salvando as informações dentro de um vetor
            while ($row = $gerentes->fetch_assoc()){
                $registros[] = $row;
            }

           // Transformando os dados em um objeto, passando os valores para os campos que irão preencher o front
            $dealhesProposta = [
                "TituloProposta" => $dados['TituloProposta'],
                "cnpj" => $dados['CNPJ'],
                "uniCriadora" => $dados['fk_idUnidadeCriadora'],
                "empresa" => $dados['Empresa'],
                "statusProposta" => $dados['Status'],
                "criadorProposta" => $dados['Nome'],
                "numeroSGSET" => $dados['nSGSET'],
                "dataPrimeiroProduto" => $dadosDataInicial['DataInicial'],
                "dataUltimoProduto" => $dadosDataFinal['DataFinal'],
                "valorTotalProdutos" => $dadosValorTotal['ValorTotal'],
                "Gerentes" => $registros,
                "StatusFunil" => $dados['StatusFunil'],
                "nomeContato" => $dados['NomeRepresentante'],
                "emailContato" => $dados['EmailRepresentante'],
                "numeroContato" => $dados['TelefoneRepresentante'],
                "resumo" => $dados['Resumo'],
                "idRepresentante" => $dados['idRepresentante'],
                "produtosConcluidos" => $dadosProdutosConcluidos['Concluidos']

            ];

            //Passando ele em formato json para o front
            echo json_encode($dealhesProposta);

        //Caso algo dê errado irá levar essa mensagem de erro como objeto
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


//Função para verificar o metodo de requisição vindo do JavaScript
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $idProposta = $_GET['id'];
    verificarDetalhes($idProposta, $conn);

    //Se o metodo for get ele levará para função verificarDetalhes
    // Se não, ele levará de volta e irá dar erro
} else {
    $resposta = [
        'mensagem' => 'Algo deu errado',
        'status' => 'error'
    ];

    echo json_encode($resposta);
}
