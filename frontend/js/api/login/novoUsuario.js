import alertas from '../../feedback.js';
import { back } from '../Rotas/rotas.js'
/*------------------------- VERIFICAÇÃO DO EMAIL ---------------------------------------*/
/*
    Assim que om usuário clicar fora do input do email será feita uma verificação se possui cadastro e se
    o usuário é novo para redefinir a senha
*/

const email = document.querySelector('#email');
email.addEventListener('blur', () => {
    const inputEmail = document.getElementById('email').value;
    

    if (inputEmail != '') {

        verificaEmail(email.value + '@sp.senai.br');
    }

});

// Verificando o email caso o cliente aperte a tecla enter enquanto esta digitando o email
email.addEventListener('keydown', evento => {

    if (evento.key === 'Enter') verificaEmail(email.value + '@sp.senai.br');

});

// função para verificar o email do usuário
async function verificaEmail(email) {

    try {

        // Requisição para validação do email
        const resposta = await fetch(back + '/login/novoUsuario.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        });

        if (!resposta.ok) {

            localStorage.setItem('status', 'error');
            localStorage.setItem('mensagem', 'Um erro ocorreu, tente novamente!');

            alertas();
            
            return;
        }

        const retornoServidor = await resposta.json();

        if (retornoServidor.novoUsuario == true){
            localStorage.setItem('status', retornoServidor.status);
            localStorage.setItem('mensagem', retornoServidor.mensagem);

            alertas();
        }


        // Veririfcando o retorno do servidor e verificando se é novo usuário
        if (retornoServidor.novoUsuario === true) novoUsuario();


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


/*------------------------------------ NÃO DEIXA COLAR NA PARTE DE REPETIR SENHA -----------------------------------*/
const repetirSenha = document.querySelector('#repitaSenha');
repetirSenha.addEventListener('paste', evento => evento.preventDefault());


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


    try {

        if (!letraMaiuscula(novaSenha) ||!letraMinuscula(novaSenha) || !possuiNumero(novaSenha) || !tamanhoMinimo(novaSenha)) {
            localStorage.setItem('status', 'error');
            localStorage.setItem('mensagem', 'Requisitos não atendidos nas senhas');

            alertas();
        } else if (!senhasIguais(novaSenha, repitaSenha)) {
            localStorage.setItem('status', 'error');
            localStorage.setItem('mensagem', 'Diferença entre as senhas');

            alertas();
        } else {
    
            // Função para mandar o email e a senha para o banco de dados e salvar a nova senha
            await salvandoSenha(email.value + '@sp.senai.br', repitaSenha);
    
            // Fazendo o formulário de novo usuário desaparecer
            const formularioNovaSenha = document.querySelector('#formularioNovaSenha');
            formularioNovaSenha.style.display = 'none'
    
            // Fazendo o formulário antigo aparecer
            const formulario = document.querySelector('#formulario');
            formulario.style.display = 'flex';
        }


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
        const enviaBackend = await fetch(back + `/login/salvaNovaSenha.php`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        if (!enviaBackend.ok) {

            localStorage.setItem('status', 'error');
            localStorage.setItem('mensagem', 'Um erro ocorreu, tente novamente!');

        } else {

            // Pegando a resposta do servidor
            const resposta = await enviaBackend.json();

            localStorage.setItem('status', resposta.status);
            localStorage.setItem('mensagem', resposta.mensagem);
        }

    } catch (erro) {
        
        localStorage.setItem('status', 'error');
        localStorage.setItem('mensagem', 'Um erro ocorreu, tente novamente!');
    }

    alertas();

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