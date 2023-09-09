<?php
function inserirHistorico ($conn, $idFunilAtual, $idProposta) {
    // Preparando o select
    $stmtSelect = $conn->prepare("SELECT fk_idStatusAtual, DataFinal, idHistorico FROM Historico
    WHERE fk_idProposta = ? ORDER BY `idHistorico` DESC LIMIT 1");

    $stmtSelect->bind_param('i', $idProposta);

    $stmtSelect->execute();
    $resultadoSelect = $stmtSelect-> get_result();
    $dadosSelect = mysqli_fetch_assoc($resultadoSelect);

    // Preparando a inserção
    $stmtInsert = $conn->prepare("INSERT INTO Historico VALUES
    (default, ?, ?, ?, ?, NOW())");

    // Passando os valores como parâmetro
    $stmtInsert->bind_param('iiis', $idFunilAtual, 
    $dadosSelect['fk_idStatusAtual'], $idProposta, $dadosSelect['DataFinal']);

    if ($stmtInsert->execute()) {
        return [
            'status' => 'success',
            'mensagem' => 'Historico Cadastrado'
        ];
    } else {
        return [
            'status' => 'error',
            'mensagem' => 'Historico Não Cadastrado!'
        ];
    }
}
