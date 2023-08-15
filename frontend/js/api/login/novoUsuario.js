
/*------------------------- VERIFICAÇÃO DO EMAIL ---------------------------------------*/
/*
    Assim que om usuário clicar fora do input do email será feita uma verificação se possui cadastro e se
    o usuário é novo para redefinir a senha
*/

const email = document.querySelector('#email');
email.addEventListener('blur', async () => {

    verificaEmail(email.value + '@sp.senai.br');

});

// função para verificar o email do usuário
async function verificaEmail(email) {

    try {

        // Requisição para validação do email
        const resposta = await fetch('http://localhost:8080/backend/php/login/novoUsuario.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        });

        const retornoServidor = await resposta.json();

        console.log(retornoServidor);

        // Veririfcando o retorno do servidor e verificando se é novo usuário
        if (retornoServidor.novoUsuario === true) novoUsuario();

        // Caso o usuário não esteja cadastrado
        if (retornoServidor.Erro) throw new Error(`USUÁRIO NÃO CADASTRADO!!!!`);

    } catch (erro) {
        console.error(erro);
    }

}

// Função que é excutada somanete quando há um novo funcionário fazendo login
function novoUsuario() {
    // Fazendo o formulário de novo usuário aparecer
    const formularioNovaSenha = document.querySelector('#formularioNovaSenha');
    formularioNovaSenha.style.display = 'flex'

    // Fazendo o formulário antigo desaparecer
    const formulario = document.querySelector('#formulario');
    formulario.style.display = 'none';

}

/*------------------------------------ ETAPA DE VERIFICAÇÃO DA NOVA SENHA -----------------------------------*/

// Pegando novamente o formulário da nova senha pois ela esta um um outro escopo isolado
const formularioNovaSenha = document.querySelector('#formularioNovaSenha');

// Capturando a senha
formularioNovaSenha.addEventListener('submit', async evento => {

    // Parando o evento do formulário
    evento.preventDefault();

    // Pegando as senhas digitadas
    const novaSenha = document.querySelector('#novaSenha').value;
    const repitaSenha = document.querySelector('#repitaSenha').value;

    console.log(novaSenha);
    console.log(repitaSenha);

    try {

        // Veririficando se a senha possui alguma letra maiúscula
        if (!letraMaiuscula(novaSenha)) throw new Error(`A SENHA DEVE POSSUIR LETRA MAIÚSCULA!!!!`);

        // Veririficando se a senha possui alguma letra minuscula
        if (!letraMinuscula(novaSenha)) throw new Error(`A SENHA DEVE POSSUIR LETRA MINÚSCULA!!!!`);

        // Veririficando se a senha possui algum número
        if (!possuiNumero(novaSenha)) throw new Error(`A SENHA DEVE POSSUIR ALGUM NÚMERO!!!!`);

        // Verificando se ela tem o tamanho mínimo de 8 caracteres
        if (!tamanhoMinimo(novaSenha)) throw new Error(`A SENHA DEVE TER PELO MENOS 8 CARACTERES!!!!`);

        // Verificando se as senhas digitadas são iguais
        if (!senhasIguais(novaSenha, repitaSenha)) throw new Error(`AS SENHAS NÃO CONFEREM!!!!`);

        console.log('SENHA VÁLIDA!!!!');

        // Função para mandar o email e a senha para o banco de dados e salvar a nova senha
        await salvandoSenha(email.value + '@sp.senai.br', repitaSenha);

        // Fazendo o formulário de novo usuário desaparecer
        const formularioNovaSenha = document.querySelector('#formularioNovaSenha');
        formularioNovaSenha.style.display = 'none'

        // Fazendo o formulário antigo aparecer
        const formulario = document.querySelector('#formulario');
        formulario.style.display = 'flex';

    } catch (erro) {
        console.error(erro);
    }


});


/*-------------------------------- MANDANDO A NOVA SENHA PARA O BANCO DE DADOS ------------------------------------*/

async function salvandoSenha(email, senha) {

    try {

        // Objeto a ser mandado para o back-end
        const dados = {
            email: email,
            senha: senha
        }

        // Realizando a requisição
        const enviaBackend = await fetch(`http://localhost:8080/backend/php/login/salvaNovaSenha.php`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        // Pegando a resposta do servidor
        const resposta = await enviaBackend.json();

        console.log(resposta);

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

function senhasIguais(senha1, senha2) {
    return senha1 === senha2;
}