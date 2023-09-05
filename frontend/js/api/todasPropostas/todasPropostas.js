import { back } from '../Rotas/rotas.js'

const table = document.querySelector('#table');

const paginacao = document.querySelector('#paginacao');

window.addEventListener('load', async () => {
    // ao carregar a página, a função irá executar
    await pegarTodasAsPropostas();
    await pegarUnidadesCriadoras();
    botoesPaginacao();
})

async function pegarTodasAsPropostas () {
    if (localStorage.getItem('paginaProposta') == null) {
        localStorage.setItem('paginaProposta', 1)
    }
    const paginaProposta = localStorage.getItem('paginaProposta');
    console.log(paginaProposta)

    let declaradoQtdBotoes
    if (localStorage.getItem('qtdBotoesProposta') == null) {
        declaradoQtdBotoes = -1;
    } else {
        declaradoQtdBotoes = localStorage.getItem('qtdBotoesProposta');
    }

    try{
        // link da requisição
        const resposta = await fetch(back + `/todasPropostas/todasPropostas.php?pag=${paginaProposta}
        &qtdBotes=${declaradoQtdBotoes}`);
        
        // dados de todas as propostar recebidas (resposta da api)
        const dados = await resposta.json();

        console.log(dados);

        // caso a requisição de um erro, irá exibir uma mensagem de erro
        if (dados.resposta === 'erro') throw new Error(dados.message);
        
        exibirPropostas(dados.propostas);
        localStorage.setItem('qtdBotoesProposta', dados.qtdBotoes);

        // Adicionando a quaqntidade de propostas de acordo com os seus status
        document.getElementById('analise').textContent = dados['Em Análise'] ? `# ${dados['Em Análise']}` : '# N/A';
        document.getElementById('aceitos').textContent = dados['Aceito'] ? `# ${dados['Aceito']}` : '# N/A';
        document.getElementById('declinados').textContent = dados['Declinado'] ? `# ${dados['Declinado']}` : '# N/A';
        document.getElementById('concluidos').textContent = dados['Declinado'] ? `# ${dados['Concluido']}` : '# N/A';

    } catch (error){
        console.error(error)
    }

}


// Criar os botões de paginação e adiciona a função que muda a página
function botoesPaginacao() {
    const qtdBotoes = localStorage.getItem('qtdBotoesProposta');
    const containerPaginacao = document.getElementById('inserirPaginacao');

    // Seta a quantidade de botões, caso não exista, evitando requisições extras ao banco
    // necessário desetar no cadastro de usuário !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1

    for (let i = 1; i <= qtdBotoes; i++) {
        const a = document.createElement('a');

        if (localStorage.getItem('paginaProposta') == i) {
            a.classList = 'in-page bg-body text-color-text text-sm px-3 py-1 rounded-md'
        } else {
            a.classList = 'bg-body text-color-text text-sm px-3 py-1 rounded-md'
        }

        a.href = ''
        a.textContent = i
        a.onclick = () => {
            colocarPagina(i)
        }

        let setaProxPagina = containerPaginacao.querySelector("a.w-4.h-4:last-child");
        containerPaginacao.insertBefore(a, setaProxPagina);
    }
}

// Seta o número da página no localStorage
function colocarPagina(num) {
    localStorage.setItem('paginaProposta', num);
}


function exibirPropostas(propostas){

    paginacao.classList.add('hidden');

    if (propostas) {

        paginacao.classList.remove('hidden');
        
        for (let proposta of propostas) {

            let divRow = document.createElement('div');
    
            divRow.classList = 'row-item flex flex-nowrap bg-component rounded-md border-2 border-[transparent] hover:border-primary transition-colors';
    
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
            } else if (status == 'desenvolvendo') {
                
                statusDescricao = 'desenvolvendo';
                statusIMG = '../../img/icon/settings-green.svg';
                optionIMG = '../../img/icon/more-vertical-green.svg';
                color = 'color-green'
            }
    
            // Inserindo o Template na linha
            divRow.innerHTML = `
            <div class="flex-1 flex flex-nowrap items-center justify-between rounded-l-md py-4 px-3 md:px-4 overflow-x-auto">
                <div class="flex items-center gap-8 lg:w-full">
                    <div class="flex items-center gap-3 border-r border-color-text-secundary pr-8">
                        <img src="${statusIMG}" alt="Em análise" class="w-10 h-10 p-2 bg-${color}/20 rounded-md">
                        <div class="w-[150px] max-w-[150px] overflow-hidden text-ellipsis">
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
                    <span class="bg-${color}/20 rounded-md text-${color} font-semibold text-xs py-2 px-6 ml-9 lg:ml-auto uppercase whitespace-nowrap">${proposta['Status']}</span>
                </div>
            </div>
            <div class="bg-component rounded-md px-3 md:px-4 flex items-center justify-center">
                <button type="button" class="w-6 h-6 p-1 bg-${color}/20 rounded-md relative">
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
    
            table.appendChild(divRow);
        }
    
        reloadRows();
    }
};

// Alocar uma função de visualizar proposta em todos os botões das propostas na tabela
function getAllViewButtons() {

    document.querySelectorAll('.view-btn').forEach((btn) => {

        btn.addEventListener('click', () => {

            localStorage.setItem('idProposta', btn.getAttribute('itemid'));
            
            window.location.href = '../detalhesProposta/detalhesProposta.html';
        });
    });
}

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



async function pegarUnidadesCriadoras() {
    const unidadesSelect = document.getElementById('unidadeCriadora');

    const requisicao = await fetch (back + '/todasPropostas/pegarUnidadesCriadoras.php');

    // dados de todas as propostar recebidas (resposta da api)
    const dados = await requisicao.json();
    
    // caso a requisição de um erro, irá exibir uma mensagem de erro
    if (dados.resposta === 'erro') throw new Error(dados.message);

    for (let i = 0; i < dados.length; i++) {
        let option = document.createElement('option');
        option.value = dados[i].idUnidadeCriadora;
        option.textContent = dados[i].UnidadeCriadora;
        unidadesSelect.appendChild(option);
    }

    console.log(dados);

}
