import alertas from '../../feedback.js';
import { back } from '../Rotas/rotas.js'
/*
------------------------- PROCESSO DE AUTENTICAÇÃO E NÍVEL DE ACESSO DO USUÁRIO ------------------------------
*/

// Verificação ocorre a cada carregamento de página
export async function autenticacao(cargo) {

    try {
        // Pegando o token para enviar na requisição
        const token = localStorage.getItem('token');

        const dados = {
            token: token,
            cargo: cargo
        }

        const verificacao = await fetch(back + `/login/autenticacao.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        if (!verificacao.ok) {

            localStorage.setItem('status', 'error');
            localStorage.setItem('mensagem', 'Falha de autenticação, deslogue e faça login novamente!');

            alertas();

            return;
        }

        const resposta = await verificacao.json();

        if (resposta.status === 'erro') {
            window.location.pathname = '/frontend/pages/login/erro.html';
        }


    } catch (erro) {
        
        localStorage.setItem('status', 'error');
        localStorage.setItem('mensagem', 'Falha de autenticação, deslogue e faça login novamente!');

        alertas();

        return;
    }

}

/*
----------------------------------- PROCESSO DE DESLOGAR O FUNCIONÁRIO ----------------------------------------
*/

