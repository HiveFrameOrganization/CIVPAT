<?php
session_start();
if ($_SESSION['token']) {
    echo json_encode(['mensagem' => 'Você já está logado!', 'status' => 'error', 'logado' => true]);
} else {
    echo json_encode(['mensagem' => 'Bem-vindo', 'status' => 'success', 'logado' => false]);
}
