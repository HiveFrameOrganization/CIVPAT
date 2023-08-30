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

        const resposta = await verificacao.json();

        if (resposta.status === 'erro') {
            if (window.location.pathname != '/frontend/pages/Home/index.html'){
                window.location.pathname = '/frontend/pages/login/erro.html';
            } else {
                window.location.pathname = '';
            }
        }


    } catch (erro) {
        console.error(erro);
    }

}

/*
----------------------------------- PROCESSO DE DESLOGAR O FUNCIONÁRIO ----------------------------------------
*/

