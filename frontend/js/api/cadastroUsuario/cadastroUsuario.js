import { back } from '../Rotas/rotas.js'
/*------------------------------------ Fazendo aparecer o formulário -------------------------------------------------------------------------*/
const cadastrar = document.querySelector('#cadastrar');




/*------------------------------------------- INSERINDO OS DADOS NO BANCO -------------------------------------------------------------------------*/

// Pegando o eveto do formulário
const formulario = document.querySelector('#formulario');
// Função para selecionar o evento do formulário, essa função lida com operações assincronas...
formulario.addEventListener('submit', async evento => {

    evento.preventDefault();

    // Pegando os valores do formulário
    const nome = document.querySelector('#nome').value;
    const sobrenome = document.querySelector('#sobrenome').value;
    const nif = document.querySelector('#nif').value;
    const email = document.querySelector('#email').value;
    const cargo = document.querySelector('#tipoCargo').value;
    console.log(cargo);

    // Código para validação, colocar dentro de um try
    try {

        // Verificando se o campo NIF possui letras ou simbolos
        if (!contemApenasNumeros(nif)) throw new Error('O NIF SÓ PODE RECEBER NÚMEROS!!!!');

        // Verificando se o nome e sobrenome possuem símbolos ou números
        if (!contemApenasLetrasEspacos(nome)) throw new Error(`o CAMPO "Nome" PRECISA POSSUIR SOMENTE LETRAS...`);

        // Verificando se o sobrenome possuem símbolos ou números
        if (!contemApenasLetrasEspacos(sobrenome)) throw new Error(`o CAMPO "Sobrenome" PRECISA POSSUIR SOMENTE LETRAS...`);

        // Verificando se o email possui pelo menos uma letra:
        if (!contemPeloMenosUmaLetra(email)) throw new Error(`o CAMPO "Email" PRECISA POSSUIR LETRAS...`);

        const dadosDoCadastro = {
            nome: nome,
            sobrenome: sobrenome,
            nif: nif,
            email: email + '@sp.senai.br',
            senha: 'senai115',
            cargo: cargo
        }

        console.log(dadosDoCadastro);

        await mandarDadosParaBackend(dadosDoCadastro);

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

        // Verificando o que foi retornado no back-end
        console.log(retornoBackend);

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
