/*
------------------------- PROCESSO DE AUTENTICAÇÃO E NÍVEL DE ACESSO DO USUÁRIO ------------------------------
*/

// Verificação ocorre a cada carregamento de página
async function autenticacao(cargo) {

    try {
        // Pegando o token para enviar na requisição
        const token = localStorage.getItem('token');

        const dados = {
            token: token,
            cargo: cargo
        }

        const verificacao = await fetch(`http://localhost:8080/backend/php/login/autenticacao.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        const resposta = await verificacao.json();

        console.log(resposta);

        if (resposta.status === 'erro') {
            window.location.href = 'http://localhost:8080/frontend/pages/login/erro.html';
        }


    } catch (erro) {
        console.error(erro);
    }

}

/*
----------------------------------- PROCESSO DE DESLOGAR O FUNCIONÁRIO ----------------------------------------
*/

