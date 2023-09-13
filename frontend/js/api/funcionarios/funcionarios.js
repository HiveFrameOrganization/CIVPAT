import alertas from '../../feedback.js';
import { back } from '../Rotas/rotas.js'

/*
----------------------------------------------------------------------------------
                        RENDERIZANDO A LISTA DE USUÁRIO
----------------------------------------------------------------------------------
*/
window.addEventListener('load', async () => {

    localStorage.setItem('filtroPadraoFuncionario', '');
    const filtroAoCarregarPagina = localStorage.getItem('filtroPadraoFuncionario');

    alertas();

    // Função para renderizar a lista de usuários
    await retornaFuncionarios(filtroAoCarregarPagina);
    // Chama a função que cria os botões da página
    botoesPaginacao();

});

// Funão para retornar uma lisat de funcionários
async function retornaFuncionarios(filtro) {
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
        &qtdBotes=${declaradoqtdBotoesFun}&filtros=${filtro}`);

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

    containerPaginacao.innerHTML = `
    <a id="antPagina" href="#" class="w-4 h-4">
        <img src="../../img/icon/arrow-left.svg" alt="Voltar página" class="w-full">
    </a>
    <a id="proxPagina" href="#" class="w-4 h-4">
        <img src="../../img/icon/arrow-right.svg" alt="Avançar página" class="w-full">
    </a>
    
    `

     // Criando o primeiro botão
     const priBotao = document.createElement('a');

     if (sessionStorage.getItem('paginaFun') == 1) {
         // pagina selecionado
         priBotao.classList = 'in-page bg-body text-color-text text-sm px-3 py-1 rounded-md'
     } else {
         // outros botoes
         priBotao.classList = 'bg-body text-color-text text-sm px-3 py-1 rounded-md'
     }
 
     priBotao.href = ''
     priBotao.textContent = 1
     priBotao.id = `pesquisa${1}`
     priBotao.onclick = () => {
         colocarPagina(1)
     }
 
     const setaProxPagina = containerPaginacao.querySelector("a.w-4.h-4:last-child");
     // impedir que botoes apareçam em determinados casos
     if(sessionStorage.getItem('qtdBotoesProposta') == sessionStorage.getItem('paginaFun')){
         setaProxPagina.classList.add('hidden')
     }
     if(sessionStorage.getItem('paginaFun') == 1){
         document.querySelector('#antPagina').classList.add('hidden')
     }
     containerPaginacao.insertBefore(priBotao, setaProxPagina);
     // Final Primeiro Botão
 
     // adcionar funçoes no botao de ir e voltar
     setaProxPagina.addEventListener('click', ()=>{
         colocarPagina(parseInt(sessionStorage.getItem('paginaFun')) + 1)
         setaProxPagina.href = ''
     })
     document.querySelector('#antPagina').addEventListener('click', ()=>{
         colocarPagina(parseInt(sessionStorage.getItem('paginaFun')) - 1)
         document.querySelector('#antPagina').href = ''
     })
 
     const paginaAtual = sessionStorage.getItem('paginaFun');
     if (paginaAtual > 4) {
         const divisor = document.createElement('span');
         divisor.textContent = '...'
         containerPaginacao.insertBefore(divisor, setaProxPagina);
     }
 
     // Seta a quantidade de botões, caso não exista, evitando requisições extras ao banco
     // necessário desetar no cadastro de usuário !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
     for (let i = paginaAtual - 2; i <= parseInt(paginaAtual) + 2; i++) {
         if (i > 1 && i < qtdBotoesFun  ) {
             const a = document.createElement('a');
     
             if (sessionStorage.getItem('paginaFun') == i) {
                 // pagina selecionado
                 a.classList = 'in-page bg-body text-color-text text-sm px-3 py-1 rounded-md'
             } else {
                 // outros botoes
                 a.classList = 'bg-body text-color-text text-sm px-3 py-1 rounded-md'
             }
     
             a.href = ''
             a.textContent = i
             a.id = `pesquisa${i}`
             a.onclick = () => {
                 colocarPagina(i)
             }
     
             containerPaginacao.insertBefore(a, setaProxPagina);
         }
     }
 
     if (paginaAtual < 4) {
         const divisor2 = document.createElement('span');
         divisor2.textContent = '...'
         containerPaginacao.insertBefore(divisor2, setaProxPagina);
     }
     // Criando o ultimo botão
     const ultBotao = document.createElement('a');
 
     if (sessionStorage.getItem('paginaProposta') == qtdBotoesFun) {
         // pagina selecionado
         ultBotao.classList = 'in-page bg-body text-color-text text-sm px-3 py-1 rounded-md'
     } else {
         // outros botoes
         ultBotao.classList = 'bg-body text-color-text text-sm px-3 py-1 rounded-md'
     }
 
     ultBotao.href = ''
     ultBotao.textContent = qtdBotoesFun
     ultBotao.id = `pesquisa${qtdBotoesFun}`
     ultBotao.onclick = () => {
         colocarPagina(qtdBotoesFun)
     }
 
     containerPaginacao.insertBefore(ultBotao, setaProxPagina);
     // Final Ultimo Botão
 
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
        let cor;
        let imgOpcao;
        let mostrarBotao

        if (funcionario['Status'].toLowerCase() == 'ativo') {

            mostrarBotao = true
            cor = 'primary';
            imgOpcao = '../../img/icon/more-vertical.svg';
        } else {
            
            mostrarBotao = false
            cor = 'color-red';
            imgOpcao = '../../img/icon/more-vertical-red.svg';
        }

        if (funcionario['TipoUser'] == 'tec') {

            cargo = 'Técnico';
        } else if (funcionario['TipoUser'] == 'adm') {

            cargo = 'Administrador';
        } else if (funcionario['TipoUser'] == 'ger') {
            
            cargo = 'Gerente';
        } else {

            cargo = 'Coordenador'
        }

        div.innerHTML = `
        <div class="area-left text-color-text flex-1 flex flex-nowrap items-center justify-between rounded-l-md py-4 px-3 md:px-4 overflow-x-auto">
            <div class="flex items-center gap-8 lg:w-full">
                <div class="flex items-center gap-3 border-r border-color-text-secundary pr-8">
                    <img src="${fotoDePerfil ? '' : '../../img/icon/no-image.jpg'}" alt="Responsável" class="w-8 h-8 border border-${cor} rounded-full">
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
                        <span class="text-xs text-color-text-secundary">${funcionario['NIF'] ? funcionario['NIF'] : 'N/A'}</span>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <div class="flex flex-col gap-1 font-semibold">
                        <span class="text-lg leading-4 whitespace-nowrap">Email</span>
                        <span class="text-xs text-color-text-secundary">${funcionario['Email'] ? funcionario['Email'] : 'N/A'}</span>
                    </div>
                </div>
                <span class="bg-${cor}/20 rounded-md text-${cor} font-semibold text-xs py-2 px-6 ml-9 lg:ml-auto uppercase whitespace-nowrap">${funcionario['Status']}</span>
            </div>
        </div>
        <div class="area-right text-color-text bg-component rounded-md px-3 md:px-4 flex items-center justify-center">
            <button type="button" class="w-6 h-max bg-${cor}/20 rounded-md relative">
                <img src="${imgOpcao}" alt="Opções" class="option-dropdown-trigger w-full p-1">
                <div class="option-dropdown hidden absolute min-w-[150px] z-10 bottom-0 right-[125%] h- first-letter: bg-component border border-body rounded-md shadow-md">
                    <div itemid="${funcionario['NIF']}" class="editar space-y-2 p-2 rounded-md text-sm hover:bg-primary/20 transition-colors">
                        <div class="flex items-center gap-2">
                        <img src="../../img/icon/eye.svg" alt="Visualizar" class="w-5 h-5" />
                            <a>
                                Editar
                            </a>
                        </div>
                    </div>
                    ${mostrarBotao && `
                    <div itemid="${funcionario['NIF']}" class="inativar space-y-2 p-2 rounded-md text-sm hover:bg-primary/20 transition-colors">
                        <div class="flex items-center gap-2">
                        <img src="../../img/icon/user-minus.svg" alt="Inativar" class="w-5 h-5" />
                            <a>
                                Inativar
                            </a>
                        </div>
                    </div>
                    `}
                </div>
            </button>
        </div>`;

        exibe.appendChild(div);
    }

    reloadBotoesLinhas();
    recarregarLinhas();
};


// Reaplicar as funções referentes a linhas da tabela
function recarregarLinhas() {

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

}


// Fechar todos ao clicar fora do botão
window.addEventListener('click', (event) => {

    if (!event.target.matches('.option-dropdown-trigger')) {

        esconderTudo();
    } 
});


// Função para fechar todos os dropdown
function esconderTudo() {

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

        esconderTudo();
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

    if (pesquisarUsuario.value === '') return;

    const filtroAtual = localStorage.getItem('filtroPadraoFuncionario');

    pesquisarFuncionario(pesquisarUsuario.value, filtroAtual);
    botoesPaginacao();
});

// Para melhorar a experiência do usuário, quando apertar o enter no input também será realizada a pesquisa

pesquisarUsuario.addEventListener('keyup', () => {
    const filtroAtual = localStorage.getItem('filtroPadraoFuncionario');

    pesquisarFuncionario(pesquisarUsuario.value, filtroAtual);
    botoesPaginacao();

});

// Função específica para realizar a pesquisa do funcionário
async function pesquisarFuncionario(valor, filtro) {
    const numPagina = sessionStorage.getItem('paginaFun');

    sessionStorage.setItem('paginaFun', 0);

    try {

        // Requisição ao servidor
        const requisicao = await fetch(back + `/funcionarios/pesquisarFuncionario.php?valor=${valor}&pag=${numPagina}&filtros=${filtro}`);

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
    titulo.classList = 'w-full text-center'
    titulo.textContent = 'NENHUM FUNCIONÁRIO ENCONTRADO...';
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

    localStorage.setItem('filtroPadraoFuncionario', '');


    // Função para renderizar a lista de usuários
    retornaFuncionarios(localStorage.getItem('filtroPadraoFuncionario'));

});


/*------------------------------- Filtro: ATIVO -----------------------------------*/
const botaoAtivos = document.querySelector('#botaoAtivos');
botaoAtivos.addEventListener('click', () => {

    localStorage.setItem('filtroPadraoFuncionario', 'Ativo');


    // Função para renderizar a lista de usuários
    retornaFuncionarios(localStorage.getItem('filtroPadraoFuncionario'));
    // Função para renderizar a lista de usuários
    usuariosFiltrados(botaoAtivos.value);

});


/*------------------------------- Filtro: DESATIVO -----------------------------------*/
const botaoDesativos = document.querySelector('#botaoDesativos');
botaoDesativos.addEventListener('click', () => {

    localStorage.setItem('filtroPadraoFuncionario', 'Inativo');

    // Função para renderizar a lista de usuários
    usuariosFiltrados(localStorage.getItem('filtroPadraoFuncionario'));

});

async function usuariosFiltrados(valor) {
    try {

        const numPagina = sessionStorage.getItem('paginaFun');
        // Requisição ao servidor
        const requisicao = await fetch(back + `/funcionarios/pesquisaFiltro.php?valor=${valor}&pag=${numPagina}`);

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
function reloadBotoesLinhas() {

    const inativarButtons = document.querySelectorAll('.inativar');
    const editarrButtons = document.querySelectorAll('.editar');

    addEventoLinhasBotoes(inativarButtons, editarrButtons);
}

// Aplicando os eventos aos botões das linhas da tabela
function addEventoLinhasBotoes(inativarButtons, editarrButtons) {

    inativarButtons.forEach((btn) => {

        btn.addEventListener('click', function() {

            desativarUsuario(this.getAttribute('itemid'));
        });
    });

    editarrButtons.forEach((btn) => {

        btn.addEventListener('click', function() {

            localStorage.setItem('nif', this.getAttribute('itemid'));

            FormularioEditarUsuario(this.getAttribute('itemid'));
        });
    });
}

// Abertura e Fechamento da Modal
let modalEdit = document.querySelector('#modal');
let modalEditFade = document.querySelector('#modal-fade');
let fecharModal = document.querySelector('#close-modal');

const toggleModal = () => {

    [modalEdit, modalEditFade].forEach((el) => el.classList.toggle('hide'));

};

[fecharModal, modalEditFade].forEach((el) => el.addEventListener('click', toggleModal));


// Função para mostrar a tela de edição do usuário
async function FormularioEditarUsuario(nif) {
    // Quando aparecer o formulário será feita uma requisição para retornar os dados
    dadosParaEditar(nif);

    toggleModal();
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

        console.log(resposta)

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
        editarEmail.value = usuario.Email
        editarCargo.value = usuario.TipoUser;
    }

}

// Enviar o formulário para editar
const formularioEditarUsuario = document.querySelector('#formularioEditarUsuario');
formularioEditarUsuario.addEventListener('click', async () => {

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

            localStorage.setItem('status', resp.status);
            localStorage.setItem('mensagem', resp.mensagem);
    
            location.reload();

        }


    } catch (erro) {
        console.error(erro);
    }

});

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

    return resposta;

}

// Função para desativar o usuário
async function desativarUsuario(nif) {

    let confirmarInativar = confirm('Tem certeza?');

    if (confirmarInativar) {

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

            localStorage.setItem('status', resposta.status);
            localStorage.setItem('mensagem', resposta.mensagem);

            alertas();

            // Atualizando a lista em tempo real
            retornaFuncionarios(localStorage.getItem('filtroPadraoFuncionario'));

        } catch (erro) {
            console.error(erro);
        }

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