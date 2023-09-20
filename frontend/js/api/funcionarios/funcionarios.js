import { esconderTudo } from './renderizarTelaFuncionarios.js';
import botoesPaginacao, { mudarAba } from './paginacao.js';
import retornaFuncionarios from './pegarFuncionarios.js';
import editarFuncionarios from './editarFuncionarios.js';
import alertas from '../../feedback.js';

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
    botoesPaginacao('');
});

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

    retornaFuncionarios(filtroAtual);
    botoesPaginacao();
});

// Para melhorar a experiência do usuário, quando apertar o enter no input também será realizada a pesquisa

pesquisarUsuario.addEventListener('keyup', () => {
    const filtroAtual = localStorage.getItem('filtroPadraoFuncionario');

    retornaFuncionarios(filtroAtual);
    botoesPaginacao();
});

/*
--------------------------------------------------------------------------------------- 
                        PROCESSO DE FILTRAR USUÁRIO 
---------------------------------------------------------------------------------------
*/

/*------------------------------- Filtro: TODOS -----------------------------------*/
const botaoTodos = document.querySelector('#botaoTodos');
botaoTodos.addEventListener('click', () => {
    mudarAba('');
});


/*------------------------------- Filtro: ATIVO -----------------------------------*/
const botaoAtivos = document.querySelector('#botaoAtivos');
botaoAtivos.addEventListener('click', () => {
    mudarAba('Ativo');
});


/*------------------------------- Filtro: DESATIVO -----------------------------------*/
const botaoDesativos = document.querySelector('#botaoDesativos');
botaoDesativos.addEventListener('click', () => {
    mudarAba('Inativo');
});

// Enviar o formulário para editar
const formularioEditarUsuario = document.querySelector('#formularioEditarUsuario');
formularioEditarUsuario.addEventListener('submit', async () => { editarFuncionarios() });

/*------------------------------------------- FUNÇÕES PARA VALIDAR ALGUMAS COISAS --------------------------------------------------------------*/

function contemApenasNumeros(string) {
    return /^\d+$/.test(string);
}
