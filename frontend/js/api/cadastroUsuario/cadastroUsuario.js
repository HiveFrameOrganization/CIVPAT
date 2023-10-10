import { back } from '../Rotas/rotas.js'
import alertas from '../../feedback.js'


/*------------------------------------------- INSERINDO OS DADOS NO BANCO -------------------------------------------------------------------------*/

window.addEventListener('load', () => {
    alertas();
})


function verificaZeros(numero) {
    // Converter o número para uma string
    const numeroString = numero.toString();
  
    return /^[0]+$/.test(numeroString);
}

// Pegando o eveto do formulário
const formulario = document.querySelector('#form-cadastrar');
// Função para selecionar o evento do formulário, essa função lida com operações assincronas...
formulario.addEventListener('submit', async evento => {

    evento.preventDefault();

    // Pegando os valores do formulário
    const nome = document.querySelector('#cad-nome').value;
    const sobrenome = document.querySelector('#cad-sobrenome').value;
    const nif = document.querySelector('#cad-nif').value;
    const email = document.querySelector('#cad-email').value;
    const cargo = document.querySelector('#cad-cargo').value;

    const nifValido = verificaZeros(nif);

    // Código para validação, colocar dentro de um try
    try {

        if (!contemApenasNumeros(nif) || !contemApenasLetrasEspacos(nome) || !contemApenasLetrasEspacos(sobrenome) || !contemPeloMenosUmaLetra(email)) {
            localStorage.setItem('status', 'error');
            localStorage.setItem('mensagem', 'Campos preenchidos incorretamente');

            alertas();
        } else if (nifValido) {
            localStorage.setItem('status', 'error');
            localStorage.setItem('mensagem', 'NIF inválido');

            alertas();
        } else {

            const dadosDoCadastro = {
                nome: nome,
                sobrenome: sobrenome,
                nif: nif,
                email: email + '@sp.senai.br',
                senha: 'senai115',
                cargo: cargo
            }
    
            await mandarDadosParaBackend(dadosDoCadastro);
    
            sessionStorage.removeItem('qtdBotoesFun');
            location.reload();
        }

    } catch (erro) {
        console.error(erro)
    }
});

// Função para fazer a requisição
async function mandarDadosParaBackend(dados) {

    // tentando fazer a requisição para mandar os dados
    try {

        const resposta = await fetch(back + '/cadastroUsuario/cadastroUsuario.php', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        const retornoBackend = await resposta.json();

        localStorage.setItem('status', retornoBackend.status);
        localStorage.setItem('mensagem', retornoBackend.mensagem);

        if (retornoBackend.status == 'error'){
            alertas();

        }

    } catch (erro) {

        console.error(`Algum erro aconteceu: ${erro}`);

    }

}

/*------------------------------------------- FUNÇÕES PARA VALIDAR ALGUMAS COISAS --------------------------------------------------------------*/

function contemApenasNumeros(string) {
    return /^\d+$/.test(string);
}

function contemPeloMenosUmaLetra(string) {
    const regex = /[a-zA-Z]/;
    return regex.test(string);
}

function contemApenasLetrasEspacos(string) {
    const regex = /^[a-zA-ZÉéÇçãÃõÕit\s]+$/;
    return regex.test(string);
}
