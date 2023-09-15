import exibirPropostas from './renderizarProposta.js';
import esconderTudo from './renderizarProposta.js';
import pegarUnidadesCriadoras from './pegarUnidadesCriadoras.js';
import pegarTodasAsPropostas from './pegarPropostas.js';
import botoesPaginacao from './paginacao.js';
import { back } from '../Rotas/rotas.js';

const table = document.querySelector('#table');

const paginacao = document.querySelector('#paginacao');

window.addEventListener('load', async () => {
    // ao carregar a página, a função irá executar
    const filtroAoCarregarPagina = localStorage.getItem('filtroPadrao');
    // alertas();
    await pegarTodasAsPropostas(filtroAoCarregarPagina);
    await pegarUnidadesCriadoras();
    botoesPaginacao(localStorage.getItem('filtroPadrao'));
    
    document.getElementById(`propostas${filtroAoCarregarPagina}`).classList.add('text-primary')
    document.getElementById(`propostas${filtroAoCarregarPagina}`).classList.add('border-b-2')
    document.getElementById(`propostas${filtroAoCarregarPagina}`).classList.add('border-primary')

    document.getElementById(`todasPropostas`).classList.remove('text-primary')
    document.getElementById(`todasPropostas`).classList.remove('border-b-2')
    document.getElementById(`todasPropostas`).classList.remove('border-primary')
})

const inputPesquisa = document.getElementById('hidden-input');

inputPesquisa.addEventListener('keyup', () => {
    const filtroAoCarreparPagina = localStorage.getItem('filtroPadrao');
    pegarTodasAsPropostasFiltradas(filtroAoCarreparPagina);
})

// -------------------------------------------- Corrigir --------------------------------------------------
async function pegarTodasAsPropostasFiltradas (filt) {
    // sessionStorage.removeItem('paginaProposta');
    // sessionStorage.getItem('qtdBotoesProposta');
    const filtro = '%' + document.getElementById('hidden-input').value + '%';

    if (sessionStorage.getItem('paginaProposta') == null) {
        sessionStorage.setItem('paginaProposta', 1)
    }
    const paginaProposta = sessionStorage.getItem('paginaProposta');


    let declaradoQtdBotoes
    if (sessionStorage.getItem(`qtdBotoesProposta${filtro}`) == null) {
        declaradoQtdBotoes = -1;
    } else {
        declaradoQtdBotoes = sessionStorage.getItem(`qtdBotoesProposta${filtro}`);
    }

    try{
        // link da requisição
        const resposta = await fetch(back + `/todasPropostas/todasPropostasFiltradas.php?pag=${paginaProposta}
        &qtdBotes=${declaradoQtdBotoes}&filtro=${filtro}&filtroPagina=${filt}`);
        
        // dados de todas as propostar recebidas (resposta da api)
        const dados = await resposta.json();

        // caso a requisição de um erro, irá exibir uma mensagem de erro
        if (dados.status === 'success') {

            exibirPropostas(dados.propostas);
            sessionStorage.setItem(`qtdBotoesProposta${filtro}`, dados.qtdBotoes);
            
            // Adicionando a quaqntidade de propostas de acordo com os seus status
            document.getElementById('analise').textContent = dados['Em Análise'] ? `# ${dados['Em Análise']}` : '# N/A';
            document.getElementById('aceitos').textContent = dados['Aceito'] ? `# ${dados['Aceito']}` : '# N/A';
            document.getElementById('declinados').textContent = dados['Declinado'] ? `# ${dados['Declinado']}` : '# N/A';
            document.getElementById('concluidos').textContent = dados['Declinado'] ? `# ${dados['Concluido']}` : '# N/A';
        }

    } catch (error){
        console.error(error)
    }
}
// -------------------------------------------- Corrigir --------------------------------------------------


// Fechar todos os menus de opções das linhas, ao clicar fora do botão
window.addEventListener('click', (event) => {

    if (!event.target.matches('.option-dropdown-trigger')) {

        esconderTudo();
    }
});

document.getElementById('todasPropostas').addEventListener('click', () => {
    // document.getElementById('pesquisa1').classList = 'in-page bg-body text-color-text text-sm px-3 py-1 rounded-md';
    colocarPagina(1);
    sessionStorage.removeItem('paginaProposta');
    localStorage.setItem('filtroPadrao', '');
    pegarTodasAsPropostas(localStorage.getItem('filtroPadrao'));
    botoesPaginacao(localStorage.getItem('filtroPadrao'));
});

document.getElementById('propostasEm Análise').addEventListener('click', () => {
    
    // document.getElementById('pesquisa1').classList = 'in-page bg-body text-color-text text-sm px-3 py-1 rounded-md';
    colocarPagina(1);
    sessionStorage.removeItem('paginaProposta');
    localStorage.setItem('filtroPadrao', 'Em Análise');
    pegarTodasAsPropostas(localStorage.getItem('filtroPadrao'));
    botoesPaginacao(localStorage.getItem('filtroPadrao'));
});

document.getElementById('propostasAceito').addEventListener('click', () => {
    // document.getElementById('pesquisa1').classList = 'in-page bg-body text-color-text text-sm px-3 py-1 rounded-md';
    colocarPagina(1);
    sessionStorage.removeItem('paginaProposta');
    localStorage.setItem('filtroPadrao', 'Aceito');
    pegarTodasAsPropostas(localStorage.getItem('filtroPadrao'));
    botoesPaginacao(localStorage.getItem('filtroPadrao'));
});

document.getElementById('propostasDeclinado').addEventListener('click', () => {
    // document.getElementById('pesquisa1').classList = 'in-page bg-body text-color-text text-sm px-3 py-1 rounded-md';
    colocarPagina(1);
    sessionStorage.removeItem('paginaProposta');
    localStorage.setItem('filtroPadrao', 'Declinado');
    pegarTodasAsPropostas(localStorage.getItem('filtroPadrao'));
    botoesPaginacao(localStorage.getItem('filtroPadrao'));
});
