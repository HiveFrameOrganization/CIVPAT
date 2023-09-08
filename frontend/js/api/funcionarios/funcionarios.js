import alertas from '../../feedback.js';
import { back } from '../Rotas/rotas.js'

/*
----------------------------------------------------------------------------------
                        RENDERIZANDO A LISTA DE USUÁRIO
----------------------------------------------------------------------------------
*/
window.addEventListener('load', async () => {

    // Função para renderizar a lista de usuários
    await retornaFuncionarios();
    // Chama a função que cria os botões da página
    botoesPaginacao();

});

// Funão para retornar uma lisat de funcionários
async function retornaFuncionarios() {
    // Caso a quantidade paginas não tenha sido definida, ela é definida para 1
    if (sessionStorage.getItem('paginaFun') == null) {
        sessionStorage.setItem('paginaFun', 0)
    }
    const paginaFun = sessionStorage.getItem('paginaFun');

    // Variável criar para otimização, evitar requisições desnecessárias
    // recalculando a quantidade de botões
    let declaradoqtdBotoesFun
    if (sessionStorage.getItem('qtdBotoesFun') == null) {
        declaradoqtdBotoesFun = -1;
    } else {
        declaradoqtdBotoesFun = sessionStorage.getItem('qtdBotoesFun');
    }
    // Lembrando que essa variável é destruida no cadastro do usuário
    // pois altera a quantidade de funcionarios e possivelmente
    // a quantidade de botões

    try {
        // Fazendo a requisição para buscar os dados
        const resposta = await fetch(back + `/funcionarios/exibirFuncionarios.php?pag=${paginaFun}
        &qtdBotes=${declaradoqtdBotoesFun}`);

        const dados = await resposta.json();

        // Caso retorne algum erro previsto no back-end
        if (dados.status === 'erro') throw new Error(dados.mensagem);


        // Função específica para exibir o funcionário
        exibir(dados.usuarios);
        // Seta a quantidade de botões
        // necessário desetar no cadastro de usuário
        sessionStorage.setItem('qtdBotoesFun', dados.qtdBotoes);

    } catch (erro) {
        console.error(erro)
    }
}

// Criar os botões de paginação e adiciona a função que muda a página
function botoesPaginacao() {
    // Puxa a quantidade de botões do sessionStorage
    const qtdBotoesFun = sessionStorage.getItem('qtdBotoesFun');
    // Puxa o elemento que irá receber os botoes
    const containerPaginacao = document.getElementById('paginacao');

    // Cria os botoes
    for (let i = 0; i < qtdBotoesFun; i++) {
        const a = document.createElement('a');

        // Define a cor dos botoes de acordo do número da página
        if (sessionStorage.getItem('paginaFun') == i) {
            a.classList = 'in-page bg-body text-color-text text-sm px-3 py-1 rounded-md'
        } else {
            a.classList = 'bg-body text-color-text text-sm px-3 py-1 rounded-md'
        }

        a.href = ''
        a.textContent = i + 1
        a.onclick = () => {
            colocarPagina(i)
        }

        // Adiciona o botão antes da seta de proxima página
        let setaProxPagina = containerPaginacao.querySelector("a.w-4.h-4:last-child");
        containerPaginacao.insertBefore(a, setaProxPagina);
    }
}

// Seta o número da página no sessionStorage
function colocarPagina(num) {
    sessionStorage.setItem('paginaFun', num);
}

function exibir(dados) {
    //Selecionando a div que vai ter os funcionário
    const exibe = document.querySelector('#exibicao');

    // Removendo um possível elemento na div de exibição
    exibe.innerHTML = '';

    for (let funcionario of dados) {

        // Criando os elementos
        const div = document.createElement('div');

        div.classList = 'row-item flex flex-nowrap bg-component rounded-md border-2 border-[transparent] hover:border-primary transition-colors cursor-pointer';

        let fotoDePerfil = funcionario['FotoDePerfil'];

        let cargo;

        if (funcionario['TipoUser'] == 'tec') {

            cargo = 'Técnico';
        } else if (funcionario['TipoUser'] == 'adm') {

            cargo = 'Administrador';
        } else if (funcionario['TipoUser'] == 'ger') {
            
            cargo = 'Gerente';
        } else {

            cargo = 'N/A'
        }

        div.innerHTML = `
        <div class="area-left flex-1 flex flex-nowrap items-center justify-between rounded-l-md py-4 px-3 md:px-4 overflow-x-auto">
            <div class="flex items-center gap-8 lg:w-full">
                <div class="flex items-center gap-3 border-r border-color-text-secundary pr-8">
                    <img src="${fotoDePerfil ? '' : '../../img/icon/no-image.jpg'}" alt="Responsável" class="w-8 h-8 border border-primary rounded-full">
                    <div class="w-[150px] max-w-[150px] overflow-hidden text-ellipsis">
                        <span title="${funcionario['Nome']+' '+funcionario['Sobrenome']}" class="font-semibold text-lg leading-4 whitespace-nowrap capitalize">${funcionario['Nome']+' '+funcionario['Sobrenome']}</span>
                        <div class="text-color-text-secundary font-semibold text-xs flex flex-wrap justify-between gap-1">
                            <span class="text-xs text-color-text-secundary capitalize">${cargo}</span>
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-3 border-r border-color-text-secundary pr-8">
                    <div class="flex flex-col gap-1 font-semibold">
                        <span class="text-lg leading-4 whitespace-nowrap">NIF</span>
                        <span class="text-xs text-color-text-secundary capitalize">${funcionario['NIF'] ? funcionario['NIF'] : 'N/A'}</span>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <div class="flex flex-col gap-1 font-semibold">
                        <span class="text-lg leading-4 whitespace-nowrap">Email</span>
                        <span class="text-xs text-color-text-secundary capitalize">${funcionario['Email'] ? funcionario['Email'] : 'N/A'}</span>
                    </div>
                </div>
                <span class="bg-primary/20 rounded-md text-primary font-semibold text-xs py-2 px-6 ml-9 lg:ml-auto uppercase whitespace-nowrap">${funcionario['Status']}</span>
            </div>
        </div>
        <div class="area-right bg-component rounded-md px-3 md:px-4 flex items-center justify-center">
            <button type="button" class="w-6 h-6 p-1 bg-primary/20 rounded-md relative">
                <img src="../../img/icon/more-vertical.svg" alt="Opções" class="option-dropdown-trigger w-full">
                <div class="option-dropdown hidden absolute min-w-[150px] min-h-[75px] z-10 bottom-0 right-[125%] h-auto bg-component border border-body rounded-md shadow-md">
                    <div itemid="${funcionario['NIF']}" class="editar space-y-2 p-2 rounded-md text-sm hover:bg-primary/20 transition-colors">
                        <div class="flex items-center gap-2">
                        <img src="../../img/icon/eye.svg" alt="Visualizar" class="w-5 h-5" />
                            <a>
                                Editar
                            </a>
                        </div>
                    </div>
                    <div itemid="${funcionario['NIF']}" class="inativar space-y-2 p-2 rounded-md text-sm hover:bg-primary/20 transition-colors">
                        <div class="flex items-center gap-2">
                        <img src="../../img/icon/user-minus.svg" alt="Inativar" class="w-5 h-5" />
                            <a>
                                Inativar
                            </a>
                        </div>
                    </div>
                </div>
            </button>
        </div>`;

        exibe.appendChild(div);
    }

    reloadRowsButtons();
};


// Reaplicar as funções referentes a linhas da tabela
function reloadRows() {

    const optionDropdownTriggers = document.querySelectorAll('.option-dropdown-trigger');

    // Abrir o dropdown específico do botão clicado
    optionDropdownTriggers.forEach((trigger) => {

        trigger.addEventListener('click', () => {
            
            const optionDropdown = trigger.parentElement.querySelector('.option-dropdown');

            const row = optionDropdown.parentElement.parentElement.parentElement;

            optionDropdown.classList.toggle('hidden');
            row.classList.toggle('selected-row');
            
        });
    });

    getAllViewButtons();
}

// Função para fechar todos os dropdown
function hiddenAll() {

    if (document.querySelector('.option-dropdown')) {
        
        document.querySelectorAll('.option-dropdown').forEach((el) => {

            const row = el.parentElement.parentElement.parentElement;
    
            el.classList.add('hidden');
            row.classList.remove('selected-row');
        });
    }
}

// Fechar todos ao clicar fora do botão
window.addEventListener('click', (event) => {

    if (!event.target.matches('.option-dropdown-trigger')) {

        hiddenAll();
    }
});


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

// Recuperar os botões das linhas da tabela
function reloadRowsButtons() {

    const inativarButtons = document.querySelectorAll('.inativar');
    const editarrButtons = document.querySelectorAll('.editar');

    addEventToRowButtons(inativarButtons, editarrButtons);
}

// Aplicando os eventos aos botões das linhas da tabela
function addEventToRowButtons(inativarButtons, editarrButtons) {

    inativarButtons.forEach((btn) => {

        btn.addEventListener('click', function() {

            desativarUsuario(this.getAttribute('itemid'));
            console.log(`${this.getAttribute('itemid')} desativado!`);
        });
    });

    editarrButtons.forEach((btn) => {

        btn.addEventListener('click', function() {

            localStorage.setItem('nif', this.getAttribute('itemid'));

            FormularioEditarUsuario(this.getAttribute('itemid'));
        });
    });
}

// Capturando o clique dos botões de demissão
// document.addEventListener('click', evento => {

//     // Pegando o elemento clicado pelo usuário
//     const elemento = evento.target;

//     // verificando se é mesmo o botão de inativar
//     if (elemento.classList.contains('inativar')) {
//         // Selecionando o NIF que vai ser usado para desativar o usuário
//         const nif = elemento.value;

//         desativarUsuario(nif);

//     } else if (elemento.classList.contains('editar')) {

//         // Selecionando o NIF que vai ser usado para desativar o usuário
//         const nif = elemento.value;

//         // Salvando o valor do nif para ser usado mais tarde
//         localStorage.setItem('nif', nif);

//         // Aparecer com o formulário de editar
//         FormularioEditarUsuario(nif);

//     }

// });

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
    evento.preventDefault();

    // Pegando os valores do formulário
    const nome = document.querySelector('#editarNome').value;
    const sobrenome = document.querySelector('#editarSobrenome').value;
    const email = document.querySelector('#editarEmail').value;
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
            requisicaoEditar(dadosEditados);
    
            location.reload();
        }


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