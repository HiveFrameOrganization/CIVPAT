// Arquivo responsável por Gerar os cards 
// e fazer alterações visuais na tela de proposota


function exibirPropostas(propostas){

    paginacao.classList.add('hidden');

    if (propostas) {

        table.innerHTML = '';

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
                statusIMG = '../../img/icon/inventory-orange.svg';
                optionIMG = '../../img/icon/more-vertical-orange.svg';
                color = 'color-orange';
            } else if (status == 'declinado') {
                
                statusDescricao = 'declinado';
                statusIMG = '../../img/icon/alert-circle-red.svg';
                optionIMG = '../../img/icon/more-vertical-red.svg';
                color = 'color-red';
            } else if (status == 'aceito') {
                
                statusDescricao = 'aceito';
                statusIMG = '../../img/icon/settings-green.svg';
                optionIMG = '../../img/icon/more-vertical-green.svg';
                color = 'color-green'
            } else if (status == 'concluido') {

                statusDescricao = 'concluido';
                statusIMG = '../../img/icon/check-circle.svg';
                optionIMG = '../../img/icon/more-vertical.svg';
                color = 'primary'
            }
    
            // Inserindo o Template na linha
            divRow.innerHTML = `
            <div class="area-left cursor-pointer flex-1 flex flex-nowrap items-center justify-between rounded-l-md py-4 px-3 md:px-4 overflow-x-auto">
                <div class="flex items-center gap-8 lg:w-full">
                    <div class="flex items-center gap-3 border-r border-color-text-secundary pr-8">
                        <img src="${statusIMG}" alt="${status}" class="w-10 h-10 p-2 bg-${color}/20 rounded-md">
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
                <button type="button" class="option-dropdown-trigger btn-trigger w-6 h-max bg-${color}/20 rounded-md relative">
                    <img src="${optionIMG}" alt="Opções" class="option-dropdown-trigger w-full p-1">
                    <div class="option-dropdown hidden absolute min-w-[150px] z-10 bottom-0 right-[125%] h-auto bg-component border border-body rounded-md shadow-md">
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

function verDetalhesDaProposta(element) {

    localStorage.setItem('idProposta', element.getAttribute('itemid'));
            
    window.location.href = '../detalhesProposta/detalhesProposta.html';
}

function selecionarAba(filtroAoCarregarPagina) {
    document.getElementById(`propostas${filtroAoCarregarPagina}`).classList.add('text-primary')
    document.getElementById(`propostas${filtroAoCarregarPagina}`).classList.add('border-b-2')
    document.getElementById(`propostas${filtroAoCarregarPagina}`).classList.add('border-primary')

    document.getElementById(`todasPropostas`).classList.remove('text-primary')
    document.getElementById(`todasPropostas`).classList.remove('border-b-2')
    document.getElementById(`todasPropostas`).classList.remove('border-primary')
}

export default exibirPropostas
export { esconderTudo, selecionarAba }