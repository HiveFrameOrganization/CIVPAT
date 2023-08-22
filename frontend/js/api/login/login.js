// Pegando os dados do formulário
const formulario = document.querySelector('#formulario');
formulario.addEventListener('submit', async evento => {
    // Parando o evento de submit
    evento.preventDefault();

    const email = document.querySelector('#email').value + '@sp.senai.br';
    const senha = document.querySelector('#senha').value;

    await login(email, senha);

});

// Função para fazer o login
async function login(email, senha) {
    try {
        // Veririficando se a senha possui alguma letra maiúscula
        if (!letraMaiuscula(senha)) throw new Error(`A SENHA DEVE POSSUIR LETRA MAIÚSCULA!!!!`);

        // Veririficando se a senha possui alguma letra minuscula
        if (!letraMinuscula(senha)) throw new Error(`A SENHA DEVE POSSUIR LETRA MINÚSCULA!!!!`);

        // Veririficando se a senha possui algum número
        if (!possuiNumero(senha)) throw new Error(`A SENHA DEVE POSSUIR ALGUM NÚMERO!!!!`);

        // Verificando se ela tem o tamanho mínimo de 8 caracteres
        if (!tamanhoMinimo(senha)) throw new Error(`A SENHA DEVE TER PELO MENOS 8 CARACTERES!!!!`);

        // Dados para ser enviado na requisição
        const dados = {
            email: email,
            senha: senha
        };

        const login = await fetch(`http://localhost:8080/backend/php/login/login.php`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)

        });

        const resposta = await login.json();

        console.log(resposta)
        
        // Validação do login
        localStorage.setItem('status', resposta.status);
        localStorage.setItem('mensagem', resposta.mensagem);

        if(!resposta.login){
            alertas();
        }
        // if (!resposta.login) throw new Error(`NÃO LOGADO...`);

        if(resposta.login) window.location.replace(window.location.origin 
            + '/frontend/pages/todasPropostas/todasPropostas.html');
        
        // Deu certo, armazenando o token no localStorage
        localStorage.setItem('token', resposta.token);

    } catch (erro) {
        console.error(erro);
    }
}



/*-------------------------------- FUNÇÕES PARA VALIDAR A SENHA ------------------------------------*/
function letraMaiuscula(senha) {
    return /[A-Z]/.test(senha);
}

function letraMinuscula(senha) {
    return /[a-z]/.test(senha);
}

function possuiNumero(senha) {
    return /[0-9]/.test(senha);
}

function tamanhoMinimo(senha) {
    return senha.length >= 8
}
