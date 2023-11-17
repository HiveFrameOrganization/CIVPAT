import { back, frontPages } from '../Rotas/rotas.js'
import alertas from '../../feedback.js';

window.addEventListener('load', () => {
    alertas();
})

// Pegando os dados do formulário
const formulario = document.querySelector('#formulario');
formulario.addEventListener('submit', async evento => {
    // Parando o evento de submit
    evento.preventDefault();

    const email = document.querySelector('#email').value.trim();
    const senha = document.querySelector('#senha').value.trim();

    await login(email, senha);

});

document.querySelector('#esquecer-senha-btn').addEventListener('click', () => {

    localStorage.setItem('status', 'info')
    localStorage.setItem('mensagem', 'Entre em contato com um coordenador')

    alertas()
})


// Função para fazer o login
async function login(email, senha) {
    if (email == '' || senha == '') {
        localStorage.setItem('status', 'error');
        localStorage.setItem('mensagem', 'Campos não podem conter só espaços');

        alertas();
    } else {
        const emailCompleto = email + '@sp.senai.br';

        try {
            
    
            // Dados para ser enviado na requisição
            const dados = {
                email: emailCompleto,
                senha: senha
            };
    
            const login = await fetch(back + `/login/login.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
    
            });
    
            if (!login.ok) {
    
                localStorage.setItem('status', 'error');
                localStorage.setItem('mensagem', 'Um erro ocorreu, tente novamente!');
    
            } else {
    
                const resposta = await login.json();
    
                // Validação do login
                localStorage.setItem('status', resposta.status);
                localStorage.setItem('mensagem', resposta.mensagem);
                localStorage.setItem('cargo', resposta.cargo);
                localStorage.setItem('nifPerfil', resposta.nif);
                localStorage.setItem('nomeLogin', resposta.nome);
    
    
                // // Verificando se o login for true
                if (resposta.status == 'error') {
                    alertas();
    
                    return;
                }
    
                if (resposta.status == 'success') {
                    localStorage.setItem('filtroPadrao', '');
                }
    
                // Verificando o cargo de quem está logando para mandar para telas diferentes
                if (resposta.cargo === 'tec') {
    
                    window.location.replace(frontPages + '/perfil/index.html');
    
                } else {
                    
                    if (resposta.login) window.location.replace(frontPages + '/Home/index.html');
                }
    
                // Deu certo, armazenando o token no localStorage
                localStorage.setItem('token', resposta.token);
            }
    
        } catch (erro) {
            
            localStorage.setItem('status', 'error');
            localStorage.setItem('mensagem', 'Um erro ocorreu, tente novamente!');
        }
    
        alertas();
    }
}

alertas();

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
