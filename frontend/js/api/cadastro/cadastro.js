/*------------------------------------------ ESQUEMA PARA PEGAR O CARGO... -------------------------------------------------------------------*/

// Criando a variavel cargo no escopo global para conseguir passar o valor para o back-end
let cargo;

// Pegando o cargo...  
const listaDeCargo = document.querySelector('#listaDeCargos');

listaDeCargo.addEventListener('click', evento => {

    const elemento = evento.target;
    cargo = elemento.textContent;

});

// Função para retornar o cargo formatado da forma correta para inserir no banco
function retornaCargo(cargo) {
    // Switch para retornar o cargo certo
    switch (cargo) {
        case 'Administrador':
            return 'adm';
        case 'Gerente':
            return 'ger';
        case 'Técnico':
            return 'tec';
        case 'Coordenador':
            return 'coor';
        default:
            return 'nada'
    }
}

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
    const senha = document.querySelector('#senha').value;
    
    // Pegando o cargo selecionado através da da função abaixo
    const tipoCargo = retornaCargo(cargo);

    // Código para validação, colocar dentro de um try
    try {

        // Verificando se o cargo está vazio
        if (tipoCargo === 'nada') {
            throw new Error('O CARGO NÃO FOI SELECIONADO!')
        }

        const dadosDoCadastro = {
            nome: nome,
            sobrenome: sobrenome,
            nif: nif,
            email: email,
            senha: senha,
            cargo: tipoCargo
        }

        await mandarDadosParaBackend(dadosDoCadastro);

    } catch (erro) {
        console.error(erro)
    }

    
});

// Função para fazer a requisição
async function mandarDadosParaBackend(dados) {

    // tentando fazer a requisição para mandar os dados
    try {

        const resposta = await fetch('http://localhost:8080/backend/php/cadastro/cadastro.php', {
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


