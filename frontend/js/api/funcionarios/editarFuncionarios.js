import { back } from '../Rotas/rotas.js';

async function editarFuncionarios() {

    // Pegando os valores do formulário
    const nome = document.querySelector('#editarNome').value;
    const sobrenome = document.querySelector('#editarSobrenome').value;
    const email = document.querySelector('#editarEmail').value.replace('@sp.senai.br', '');
    const cargo = document.querySelector('#editarCargo').value;

    try {
        // Pegando o nif armazenado no localStorage
        const nif = localStorage.getItem('nif');

        // // Verificando se o nome e sobrenome possuem símbolos ou números
        // if (!contemApenasLetrasEspacos(nome)) throw new Error(`o CAMPO "Nome" PRECISA POSSUIR SOMENTE LETRAS...`);

        // // Verificando se o sobrenome possuem símbolos ou números
        // if (!contemApenasLetrasEspacos(sobrenome)) throw new Error(`o CAMPO "Sobrenome" PRECISA POSSUIR SOMENTE LETRAS...`);

        // // Verificando se o email possui pelo menos uma letra:
        // if (!contemPeloMenosUmaLetra(email)) throw new Error(`o CAMPO "Email" PRECISA POSSUIR LETRAS...`);

        if (!contemApenasLetrasEspacos(nome) || !contemApenasLetrasEspacos(sobrenome) || !contemPeloMenosUmaLetra(email)) {
            localStorage.setItem('status', 'error');
            localStorage.setItem('mensagem', 'Campos preenchidos incorretamente');

            alertas();
        } else {
            const dadosEditados = {
                nif: nif,
                nome: nome,
                sobrenome: sobrenome,
                email: email + '@sp.senai.br',
                cargo: cargo
            }
    
            // Função para editar os funcionários
            const resp = await requisicaoEditar(dadosEditados);

            console.log(resp);

            if (resp.status == 'success') {
                location.reload();

            }
    
        }
    } catch (erro) {
        console.error(erro);
    }

}


// Função para mandar os dados para editar
async function requisicaoEditar(dados) {

    console.log(dados)

    // Requisição PUT para editar
    const requisicao = await fetch(back + `/funcionarios/editarFuncionario.php`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    });

    // Pegando a resposta retornado pelo servidor
    const resposta = await requisicao.json();


    // tratamento caso haja algum erro previsto no back-end
    if (resposta.status === 'error') throw new Error(resposta.mensagem);

    localStorage.setItem('status', resposta.status);
    localStorage.setItem('mensagem', resposta.mensagem);

    return resposta;

}

function contemPeloMenosUmaLetra(string) {
    const regex = /[a-zA-Z]/;
    return regex.test(string);
}

function contemApenasLetrasEspacos(string) {
    const regex = /^[a-zA-ZÉéÇçãÃõÕit\s]+$/;
    return regex.test(string);
}

export default editarFuncionarios