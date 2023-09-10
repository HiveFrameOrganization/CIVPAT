import { back } from '../Rotas/rotas.js'
import alertas from '../../feedback.js'
/*------------------------------------ Fazendo aparecer o formulário -------------------------------------------------------------------------*/

// const cadastrar = document.querySelector('#cadastrar');

// cadastrar.addEventListener('click', () => {
//     // Fazendo a lista de funcionários desaparecer
//     const exibicao = document.querySelector('#exibicao');

//     // Selecionando o formulário
//     const formulario = document.querySelector('#formulario');

//     // Renderizando de acordo o evento
//     if (formulario.style.display === 'flex') {

//         // Escondendo o formulário
//         formulario.style.display = 'none';

//         // Exibindo a lista
//         exibicao.style.display = 'block';

//         // Alterando o nome do botão
//         cadastrar.textContent = 'Cadastrar';
//         console.log(cadastrar.value);

//     } else {

//         // Exibindo o formulário
//         formulario.style.display = 'flex';

//         // Escondendo a lista de funcionários
//         exibicao.style.display = 'none';

//         // Alterando o nome do botão
//         cadastrar.textContent = 'Voltar';

//         console.log(cadastrar.value);


//     }
// });


/*------------------------------------------- INSERINDO OS DADOS NO BANCO -------------------------------------------------------------------------*/

window.addEventListener('load', () => {
    alertas();
})
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

    // Código para validação, colocar dentro de um try
    try {

        // // Verificando se o campo NIF possui letras ou simbolos
        // if (!contemApenasNumeros(nif)) throw new Error('O NIF SÓ PODE RECEBER NÚMEROS!!!!');

        // // Verificando se o nome e sobrenome possuem símbolos ou números
        // if (!contemApenasLetrasEspacos(nome)) throw new Error(`o CAMPO "Nome" PRECISA POSSUIR SOMENTE LETRAS...`);

        // // Verificando se o sobrenome possuem símbolos ou números
        // if (!contemApenasLetrasEspacos(sobrenome)) throw new Error(`o CAMPO "Sobrenome" PRECISA POSSUIR SOMENTE LETRAS...`);

        // // Verificando se o email possui pelo menos uma letra:
        // if (!contemPeloMenosUmaLetra(email)) throw new Error(`o CAMPO "Email" PRECISA POSSUIR LETRAS...`);

        if (!contemApenasNumeros(nif) || !contemApenasLetrasEspacos(nome) || !contemApenasLetrasEspacos(sobrenome) || !contemPeloMenosUmaLetra(email)) {
            localStorage.setItem('status', 'error');
            localStorage.setItem('mensagem', 'Campos preenchidos incorretamente');

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
