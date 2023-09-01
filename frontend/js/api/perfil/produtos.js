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

});

/*

    ------------------------------------------------------------------------------------------
                                CÓDIGO PARA BUSCAR E EXIBIR PRODUTOS
    ------------------------------------------------------------------------------------------

*/

// Função para bsucar todos os produtos relacionados ao técnico
async function buscarProdutos() {

    try {

        // Pegando o nif do usuário e passando como parâmetro para realizar a query la no back
        const nif = spanProdutos.getAttribute('data-value');

        const requisicao = await fetch(back + `/perfil/produtos.php?nif=${nif}`);

        const resposta = await requisicao.json();

        if (resposta.status != 'error') {

            exibirProdutos(resposta);
        }

        exibirProdutos();

    } catch (erro) {
        console.error(erro);
    }

}
 
function exibirProdutos(produtos) {

    const table = document.querySelector('#table');

    if (!produtos) {

        // for (let produto of produtos) {

            let divRow = document.createElement('div');
    
            divRow.classList = 'row-item flex flex-nowrap bg-component rounded-md border-2 border-[transparent] hover:border-primary transition-colors';

            divRow.innerHTML = `
            <div class="flex-1 flex flex-nowrap items-center justify-between rounded-l-md py-4 px-3 md:px-4 overflow-x-auto">
                <div class="flex items-center gap-8 lg:w-full">
                    <div class="flex items-center gap-3 border-r border-color-text-secundary pr-8">
                        <img src="../../img/icon/inventory.svg" alt="Em análise" class="w-10 h-10 p-2 bg-primary/20 rounded-md">
                        <div class="w-[150px] max-w-[150px] overflow-hidden text-ellipsis">
                            <span title="N/A" class="font-semibold text-lg leading-4 whitespace-nowrap capitalize">N/A</span>
                            <div class="text-color-text-secundary font-semibold text-xs flex flex-wrap justify-between gap-1">
                                <span title="Número do SGSET">N/A</span>
                                <span title="Data de início e fim">N/A</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <div class="flex flex-col gap-1 font-semibold">
                            <span class="text-lg leading-4 whitespace-nowrap capitalize">N/A</span>
                            <span class="text-xs text-color-text-secundary capitalize">Gerente</span>
                        </div>
                    </div>
                    <span class="bg-primary/20 rounded-md text-primary font-semibold text-xs py-2 px-6 ml-9 lg:ml-auto uppercase">N/A</span>
                </div>
            </div>
            <div class="bg-component rounded-md px-3 md:px-4 flex items-center justify-center">
                <button type="button" class="w-6 h-6 p-1 bg-primary/20 rounded-md relative">
                    <img src="../../img/icon/more-vertical.svg" alt="Opções" class="option-dropdown-trigger w-full">
                    <div class="option-dropdown hidden absolute min-w-[150px] min-h-[75px] z-10 bottom-0 right-[125%] h-auto bg-component border border-body rounded-md shadow-md">
                        <div itemid="N/A" class="view-btn space-y-2 p-2 rounded-md text-sm hover:bg-primary/20 transition-colors">
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
        // }
    }
}   
