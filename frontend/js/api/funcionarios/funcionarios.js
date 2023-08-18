/*
----------------------------------------------------------------------------------
                        RENDERIZANDO A LISTA DE USUÁRIO
----------------------------------------------------------------------------------
*/
window.addEventListener('load', () => {

    // Função para renderizar a lista de usuários
    retornaFuncionarios();

});

// Funão para retornar uma lisat de funcionários
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
            // Criando botões para editar e desativar funcionários
            const editar = document.createElement('button');
            const demitir = document.createElement('button');

            // Atribuindo o NIF no valor do botão
            editar.value = funcionario.NIF
            demitir.value = funcionario.NIF

            // Atribuindo uma classe no botão de demitir
            editar.classList.add('editar');
            demitir.classList.add('demitir');

            // Atribuindo um texto
            editar.textContent = 'Editar';
            demitir.textContent = 'Demitir';

            // Adicionando na div
            div.appendChild(editar);
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

        // Receber erros personalizados do back-end
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
                        PROCESSO DE EDITAR OU DEMITIR O USUÁRIO 
---------------------------------------------------------------------------------------
*/

// Capturando o clique dos botões de demissão
document.addEventListener('click', evento => {

    // Pegando o elemento clicado pelo usuário
    const elemento = evento.target;

    // verificando se é mesmo o botão de demitir
    if (elemento.classList.contains('demitir')) {
        // Selecionando o NIF que vai ser usado para desativar o usuário
        const nif = elemento.value;

        desativarUsuario(nif);

    } else if (elemento.classList.contains('editar')) {

        // Selecionando o NIF que vai ser usado para desativar o usuário
        const nif = elemento.value;

        // Salvando o valor do nif para ser usado mais tarde
        localStorage.setItem('nif', nif);

        // Aparecer com o formulário de editar
        FormularioEditarUsuario(nif);

    }

});

// Função para mostrar a tela de edição do usuário
async function FormularioEditarUsuario(nif) {

    // Fazendo a lista de funcionários desaparecer
    const exibicao = document.querySelector('#exibicao');

    // Selecionando o formulário
    const formularioEditarUsuario = document.querySelector('#formularioEditarUsuario');

    // Alterando a visibilidade
    // Renderizando de acordo o evento
    if (formularioEditarUsuario.style.display === 'flex') {

        // Escondendo o formulário
        formularioEditarUsuario.style.display = 'none';

        // Exibindo a lista
        exibicao.style.display = 'block';

    } else {
        // Exibindo o formulário
        formularioEditarUsuario.style.display = 'flex';

        // Escondendo a lista de funcionários
        exibicao.style.display = 'none';

        // Quando aparecer o formulário será feita uma requisição para retornar os dados
        dadosParaEditar(nif);
    }
}

// Função para fazer a requisição para editar nome, email, cargo e resetar a senha
async function dadosParaEditar(nif) {
    try {

        // Requisição ao servidor
        const requisicao = await fetch(`http://localhost:8080/backend/php/funcionarios/pesquisarFuncionario.php?valor=${nif}`);

        // Convertendo a resposta em json
        const resposta = await requisicao.json();

        // Receber erros personalizados do back-end
        if (resposta.status === 'erro') throw new Error(resposta.mensagem);

        // Função para retornar os dados para editar
        exibirDadosParaEditar(resposta.usuarios);

    } catch (erro) {
        console.error(erro);
    }
}

// Colocando os valores no formulário
function exibirDadosParaEditar(dados) {

    // Pegando os elementos para editar
    const editarNome = document.querySelector('#editarNome');
    const editarSobrenome = document.querySelector('#editarSobrenome');
    const editarEmail = document.querySelector('#editarEmail');

    for (usuario of dados) {
        editarNome.value = usuario.Nome;
        editarSobrenome.value = usuario.Sobrenome;
        // Tirando o padrão do email do SENAI
        editarEmail.value = usuario.Email.replace('@sp.senai.br', '');
    }

}

// Enviar o formulário para editar
const formularioEditarUsuario = document.querySelector('#formularioEditarUsuario');
formularioEditarUsuario.addEventListener('submit', evento => {

    // Parando o evento do formulário
    evento.preventDefault();

    // Pegando os valores do formulário
    const nome = document.querySelector('#editarNome').value;
    const sobrenome = document.querySelector('#editarSobrenome').value;
    const email = document.querySelector('#editarEmail').value;
    const cargo = document.querySelector('#editarCargo').value;

    try {

        // Pegando o nif armazenado no localStorage
        const nif = localStorage.getItem('nif');

        // Verificando se o nome e sobrenome possuem símbolos ou números
        if (!contemApenasLetrasEspacos(nome)) throw new Error(`o CAMPO "Nome" PRECISA POSSUIR SOMENTE LETRAS...`);

        // Verificando se o sobrenome possuem símbolos ou números
        if (!contemApenasLetrasEspacos(sobrenome)) throw new Error(`o CAMPO "Sobrenome" PRECISA POSSUIR SOMENTE LETRAS...`);

        // Verificando se o email possui pelo menos uma letra:
        if (!contemPeloMenosUmaLetra(email)) throw new Error(`o CAMPO "Email" PRECISA POSSUIR LETRAS...`);

        const dadosEditados = {
            nif: nif,
            nome: nome,
            sobrenome: sobrenome,
            email: email + '@sp.senai.br',
            cargo: cargo
        }

        console.log(dadosEditados);

        // Função para editar os funcionários
        requisicaoEditar(dadosEditados);

    } catch (erro) {
        console.error(erro);
    }

});

// Função para mandar os dados para editar
async function requisicaoEditar(dados) {

    // Requisição PUT para editar
    const requisicao = await fetch(`http://localhost:8080/backend/php/funcionarios/editarFuncionario.php`, {
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

    console.log(resposta);

}

// Função para desativar o usuário
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

/*
--------------------------------------------------------------------------------------- 
                        RESETAR A SENHA DO USUÁRIO 
---------------------------------------------------------------------------------------
*/

// Selecionando o botão para disparar o evento
const resetarSenha = document.querySelector('#resetarSenha');

// Quando o usuário clicar a senha será resetada
resetarSenha.addEventListener('click', () => {

    const nif = localStorage.getItem('nif');

    // Função para resetar a senha
    resetarSenhaUsuario(nif);

});

// Função para desativar o usuário
async function resetarSenhaUsuario(nif) {

    try {

        const requisicao = await fetch(`http://localhost:8080/backend/php/funcionarios/resetarSenha.php`, {
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