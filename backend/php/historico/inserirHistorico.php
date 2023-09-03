<?php
function inserirHistorico ($conn, $idProposta) {
    // Preparando a inserção
    $stmt = $conn->prepare("INSERT INTO Historico VALUES
    (default, 1, 1, ?, NOW(), NOW())");

    // Passando os valores como parâmetro
    $stmt->bind_param('i', $idProposta);

    if ($stmt->execute()) {
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