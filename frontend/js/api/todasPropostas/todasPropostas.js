import { esconderTudo, selecionarAba } from './renderizarProposta.js';
import pegarUnidadesCriadoras from './pegarUnidadesCriadoras.js';
import botoesPaginacao, { mudarAba } from './paginacao.js';
import pegarTodasAsPropostas from './pegarPropostas.js';
import alertas from '../../feedback.js';

// const table = document.querySelector('#table');
// const paginacao = document.querySelector('#paginacao');
const inputPesquisa = document.getElementById('hidden-input');
//Perguntar pro Michael sobre esta variavel

window.addEventListener('load', async () => {
    // ao carregar a página, a função irá executar
    const filtroAoCarregarPagina = localStorage.getItem('filtroPadrao');
    alertas();
    sessionStorage.setItem('pesquisado', 'não')
    await pegarTodasAsPropostas(filtroAoCarregarPagina, 'não');
    await pegarUnidadesCriadoras();
    botoesPaginacao(localStorage.getItem('filtroPadrao'));

    selecionarAba(filtroAoCarregarPagina)
})

// Fechar todos os menus de opções das linhas, ao clicar fora do botão
window.addEventListener('click', (event) => {

    if (!event.target.matches('.option-dropdown-trigger')) {

        esconderTudo();
    }
});

inputPesquisa.addEventListener('keyup', async () => {
    const filtroAoCarreparPagina = localStorage.getItem('filtroPadrao');
    await pegarTodasAsPropostas(filtroAoCarreparPagina);
    botoesPaginacao(localStorage.getItem('filtroPadrao'))
    sessionStorage.setItem('pesquisado', 'sim')
})

document.getElementById('todasPropostas').addEventListener('click', () => {
    // document.getElementById('pesquisa1').classList = 'in-page bg-body text-color-text text-sm px-3 py-1 rounded-md';
    mudarAba('')
});

document.getElementById('propostasEm Análise').addEventListener('click', () => {
    // document.getElementById('pesquisa1').classList = 'in-page bg-body text-color-text text-sm px-3 py-1 rounded-md';
    mudarAba('Em Análise')
});

document.getElementById('propostasAceito').addEventListener('click', () => {
    // document.getElementById('pesquisa1').classList = 'in-page bg-body text-color-text text-sm px-3 py-1 rounded-md';
    mudarAba('Aceito')
});

document.getElementById('propostasDeclinado').addEventListener('click', () => {
    // document.getElementById('pesquisa1').classList = 'in-page bg-body text-color-text text-sm px-3 py-1 rounded-md';
    mudarAba('Declinado')
});

document.getElementById('propostasConcluidas').addEventListener('click', () => {
    // document.getElementById('pesquisa1').classList = 'in-page bg-body text-color-text text-sm px-3 py-1 rounded-md';
    mudarAba('Concluido')
});
