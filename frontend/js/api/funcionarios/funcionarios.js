import { back } from '../Rotas/rotas.js'
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
        const resposta = await fetch(back + `/funcionarios/exibirFuncionarios.php`);

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
    const exibe = document.querySelector('#exibicao');

    // Removendo um possível elemento na div de exibição
    exibe.innerHTML = '';

    for (let funcionario of dados) {

        // Criando os elementos
        const div = document.createElement('div');

        // Colocando uma classe na div criada
        div.classList.add('listaUsuario', 'flex', 'flex-nowrap', 'bg-component', 'rounded-md', 'border-2', 'border-[transparent]', 'hover:border-2', 'hover:border-primary', 'row', 'mt-1');

        const row = document.createElement('div');

        // Colocando uma classe na row criada
        row.classList.add('flex-1', 'flex', 'flex-nowrap', 'items-center', 'justify-between', 'rounded-l-md', 'py-4', 'px-3', 'md:px-4', 'overflow-x-auto', '-we');

        const exibicao = document.createElement('div');

        // Colocando uma classe na div de exibição criada
        exibicao.classList.add('flex', 'items-center', 'gap-3', 'lg:w-full');

        const img = document.createElement('img');

        // Colocando atributos na img criada
        img.classList.add('w-8', 'h-8', 'border', 'border-primary', 'rounded-full');
        img.src = '../../img/icon/perfil.png';
        img.alt = 'Foto do técnico';

        const nomefuncao = document.createElement('div');

        // Colocando uma classe na div de exibição de nome e função criada
        nomefuncao.classList.add('flex', 'flex-col', 'gap-1', 'font-semibold', 'pr-4', 'lg:pr-6');

        const nome = document.createElement('span');

        // Colocando uma classe no span de nome criado
        nome.classList.add('text-lg', 'leading-4', 'whitespace-nowrap', 'text-color-text');

        const funcao = document.createElement('span');

        // Colocando uma classe no span de função criado
        funcao.classList.add('text-xs', 'text-color-text-secundary');

        const divisor = document.createElement('div');

        // Colocando uma classe na divisória criada
        divisor.classList.add('w-px', 'h-10', 'bg-color-text', 'opacity-10', 'divider');

        const exibenif = document.createElement('div');

        // Colocando uma classe na div de exibição de nif criada
        exibenif.classList.add('flex', 'items-center', 'gap-3', 'px-4', 'lg:px-6');

        const flexnif = document.createElement('div');

        // Colocando uma classe na div de exibição de nif criada
        flexnif.classList.add('flex', 'flex-col', 'gap-1', 'font-semibold');

        const titulonif = document.createElement('span');

        // Colocando uma classe no span de título de nif criado
        titulonif.classList.add('text-lg', 'leading-4', 'whitespace-nowrap', 'text-color-text');

        const nif = document.createElement('span');

        // Colocando uma classe no span de nif criado
        nif.classList.add('text-xs', 'text-color-text-secundary');

        const divisordois = document.createElement('div');

        // Colocando uma classe na divisória criada
        divisordois.classList.add('w-px', 'h-10', 'bg-color-text', 'opacity-10', 'divider');

        const exibeemail = document.createElement('div');

        // Colocando uma classe na div de exibição de nif criada
        exibeemail.classList.add('flex', 'items-center', 'gap-3', 'px-4', 'lg:px-6');

        const flexemail = document.createElement('div');

        // Colocando uma classe na div de exibição de nif criada
        flexemail.classList.add('flex', 'flex-col', 'gap-1', 'font-semibold');

        const tituloemail = document.createElement('span');

        // Colocando uma classe no span de título de nif criado
        tituloemail.classList.add('text-lg', 'leading-4', 'whitespace-nowrap', 'text-color-text');

        const email = document.createElement('span');

        // Colocando uma classe no span de nif criado
        email.classList.add('text-xs', 'text-color-text-secundary');

        // Adicionando conteúdo nos elementos
        nome.textContent = funcionario.Nome + ' ' + funcionario.Sobrenome;
        tituloemail.textContent = 'E-mail'
        email.textContent = funcionario.Email;
        titulonif.textContent = 'NIF'
        nif.textContent = funcionario.NIF;
        funcao.textContent = funcionario.TipoUser;
        // status.textContent = 'Status: ' + funcionario.Status;

        // Colocando os dados nas divs a ser renderizadas

        div.appendChild(row);
        row.appendChild(exibicao);
        exibicao.appendChild(img);
        exibicao.appendChild(nomefuncao);
        nomefuncao.appendChild(nome);
        nomefuncao.appendChild(funcao);
        exibicao.appendChild(divisor);
        exibicao.appendChild(exibenif);
        exibenif.appendChild(flexnif);
        flexnif.appendChild(titulonif);
        flexnif.appendChild(nif);
        exibicao.appendChild(divisordois);
        exibicao.appendChild(exibeemail);
        exibeemail.appendChild(flexemail);
        flexemail.appendChild(tituloemail);
        flexemail.appendChild(email);


        // div.appendChild(status);


        // Criando o botão de inativar
        if (funcionario.Status === 'ativo') {
            // Criando botões para editar e inativar funcionários

            const options = document.createElement('div');
            const btnOptions = document.createElement('button');
            const icon = document.createElement('img');
            const dropdown = document.createElement('div');
            const lista = document.createElement('ul');
            const itemEditar = document.createElement('li');
            const editar = document.createElement('a');
            const itemInativar = document.createElement('li');
            const inativar = document.createElement('a');

            // Atribuindo o NIF no valor do botão

            editar.value = funcionario.NIF
            inativar.value = funcionario.NIF

            // Atribuindo classes

            options.classList.add('bg-component', 'rounded-md', 'px-3', 'md:px-4', 'flex', 'items-center', 'justify-center');
            btnOptions.classList.add('w-6', 'h-6', 'p-1', 'bg-[#7950FF]/20', 'rounded-md', 'relative');
            btnOptions.type = 'button';
            icon.classList.add('option-dropdown-trigger', 'w-full');
            icon.src = '../../img/icon/more-vertical.svg';
            icon.alt = 'Opções';
            dropdown.classList.add('option-dropdown', 'hidden', 'absolute', 'z-10', '-bottom-[42px]', 'right-[125%]', 'h-auto', 'bg-body', 'rounded-md', 'border', 'border-body', 'shadow-sm');
            lista.classList.add('space-y-2', 'py-2', 'px-2');
            lista.role = 'listitem';
            itemEditar.classList.add('text-color-text', 'hover:bg-color-text-secundary/20', 'transition-colors', 'px-4', 'py-1', 'text-sm', 'cursor-pointer', 'rounded-md');
            itemEditar.role = 'option';
            editar.classList.add('px-1', 'py-1');
            editar.href = '#';
            editar.classList.add('editar');
            itemInativar.classList.add('text-color-text', 'hover:bg-color-text-secundary/20', 'transition-colors', 'px-4', 'py-1', 'text-sm', 'cursor-pointer', 'rounded-md');
            itemInativar.role = 'option';
            inativar.classList.add('px-1', 'py-1');
            inativar.href = '#';
            inativar.classList.add('inativar');

            // Atribuindo um texto

            editar.textContent = 'Editar';
            inativar.textContent = 'Inativar';

            // Adicionando na div

            options.appendChild(btnOptions);
            btnOptions.appendChild(icon);
            btnOptions.appendChild(dropdown);
            dropdown.appendChild(lista);
            lista.appendChild(itemEditar);
            itemEditar.appendChild(editar);
            lista.appendChild(itemInativar);
            itemInativar.appendChild(inativar);
            
            div.appendChild(options);
        }

        // Colocando a div na exibição HTML
        exibe.appendChild(div);

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
        const requisicao = await fetch(back + `/funcionarios/pesquisarFuncionario.php?valor=${valor}`);

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
        const requisicao = await fetch(back + `/funcionarios/pesquisaFiltro.php?valor=${valor}`);

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
                        PROCESSO DE EDITAR OU INATIVAR O USUÁRIO 
---------------------------------------------------------------------------------------
*/

// Capturando o clique dos botões de demissão
document.addEventListener('click', evento => {

    // Pegando o elemento clicado pelo usuário
    const elemento = evento.target;

    // verificando se é mesmo o botão de inativar
    if (elemento.classList.contains('inativar')) {
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

    let modalEdit = document.querySelector('.edit');

    modalEdit.classList.add('flex');
    modalEdit.classList.remove('hidden');

    dadosParaEditar(nif);

    // // Fazendo a lista de funcionários desaparecer
    // const exibicao = document.querySelector('#exibicao');

    // // Selecionando o formulário
    // const formularioEditarUsuario = document.querySelector('#formularioEditarUsuario');

    // // Alterando a visibilidade
    // // Renderizando de acordo o evento
    // if (formularioEditarUsuario.style.display === 'flex') {

    //     // Escondendo o formulário
    //     formularioEditarUsuario.style.display = 'none';

    //     // Exibindo a lista
    //     exibicao.style.display = 'block';

    // } else {
    //     // Exibindo o formulário
    //     formularioEditarUsuario.style.display = 'flex';

    //     // Escondendo a lista de funcionários
    //     exibicao.style.display = 'none';

    //     // Quando aparecer o formulário será feita uma requisição para retornar os dados
    //     dadosParaEditar(nif);
    // }
}

// Função para fazer a requisição para editar nome, email, cargo e resetar a senha
async function dadosParaEditar(nif) {
    try {

        // Requisição ao servidor
        const requisicao = await fetch(back + `/funcionarios/pesquisarFuncionario.php?valor=${nif}`);

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
    const editarCargo = document.querySelector('#editarCargo');

    for (let usuario of dados) {
        editarNome.value = usuario.Nome;
        editarSobrenome.value = usuario.Sobrenome;
        // Tirando o padrão do email do SENAI
        editarEmail.value = usuario.Email.replace('@sp.senai.br', '');
        editarCargo.value = usuario.TipoUser;
    }

}

// Enviar o formulário para editar
const formularioEditarUsuario = document.querySelector('#formularioEditarUsuario');
formularioEditarUsuario.addEventListener('submit', evento => {

    // Parando o evento do formulário
    // evento.preventDefault();

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

    console.log(resposta);

}

// Função para desativar o usuário
async function desativarUsuario(nif) {

    try {

        const requisicao = await fetch(back + `/funcionarios/demitirFuncionarios.php`, {
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

        const requisicao = await fetch(back + `/funcionarios/resetarSenha.php`, {
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