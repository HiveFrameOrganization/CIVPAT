import { back } from '../Rotas/rotas.js';
import alertas from '../../feedback.js';

const table = document.querySelector('#table');

const paginacao = document.querySelector('#paginacao');

window.addEventListener('load', async () => {
    // ao carregar a página, a função irá executar
    localStorage.setItem('filtroPadrao', '');
    const filtroAoCarregarPagina = localStorage.getItem('filtroPadrao');
    // alertas();
    await pegarTodasAsPropostas(filtroAoCarregarPagina);
    await pegarUnidadesCriadoras();
    botoesPaginacao();
})

async function pegarTodasAsPropostas (filtros) {


    if (sessionStorage.getItem('paginaProposta') == null) {
        sessionStorage.setItem('paginaProposta', 1)
    }
    const paginaProposta = sessionStorage.getItem('paginaProposta');


    let declaradoQtdBotoes
    if (sessionStorage.getItem('qtdBotoesProposta') == null) {
        declaradoQtdBotoes = -1;
    } else {
        declaradoQtdBotoes = sessionStorage.getItem('qtdBotoesProposta');
    }

    try{
        // link da requisição
        const resposta = await fetch(back + `/todasPropostas/todasPropostas.php?pag=${paginaProposta}
        &qtdBotes=${declaradoQtdBotoes}&filtros=${filtros}`);
        
        // dados de todas as propostar recebidas (resposta da api)
        const dados = await resposta.json();


        // caso a requisição de um erro, irá exibir uma mensagem de erro
        if (dados.status === 'success') {

            exibirPropostas(dados.propostas);
            sessionStorage.setItem('qtdBotoesProposta', dados.qtdBotoes);
            
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


// Criar os botões de paginação e adiciona a função que muda a página
function botoesPaginacao() {
    const qtdBotoes = sessionStorage.getItem('qtdBotoesProposta');
    const containerPaginacao = document.getElementById('inserirPaginacao');

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

    if (sessionStorage.getItem('paginaProposta') == 1) {
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
    if(sessionStorage.getItem('qtdBotoesProposta') == sessionStorage.getItem('paginaProposta')){
        setaProxPagina.classList.add('hidden')
    }
    if(sessionStorage.getItem('paginaProposta') == 1){
        document.querySelector('#antPagina').classList.add('hidden')
    }
    containerPaginacao.insertBefore(priBotao, setaProxPagina);
    // Final Primeiro Botão

    // adcionar funçoes no botao de ir e voltar
    setaProxPagina.addEventListener('click', ()=>{
        colocarPagina(parseInt(sessionStorage.getItem('paginaProposta')) + 1)
        setaProxPagina.href = ''
    })
    document.querySelector('#antPagina').addEventListener('click', ()=>{
        colocarPagina(parseInt(sessionStorage.getItem('paginaProposta')) - 1)
        document.querySelector('#antPagina').href = ''
    })

    const paginaAtual = sessionStorage.getItem('paginaProposta');
    if (paginaAtual > 3) {
        const divisor = document.createElement('span');
        divisor.textContent = '...'
        containerPaginacao.insertBefore(divisor, setaProxPagina);
    }

    // Seta a quantidade de botões, caso não exista, evitando requisições extras ao banco
    // necessário desetar no cadastro de usuário !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    for (let i = paginaAtual - 2; i <= parseInt(paginaAtual) + 2; i++) {
        if (i > 1 && i < qtdBotoes  ) {
            const a = document.createElement('a');
    
            if (sessionStorage.getItem('paginaProposta') == i) {
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

    if (sessionStorage.getItem('paginaProposta') == qtdBotoes) {
        // pagina selecionado
        ultBotao.classList = 'in-page bg-body text-color-text text-sm px-3 py-1 rounded-md'
    } else {
        // outros botoes
        ultBotao.classList = 'bg-body text-color-text text-sm px-3 py-1 rounded-md'
    }

    ultBotao.href = ''
    ultBotao.textContent = qtdBotoes
    ultBotao.id = `pesquisa${qtdBotoes}`
    ultBotao.onclick = () => {
        colocarPagina(qtdBotoes)
    }

    containerPaginacao.insertBefore(ultBotao, setaProxPagina);
    // Final Ultimo Botão

    
}

// Seta o número da página no sessionStorage
function colocarPagina(num) {
    sessionStorage.setItem('paginaProposta', num);
}

const inputPesquisa = document.getElementById('hidden-input');

inputPesquisa.addEventListener('keyup', () => {
    const filtroAoCarreparPagina = localStorage.getItem('filtroPadrao');
    pegarTodasAsPropostasFiltradas(filtroAoCarreparPagina);
})

async function pegarTodasAsPropostasFiltradas (filt) {
    // sessionStorage.removeItem('paginaProposta');
    // sessionStorage.getItem('qtdBotoesProposta');
    const filtro = '%' + document.getElementById('hidden-input').value + '%';

    if (sessionStorage.getItem('paginaProposta') == null) {
        sessionStorage.setItem('paginaProposta', 1)
    }
    const paginaProposta = sessionStorage.getItem('paginaProposta');


    let declaradoQtdBotoes
    if (sessionStorage.getItem('qtdBotoesProposta') == null) {
        declaradoQtdBotoes = -1;
    } else {
        declaradoQtdBotoes = sessionStorage.getItem('qtdBotoesProposta');
    }

    try{
        // link da requisição
        const resposta = await fetch(back + `/todasPropostas/todasPropostasFiltradas.php?pag=${paginaProposta}
        &qtdBotes=${declaradoQtdBotoes}&filtro=${filtro}&filtroPagina=${filt}`);
        
        // dados de todas as propostar recebidas (resposta da api)
        const dados = await resposta.json();

        // caso a requisição de um erro, irá exibir uma mensagem de erro
        if (dados.status === 'success') {

            exibirPropostasFiltradas(dados.propostas);
            sessionStorage.setItem('qtdBotoesProposta', dados.qtdBotoes);
            
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

function exibirPropostasFiltradas(propostas){


    paginacao.classList.add('hidden');

    if (propostas) {

        table.innerHTML = '';

        paginacao.classList.remove('hidden');
        
        for (let proposta of propostas) {

            let divRow = document.createElement('div');
    
            divRow.classList = 'row-item flex flex-nowrap bg-component rounded-md border-2 border-[transparent] hover:border-primary transition-colors cursor-pointer';
            
            const fotoDePerfil = proposta['FotoDePerfil'];
    
            let status = proposta['Status'].toLowerCase();
    
            let statusIMG;
            let color;
            let optionIMG;
            let statusDescricao;
    
            if (status == 'em análise') {
                
                statusDescricao = 'análise';
                statusIMG = '../../img/icon/inventory.svg';
                optionIMG = '../../img/icon/more-vertical.svg';
                color = 'primary';
            } else if (status == 'cancelado') {
                
                statusDescricao = 'cancelado';
                statusIMG = '../../img/icon/alert-circle-red.svg';
                optionIMG = '../../img/icon/more-vertical-red.svg';
                color = 'color-red';
            } else if (status == 'aceito') {
                
                statusDescricao = 'desenvolvendo';
                statusIMG = '../../img/icon/settings-green.svg';
                optionIMG = '../../img/icon/more-vertical-green.svg';
                color = 'color-green'
            }
    
            // Inserindo o Template na linha
            divRow.innerHTML = `
            <div class="area-left flex-1 flex flex-nowrap items-center justify-between rounded-l-md py-4 px-3 md:px-4 overflow-x-auto">
                <div class="flex items-center gap-8 lg:w-full">
                    <div class="flex items-center gap-3 border-r border-color-text-secundary pr-8">
                        <img src="${statusIMG}" alt="Em análise" class="w-10 h-10 p-2 bg-${color}/20 rounded-md">
                        <div class="w-[200px] max-w-[200px] overflow-hidden text-ellipsis">
                            <span title="${proposta['TituloProposta']}" class="font-semibold text-lg leading-4 whitespace-nowrap capitalize">${proposta['TituloProposta']}</span>
                            <div class="text-color-text-secundary font-semibold text-xs flex flex-wrap justify-between gap-1">
                                <span title="Número do SGSET">${proposta['nSGSET'] ? proposta['nSGSET'] : 'N/A'}</span>
                                <span title="Data de início e fim">${proposta['Inicio'] && proposta['Fim'] ? proposta['Inicio']+' - '+proposta['Fim'] : 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <img src="${fotoDePerfil ? '' : '../../img/icon/no-image.jpg'}" alt="Responsável" class="w-8 h-8 border border-primary rounded-full">
                        <div class="flex flex-col gap-1 font-semibold">
                            <span class="text-lg leading-4 whitespace-nowrap capitalize">${proposta['Nome']}</span>
                            <span class="text-xs text-color-text-secundary capitalize">Gerente</span>
                        </div>
                    </div>
                    <span class="bg-${color}/20 rounded-md text-${color} font-semibold text-xs py-2 px-6 ml-9 lg:ml-auto uppercase whitespace-nowrap">${statusDescricao}</span>
                </div>
            </div>
            <div class="area-right bg-component rounded-md px-3 md:px-4 flex items-center justify-center">
                <button type="button" class="option-dropdown-trigger btn-trigger w-6 h-6 p-1 bg-${color}/20 rounded-md relative">
                    <img src="${optionIMG}" alt="Opções" class="option-dropdown-trigger w-full">
                    <div class="option-dropdown hidden absolute min-w-[150px] min-h-[75px] z-10 bottom-0 right-[125%] h-auto bg-component border border-body rounded-md shadow-md">
                        <div itemid="${proposta['idProposta']}" class="view-btn space-y-2 p-2 rounded-md text-sm hover:bg-primary/20 transition-colors">
                            <div class="flex items-center gap-2">
                            <img src="../../img/icon/eye.svg" alt="Visualizar" class="w-5 h-5" />
                                <a>
                                    Visualizar
                                </a>
                            </div>
                        </div>
                    </div>
                </button>
            </div>`;
            
            divRow.querySelector('.area-left').addEventListener('click', function() {

                // Recuperando o botão o itemid, ao clicar na linha
                verDetalhesDaProposta(divRow.querySelector('.view-btn'));
            })

            table.appendChild(divRow);
        }
    
        reloadLinhas();

        return;
    }
};


function exibirPropostas(propostas){


    paginacao.classList.add('hidden');

    if (propostas) {

        table.innerHTML = '';

        paginacao.classList.remove('hidden');
        
        for (let proposta of propostas) {

            let divRow = document.createElement('div');
    
            divRow.classList = 'row-item flex flex-nowrap bg-component rounded-md border-2 border-[transparent] hover:border-primary transition-colors cursor-pointer';
            
            const fotoDePerfil = proposta['FotoDePerfil'];
    
            let status = proposta['Status'].toLowerCase();
    
            let statusIMG;
            let color;
            let optionIMG;
            let statusDescricao;
    
            if (status == 'em análise') {
                
                statusDescricao = 'análise';
                statusIMG = '../../img/icon/inventory.svg';
                optionIMG = '../../img/icon/more-vertical.svg';
                color = 'primary';
            } else if (status == 'cancelado') {
                
                statusDescricao = 'cancelado';
                statusIMG = '../../img/icon/alert-circle-red.svg';
                optionIMG = '../../img/icon/more-vertical-red.svg';
                color = 'color-red';
            } else if (status == 'aceito') {
                
                statusDescricao = 'desenvolvendo';
                statusIMG = '../../img/icon/settings-green.svg';
                optionIMG = '../../img/icon/more-vertical-green.svg';
                color = 'color-green'
            }
    
            // Inserindo o Template na linha
            divRow.innerHTML = `
            <div class="area-left flex-1 flex flex-nowrap items-center justify-between rounded-l-md py-4 px-3 md:px-4 overflow-x-auto">
                <div class="flex items-center gap-8 lg:w-full">
                    <div class="flex items-center gap-3 border-r border-color-text-secundary pr-8">
                        <img src="${statusIMG}" alt="Em análise" class="w-10 h-10 p-2 bg-${color}/20 rounded-md">
                        <div class="w-[200px] max-w-[200px] overflow-hidden text-ellipsis">
                            <span title="${proposta['TituloProposta']}" class="font-semibold text-lg leading-4 whitespace-nowrap capitalize">${proposta['TituloProposta']}</span>
                            <div class="text-color-text-secundary font-semibold text-xs flex flex-wrap justify-between gap-1">
                                <span title="Número do SGSET">${proposta['nSGSET'] ? proposta['nSGSET'] : 'N/A'}</span>
                                <span title="Data de início e fim">${proposta['Inicio'] && proposta['Fim'] ? proposta['Inicio']+' - '+proposta['Fim'] : 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <img src="${fotoDePerfil ? '' : '../../img/icon/no-image.jpg'}" alt="Responsável" class="w-8 h-8 border border-primary rounded-full">
                        <div class="flex flex-col gap-1 font-semibold">
                            <span class="text-lg leading-4 whitespace-nowrap capitalize">${proposta['Nome']}</span>
                            <span class="text-xs text-color-text-secundary capitalize">Gerente</span>
                        </div>
                    </div>
                    <span class="bg-${color}/20 rounded-md text-${color} font-semibold text-xs py-2 px-6 ml-9 lg:ml-auto uppercase whitespace-nowrap">${statusDescricao}</span>
                </div>
            </div>
            <div class="area-right bg-component rounded-md px-3 md:px-4 flex items-center justify-center">
                <button type="button" class="option-dropdown-trigger btn-trigger w-6 h-6 bg-${color}/20 rounded-md relative">
                    <img src="${optionIMG}" alt="Opções" class="option-dropdown-trigger w-full p-1">
                    <div class="option-dropdown hidden absolute min-w-[150px] min-h-[75px] z-10 bottom-0 right-[125%] h-auto bg-component border border-body rounded-md shadow-md">
                        <div itemid="${proposta['idProposta']}" class="view-btn space-y-2 p-2 rounded-md text-sm hover:bg-primary/20 transition-colors">
                            <div class="flex items-center gap-2">
                            <img src="../../img/icon/eye.svg" alt="Visualizar" class="w-5 h-5" />
                                <a>
                                    Visualizar
                                </a>
                            </div>
                        </div>
                    </div>
                </button>
            </div>`;
            
            divRow.querySelector('.area-left').addEventListener('click', function() {

                // Recuperando o botão o itemid, ao clicar na linha
                verDetalhesDaProposta(divRow.querySelector('.view-btn'));
            })

            table.appendChild(divRow);
        }
    
        reloadLinhas();

        return;
    }
};

function verDetalhesDaProposta(element) {

    localStorage.setItem('idProposta', element.getAttribute('itemid'));
            
    window.location.href = '../detalhesProposta/detalhesProposta.html';
}

// Alocar uma função de visualizar proposta em todos os botões das propostas na tabela
function getTodosBotoes() {

    document.querySelectorAll('.view-btn').forEach((btn) => {

        btn.addEventListener('click', () => {

            verDetalhesDaProposta(btn);
        });
    });
}

// Função para fechar todos menus das linhas
function esconderTudo() {

    if (document.querySelector('.option-dropdown')) {
        
        document.querySelectorAll('.option-dropdown').forEach((el) => {
            
            if (!el.classList.contains('hidden')) {

                let row = el.parentElement.parentElement.parentElement;

                el.classList.add('hidden');
                row.classList.remove('selected-row');
            }   
        });
    }
}

// Reaplicar as funções referentes a linhas da tabela
function reloadLinhas() {

    const btnAcionadores = document.querySelectorAll('.btn-trigger');

    btnAcionadores.forEach((btn) => {

        // Abrir o menu específico do botão clicado, na linha
        btn.addEventListener('click', () => {
            
            esconderTudo();

            let linhaMenu = btn.querySelector('.option-dropdown'),
                linha = btn.parentElement.parentElement;
            
            linhaMenu.classList.toggle('hidden');
            linha.classList.toggle('selected-row');
        });
    });

    getTodosBotoes();
}

// Fechar todos os menus de opções das linhas, ao clicar fora do botão
window.addEventListener('click', (event) => {

    if (!event.target.matches('.option-dropdown-trigger')) {

        esconderTudo();
    }
});



async function pegarUnidadesCriadoras() {
    const unidadesSelect = document.getElementById('unidadeCriadora');

    const requisicao = await fetch (back + '/todasPropostas/pegarUnidadesCriadoras.php');

    // dados de todas as propostar recebidas (resposta da api)
    const dados = await requisicao.json();
    
    // caso a requisição de um erro, irá exibir uma mensagem de erro
    if (dados.resposta === 'erro') throw new Error(dados.message);

    for (let i = 0; i < dados.length; i++) {
        let option = document.createElement('option');
        option.classList.add('bg-body');
        option.value = dados[i].idUnidadeCriadora;
        option.textContent = dados[i].UnidadeCriadora;
        unidadesSelect.appendChild(option);
    }

}


document.getElementById('todasPropostas').addEventListener('click', () => {
    // document.getElementById('pesquisa1').classList = 'in-page bg-body text-color-text text-sm px-3 py-1 rounded-md';
    colocarPagina(1);
    sessionStorage.removeItem('paginaProposta');
    localStorage.setItem('filtroPadrao', '');
    pegarTodasAsPropostas(localStorage.getItem('filtroPadrao'));
    botoesPaginacao();
});

document.getElementById('propostasEmAnalise').addEventListener('click', () => {
    
    // document.getElementById('pesquisa1').classList = 'in-page bg-body text-color-text text-sm px-3 py-1 rounded-md';
    colocarPagina(1);
    sessionStorage.removeItem('paginaProposta');
    localStorage.setItem('filtroPadrao', 'Em Análise');
    pegarTodasAsPropostas(localStorage.getItem('filtroPadrao'));
    botoesPaginacao();
});

document.getElementById('propostasEmDesenvolvimento').addEventListener('click', () => {
    // document.getElementById('pesquisa1').classList = 'in-page bg-body text-color-text text-sm px-3 py-1 rounded-md';
    colocarPagina(1);
    sessionStorage.removeItem('paginaProposta');
    localStorage.setItem('filtroPadrao', 'Aceito');
    pegarTodasAsPropostas(localStorage.getItem('filtroPadrao'));
    botoesPaginacao();
});

document.getElementById('propostasDeclinadas').addEventListener('click', () => {
    // document.getElementById('pesquisa1').classList = 'in-page bg-body text-color-text text-sm px-3 py-1 rounded-md';
    colocarPagina(1);
    sessionStorage.removeItem('paginaProposta');
    localStorage.setItem('filtroPadrao', 'Declinado');
    pegarTodasAsPropostas(localStorage.getItem('filtroPadrao'));
    botoesPaginacao();
});
