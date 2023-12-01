import alertas from '../../feedback.js';
import { back } from '../Rotas/rotas.js'
/*
------------------------- PROCESSO DE AUTENTICAÇÃO E NÍVEL DE ACESSO DO USUÁRIO ------------------------------
*/

// Verificação ocorre a cada carregamento de página
export async function autenticacao(cargo, load) {

    try {
        // Pegando o token para enviar na requisição
        var token;
        setTimeout(() => {token = localStorage.getItem('token')}, 1000)

        if (!token) {

            // Limpando residuos
            localStorage.clear();   
            sessionStorage.clear();

            localStorage.setItem('status', 'error');
            localStorage.setItem('mensagem', 'É necessário realizar um novo login.');

            // Requisição para sair da conta
            const deslogar = await fetch(`http://localhost:8080/backend/php/login/sair.php`);

            const resposta = await deslogar.json();

            window.location.href = 'http://localhost:8080/';

            return false;
        }

        const verificacao = await fetch(back + `/login/autenticacao.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        // console.log(verificacao);

        const resposta = await verificacao.json();

        if (resposta.status === 'erro' && load ) {
            window.location.pathname = '/frontend/pages/login/erro.html';
        } else {
            return resposta.autenticação;
        }


    } catch (erro) {
        console.error(erro)
        return false;
    }

}