/*
------------------------- PROCESSO DE AUTENTICAÇÃO E NÍVEL DE ACESSO DO USUÁRIO ------------------------------
*/

// Verificação ocorre a cada carregamento de página
window.addEventListener('load', async () => {

    try {

        // Pegando o token para enviar na requisição
        const token = localStorage.getItem('token');

        const dados = {
            token: token,
            cargo: 'adm'
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

    } catch (erro) {
        console.error(erro);
    }

});

/*
----------------------------------- PROCESSO DE DESLOGAR O FUNCIONÁRIO ----------------------------------------
*/

const botaoDeslogar = document.querySelector('#deslogar');
botaoDeslogar.addEventListener('click', async () => {

    try {

        localStorage.clear();

        // Requisição para sair da conta
        const deslogar = await fetch(`http://localhost:8080/backend/php/login/sair.php`);

        const resposta = await deslogar.json();

        console.log(resposta);

    } catch (erro) {
        console.error(erro);
    }

});
