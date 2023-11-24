<?php
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

function verificarToken($token) {
    if ($token == $_SESSION['token']) {
        return true;
    } else {
        return false;
    }
}

?>