import { back, frontPages } from '../Rotas/rotas.js'
import alertas from '../../feedback.js';
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
        

        // Dados para ser enviado na requisição
        const dados = {
            email: email,
            senha: senha
        };

        const login = await fetch(back + `/login/login.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)

        });

        const resposta = await login.json();


        // Validação do login
        localStorage.setItem('status', resposta.status);
        localStorage.setItem('mensagem', resposta.mensagem);
        localStorage.setItem('cargo', resposta.cargo);
        localStorage.setItem('nifPerfil', resposta.nif);


        // // Verificando se o login for true
        // if (resposta.status === 'error') throw new Error(resposta.mensagem);

        if (resposta.status == 'error') {
            alertas();
        }

        if (resposta.status == 'success') {
            localStorage.setItem('filtroPadrao', '');
            
        }


        // if (!resposta.login) throw new Error(`NÃO LOGADO...`);

        // Verificando o cargo de quem está logando para mandar para telas diferentes
        if (resposta.cargo === 'tec') {


            window.location.replace(frontPages + '/perfil/index.html');

        } else {
            
            if (resposta.login) window.location.replace(frontPages + '/Home/index.html');

        }

        
        // Deu certo, armazenando o token no localStorage
        localStorage.setItem('token', resposta.token);

    } catch (erro) {
        console.log(erro);
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
