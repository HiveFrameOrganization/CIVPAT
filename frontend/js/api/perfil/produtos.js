import { back } from '../Rotas/rotas.js'

/*

    ------------------------------------------------------------------------------------------
                            CÓDIGO PARA TROCAR A VISUALIZAÇÃO DE CONTEÚDO
    ------------------------------------------------------------------------------------------

*/

// Selecionando a tag span para atribuir o nif do usuário a ele
const spanProdutos = document.querySelector('#spanProdutos');

// selecionando o span de informações para exibí-lo de volta
const spanInformacoes = document.querySelector('#spanInformacoes');

const userProd = document.querySelector('#user-prod');

const userInfo = document.querySelector('#user-info');

const paginacao = document.querySelector('#paginacao');

const table = document.querySelector('#table');

spanProdutos.addEventListener('click', () => {

    // Trocando o display para exibir coisas diferentes

    userInfo.classList.add('hidden');
    userProd.classList.remove('hidden');

    // Fazendo a requisição para a buscar os produtos
    buscarProdutos();
});


spanInformacoes.addEventListener('click', () => {

    // Trocando o display para exibir coisas diferentes

    userInfo.classList.remove('hidden');
    userProd.classList.add('hidden');
    paginacao.classList.add('hidden');
});

/*

    ------------------------------------------------------------------------------------------
                                CÓDIGO PARA BUSCAR E EXIBIR PRODUTOS
    ------------------------------------------------------------------------------------------

*/

// Função para bsucar todos os produtos relacionados ao técnico
async function buscarProdutos() {

    if (spanProdutos.getAttribute('data-value') && !userProd.classList.contains('hidden')) {
        try {

            // Pegando o nif do usuário e passando como parâmetro para realizar a query la no back
            const nif = spanProdutos.getAttribute('data-value');

            const requisicao = await fetch(back + `/perfil/produtos.php?nif=${nif}`);

            const resposta = await requisicao.json();

            console.log(resposta);
            
            if (resposta.status != 'error') {
                
                exibirProdutos(resposta.produtos);
            }

            table.innerHTML = '<p class="text-center">Nenhum produto foi encontrado!</p>';

        } catch (erro) {
            console.error(erro);
        }

    }

}
 
function exibirProdutos(produtos) {

    if (produtos) {

        // Limpando a tabela
        table.innerHTML = '';

        paginacao.classList.remove('hidden');

        for (let produto of produtos) {

            let divRow = document.createElement('div');
    
            divRow.classList = 'row-item flex flex-nowrap bg-component rounded-md border-2 border-[transparent] hover:border-primary transition-colors';

            divRow.innerHTML = `
            <div class="flex-1 flex flex-nowrap items-center justify-between rounded-l-md py-4 px-3 md:px-4 overflow-x-auto">
                <div class="flex items-center gap-8 lg:w-full">
                    <div class="flex items-center gap-3 border-r border-color-text-secundary pr-8">
                        <img src="../../img/icon/inventory.svg" alt="Em análise" class="w-10 h-10 p-2 bg-primary/20 rounded-md">
                        <div class="w-[150px] max-w-[150px] overflow-hidden text-ellipsis">
                            <span title="${produto['NomeProduto'] ? produto['NomeProduto'] : 'N/A'}" class="font-semibold text-lg leading-4 whitespace-nowrap capitalize">${produto['NomeProduto'] ? produto['NomeProduto'] : 'N/A'}</span>
                            <div class="text-color-text-secundary font-semibold text-xs flex flex-wrap justify-between gap-1">
                                <span class="capitalize" title="${produto['ServicoCategoria'] ? produto['ServicoCategoria'] : 'N/A'}">${produto['ServicoCategoria'] ? produto['ServicoCategoria'] : 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-3 border-r border-color-text-secundary pr-8">
                        <div class="flex flex-col gap-1 font-semibold w-[100px]">
                            <span class="text-lg leading-4 overflow-hidden text-ellipsis whitespace-nowrap capitalize">Máquina</span>
                            <span title="${produto['Maquina'] ? produto['Maquina'] : 'N/A'}" class="text-xs text-color-text-secundary capitalize overflow-hidden text-ellipsis whitespace-nowrap">${produto['Maquina'] ? produto['Maquina'] : 'N/A'}</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-3 border-r border-color-text-secundary pr-8">
                        <div class="flex flex-col gap-1 font-semibold w-[100px]">
                            <span class="text-lg leading-4 overflow-hidden text-ellipsis whitespace-nowrap capitalize">Área</span>
                            <span title="${produto['Area'] ? produto['Area'] : 'N/A'}" class="text-xs text-color-text-secundary capitalize overflow-hidden text-ellipsis whitespace-nowrap">${produto['Area'] ? produto['Area'] : 'N/A'}</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-3 border-r border-color-text-secundary pr-8">
                        <div class="flex flex-col gap-1 font-semibold w-[100px]">
                            <span class="text-lg leading-4 overflow-hidden text-ellipsis whitespace-nowrap">Data final</span>
                            <span title="${produto['DataFinal'] ? produto['DataFinal'] : 'N/A'}" class="text-xs text-color-text-secundary capitalize overflow-hidden text-ellipsis whitespace-nowrap">${produto['DataFinal'] ? produto['DataFinal'] : 'N/A'}</span>
                        </div>
                    </div>
                    <span class="bg-primary/20 rounded-md text-primary font-semibold text-xs py-2 px-6 ml-9 lg:ml-auto uppercase">N/A</span>
                </div>
            </div>
            <div class="bg-component rounded-md px-3 md:px-4 flex items-center justify-center">
                <button type="button" class="w-6 h-6 p-1 bg-primary/20 rounded-md relative">
                    <img src="../../img/icon/more-vertical.svg" alt="Opções" class="option-dropdown-trigger w-full">
                    <div class="option-dropdown hidden absolute min-w-[150px] min-h-[75px] z-10 bottom-0 right-[125%] h-auto bg-component border border-body rounded-md shadow-md">
                        <div itemid="${produto['idProduto']}" class="view-btn space-y-2 p-2 rounded-md text-sm hover:bg-primary/20 transition-colors">
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

        return;
    }

}   

// Alocar uma função de visualizar proposta em todos os botões das propostas na tabela
function getAllViewButtons() {

    document.querySelectorAll('.view-btn').forEach((btn) => {

        btn.addEventListener('click', () => {

            localStorage.setItem('idProduto', btn.getAttribute('itemid'));
            
            window.location.href = '../detalhesProduto/detalhesProduto.html';
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
