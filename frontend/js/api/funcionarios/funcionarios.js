/*
----------------------------------------------------------------------------------
                        RENDERIZANDO A LISTA DE USUÁRIO
----------------------------------------------------------------------------------
*/
window.addEventListener('load', () => {

    // Função para renderizar a lista de usuários
    retornaFuncionarios();

});

async function retornaFuncionarios() {

    try {
        // Fazendo a requisição para buscar os dados
        const resposta = await fetch(`http://localhost:8080/backend/php/funcionarios/exibirFuncionarios.php`);

        const dados = await resposta.json();

        // Caso retorne algum erro previsto no back-end
        if (dados.status === 'erro') throw new Error(dados.mensagem);

        console.log(dados);

        // Função específica para exibir o funcionário
        exibir(dados.usuarios);


    } catch (erro) {
        console.error(erro)
    }
}

function exibir(dados) {
    //Selecionando a div que vai ter os funcionário
    const exibicao = document.querySelector('#exibicao');

    // Removendo um possível elemento na div de exibição
    exibicao.innerHTML = '';

    for (funcionario of dados) {

        // Criando os elementos
        const div = document.createElement('div');
        const nome = document.createElement('p');
        const sobrenome = document.createElement('p');
        const nif = document.createElement('p');
        const email = document.createElement('p');
        const cargo = document.createElement('p');
        const status = document.createElement('p');
        const hr = document.createElement('hr');

        // Colocando uma classe na div criada
        div.classList.add('listaUsuario');

        // Adicionando conteúdo nos elementos
        nome.textContent = 'Nome: ' + funcionario.Nome;
        sobrenome.textContent = 'Sobrenome: ' + funcionario.Sobrenome;
        email.textContent = 'Email: ' + funcionario.Email;
        nif.textContent = 'NIF: ' + funcionario.NIF;
        cargo.textContent = 'Cargo: ' + funcionario.TipoUser;
        status.textContent = 'Status: ' + funcionario.Status;

        // Colocando os dados na div a ser renderizada
        div.appendChild(nif);
        div.appendChild(nome);
        div.appendChild(sobrenome);
        div.appendChild(cargo);
        div.appendChild(email);
        div.appendChild(status);


        // Criando o botão de demitir
        if (funcionario.Status === 'ativado') {
            // Craindo o elemento
            const demitir = document.createElement('button');

            // Atribuindo o NIF no valor do botão
            demitir.value = funcionario.NIF

            // Atribuindo uma classe no botão de demitir
            demitir.classList.add('demitir');

            // Atribuindo um texto
            demitir.textContent = 'Demitir';

            // Adicionando na div
            div.appendChild(demitir);
        }

        // Adicionando uma quebra de linha
        div.appendChild(hr);

        // Colocando a div na exibição HTML
        exibicao.appendChild(div);

    }


};


/*
--------------------------------------------------------------------------------------- 
                        PROCESSO DE PESQUISAR USUÁRIO 
---------------------------------------------------------------------------------------
*/


// Capturando o evento de pesquisa
const botaoPesquisar = document.querySelector('#botaoPesquisar');

// Selecionando o input
const pesquisarUsuario = document.querySelector('#pesquisarUsuario');

// Pegando o evento de click para realizar a pesquisa
botaoPesquisar.addEventListener('click', () => {
    pesquisarFuncionario(pesquisarUsuario.value);
});

// Para melhorar a experiência do usuário, quando apertar o enter no input também será realizada a pesquisa

pesquisarUsuario.addEventListener('keydown', evento => {

    if (evento.key === 'Enter') {
        pesquisarFuncionario(pesquisarUsuario.value);
    }

});

// Função específica para realizar a pesquisa do funcionário
async function pesquisarFuncionario(valor) {

    try {

        // Requisição ao servidor
        const requisicao = await fetch(`http://localhost:8080/backend/php/funcionarios/pesquisarFuncionario.php?valor=${valor}`);

        // Convertendo a resposta em json
        const resposta = await requisicao.json();

        if (resposta.status === 'erro') throw new Error(resposta.mensagem);

        exibir(resposta.usuarios);

    } catch (erro) {
        console.error(erro);
        exibirErro(erro);
    }

}

function exibirErro(erro) {
    //Selecionando a div que vai ter os funcionário
    const exibicao = document.querySelector('#exibicao');

    // Removendo um possível elemento na div de exibição
    exibicao.innerHTML = '';

    // Criando um elemnto para mostrar o erro na tela
    const titulo = document.createElement('h1');

    // Adicionando texto e estilo
    titulo.textContent = erro;
    titulo.style.color = 'red';

    exibicao.appendChild(titulo);

}

/*
--------------------------------------------------------------------------------------- 
                        PROCESSO DE FILTRAR USUÁRIO 
---------------------------------------------------------------------------------------
*/

/*------------------------------- Filtro: TODOS -----------------------------------*/
const botaoTodos = document.querySelector('#botaoTodos');
botaoTodos.addEventListener('click', () => {

    // Função para renderizar a lista de usuários
    retornaFuncionarios();

});


/*------------------------------- Filtro: ATIVO -----------------------------------*/
const botaoAtivos = document.querySelector('#botaoAtivos');
botaoAtivos.addEventListener('click', () => {

    // Função para renderizar a lista de usuários
    usuariosFiltrados(botaoAtivos.value);

});


/*------------------------------- Filtro: DESATIVO -----------------------------------*/
const botaoDesativos = document.querySelector('#botaoDesativos');
botaoDesativos.addEventListener('click', () => {

    // Função para renderizar a lista de usuários
    usuariosFiltrados(botaoDesativos.value);

});

async function usuariosFiltrados(valor) {
    try {

        // Requisição ao servidor
        const requisicao = await fetch(`http://localhost:8080/backend/php/funcionarios/pesquisaFiltro.php?valor=${valor}`);

        // Convertendo a resposta em json
        const resposta = await requisicao.json();

        if (resposta.status === 'erro') throw new Error(resposta.mensagem);

        exibir(resposta.usuarios);

    } catch (erro) {
        console.error(erro);
        exibirErro(erro);
    }
}


/*
--------------------------------------------------------------------------------------- 
                        PROCESSO DE DEMITIR O USUÁRIO 
---------------------------------------------------------------------------------------
*/

// Capturando o clique dos botões de demissão
document.addEventListener('click', evento => {

    const elemento = evento.target;

    // verificando se é mesmo o botão de demitir
    if (elemento.classList.contains('demitir')) {
        // Selecionando o NIF que vai ser usado para desativar o usuário
        const nif = elemento.value;

        desativarUsuario(nif);

    }

});

async function desativarUsuario(nif) {

    try {

        const requisicao = await fetch(`http://localhost:8080/backend/php/funcionarios/demitirFuncionarios.php`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nif: nif })
        });

        // Convertendo a requisição em um objeto JS
        const resposta = await requisicao.json();

        // Caso a resposta do servidor sej algum erro já previsto...
        if (resposta.status === 'erro') throw new Error(resposta.mensagem);

        console.log(resposta);

        // Atualizando a lista em tempo real
        retornaFuncionarios();

    } catch (erro) {
        console.error(erro);
    }

}