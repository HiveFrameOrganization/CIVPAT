<?php
    <?php
    // Definindo qual domínio pode acessar esse arquivo
    header('Access-Control-Allow-Origin: http://localhost:8080');
    
    // Definindo quais métodos podem ser usados
    header('Access-Control-Allow-Methods: GET');
    
    // Definindo quais cabeçalhos serão permitidos na requisição
    header('Access-Control-Allow-Headers: Content-Type');
    
    // Cabeçalho informando para o navegador que será retornado um JSON
    header("Content-Type: application/json");
    
    
    
    
    function carregarPdfDoBanco () {
        // Buscando o arquivo do banco
        require_once '../../../database/conn.php';
    
    
        // Verifique se os dados do PDF estão presentes
        if (isset($_GET['id']) && is_numeric($_GET['id'])) {
            $pdf_id = $_GET['id'];
    
            // Aqui você pode realizar as operações necessárias para salvar o PDF no banco de dados
            // Por exemplo, você pode converter o dado binário base64 em bytes para salvar em um banco de dados Blob
            // Certifique-se de adicionar medidas de segurança para evitar problemas como injeção de SQL ou uploads maliciosos de arquivos
    
            // Exemplo de código para salvar em um arquivo no banco de dados:
            // Converter o dado binário base64 em bytes
            // Recupera o dado LONGBLOB do PDF do banco de dados
            $stmt = $conn->prepare("SELECT pdf_data FROM pdf WHERE id = ?");
    
            $stmt->bind_param("i", $pdf_id);
    
            $stmt->execute();
    
            $result = $stmt->get_result();
    
            // Verifica se o PDF foi encontrado no banco
            if ($result->num_rows > 0) {
                $pdf_data = $result->fetch_assoc()['pdf_data'];
    
                // Define os cabeçalhos apropriados para o envio do Blob
                header('Content-Type: application/pdf');
                header('Content-Disposition: inline; filename=arquivo.pdf');
                header('Content-length: ' . strlen($pdf_data));
    
                // Envia o conteúdo do Blob como resposta
                echo $pdf_data;
            } else {
                echo json_encode(['success' => false, 'message' => 'PDF não encontrado no banco']);
            }
    
            $stmt->close();
        } else {
            // Envie uma resposta de erro para o JavaScript
            echo json_encode(['success' => false, 'message' => 'Dados do PDF ausentes']);
        }
        
    }
    
    
    // Verificando o tipo de requisição
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    
        // Obtenha os dados do PDF enviados pelo JavaScript
        $json = file_get_contents('php://input');
    
        // Tranformar o Corpo JSON em um objeto PHP
        $dados = json_decode($json, true);
    
        // Verificar se o JSON é válido
        if ($dados === null) {
            $resposta = [
                'msgErro' => 'JSON inválido'
            ];
    
            echo json_encode($resposta);
    
        } else {
            
            echo carregarPdfDoBanco($conn);
        }
    
    }
    
    
    
    ?>



?>