import { back } from '../Rotas/rotas.js'
import { autenticacao } from '../login/autenticacao.js';
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

if (spanProdutos) {

    spanProdutos.addEventListener('click', async () => {
    
        sessionStorage.setItem('aba', 'produto');
    
        location.reload();
    
    });
}

spanInformacoes.addEventListener('click', () => {

    // Trocando o display para exibir coisas diferentes

    userInfo.classList.remove('hidden');
    userProd.classList.add('hidden');
    paginacao.classList.add('hidden');

    sessionStorage.removeItem('aba');
});

/*

    ------------------------------------------------------------------------------------------
                                CÓDIGO PARA BUSCAR E EXIBIR PRODUTOS
    ------------------------------------------------------------------------------------------

*/

// Função para buscar todos os produtos relacionados ao técnico
async function buscarProdutos() {
    const autenticado = await autenticacao(['tec'], false)
    if(!autenticado){
        return;
    }

    if (localStorage.getItem('nifPerfil') && !userProd.classList.contains('hidden')) {

        document.getElementById('table').innerHTML = `
        <div class='flex flex-col justify-center items-center gap-4'>
            <div class="loading-spinner inline-block w-[50px] h-[50px] border-4 border-[#e6e6e64d] rounded-full border-t-[#3976d1] animate-spin"></div>
            <h2 class='font-bold text-color-text text-center'>CARREGANDO...</h2>
        </div>
        `;

        try {

            // Caso a quantidade paginas não tenha sido definida, ela é definida para 1
            if (sessionStorage.getItem('paginaProduto') == null) {
                sessionStorage.setItem('paginaProduto', 0)
            }

            const paginaProduto = sessionStorage.getItem('paginaProduto');

            // Variável criar para otimização, evitar requisições desnecessárias
            // recalculando a quantidade de botões
            let declaradoqtdBotoesProduto
            if (sessionStorage.getItem('qtdBotoesProduto') == null) {
                declaradoqtdBotoesProduto = -1;
            } else {
                declaradoqtdBotoesProduto = sessionStorage.getItem('qtdBotoesProduto');
            }
            // Lembrando que essa variável é destruida no cadastro do usuário
            // pois altera a quantidade de funcionarios e possivelmente
            // a quantidade de botões

            // Pegando o nif do usuário e passando como parâmetro para realizar a query la no back
            const nif = localStorage.getItem('nifPerfil');

            const requisicao = await fetch(back + `/perfil/produtos.php?nif=${nif}&pagina=${paginaProduto}&qtdBotoes=${declaradoqtdBotoesProduto}`);

            if (!requisicao.ok) {

                return false;
            }

            const resposta = await requisicao.json();

            if (resposta.status == 'success') {

                if (resposta.produtos && resposta.produtos.length > 0) {

                    console.log(resposta.produtos)
                    exibirProdutos(resposta.produtos);
                    sessionStorage.setItem('qtdBotoesProduto', resposta.qtdBotoes);
                } else {
                    
                    document.getElementById('table').innerHTML = `
                    <div class='flex flex-col justify-center items-center gap-4'>
                        <svg width="67" height="68" viewBox="0 0 67 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M33.5004 67.4168C32.6115 67.4168 31.7643 67.2502 30.9587 66.9168C30.1532 66.5835 29.4171 66.1113 28.7504 65.5002L2.00041 38.7502C1.3893 38.0835 0.917074 37.3474 0.58374 36.5418C0.250407 35.7363 0.0837402 34.8891 0.0837402 34.0002C0.0837402 33.1113 0.250407 32.2502 0.58374 31.4168C0.917074 30.5835 1.3893 29.8613 2.00041 29.2502L28.7504 2.50016C29.4171 1.8335 30.1532 1.34739 30.9587 1.04183C31.7643 0.736274 32.6115 0.583496 33.5004 0.583496C34.3893 0.583496 35.2504 0.736274 36.0837 1.04183C36.9171 1.34739 37.6393 1.8335 38.2504 2.50016L65.0004 29.2502C65.6671 29.8613 66.1532 30.5835 66.4587 31.4168C66.7643 32.2502 66.9171 33.1113 66.9171 34.0002C66.9171 34.8891 66.7643 35.7363 66.4587 36.5418C66.1532 37.3474 65.6671 38.0835 65.0004 38.7502L38.2504 65.5002C37.6393 66.1113 36.9171 66.5835 36.0837 66.9168C35.2504 67.2502 34.3893 67.4168 33.5004 67.4168ZM33.5004 60.7502L60.2504 34.0002L33.5004 7.25016L6.75041 34.0002L33.5004 60.7502ZM30.1671 37.3335H36.8337V17.3335H30.1671V37.3335ZM33.5004 47.3335C34.4449 47.3335 35.2365 47.0141 35.8754 46.3752C36.5143 45.7363 36.8337 44.9446 36.8337 44.0002C36.8337 43.0557 36.5143 42.2641 35.8754 41.6252C35.2365 40.9863 34.4449 40.6668 33.5004 40.6668C32.556 40.6668 31.7643 40.9863 31.1254 41.6252C30.4865 42.2641 30.1671 43.0557 30.1671 44.0002C30.1671 44.9446 30.4865 45.7363 31.1254 46.3752C31.7643 47.0141 32.556 47.3335 33.5004 47.3335Z" fill="#f54a4c"/>
                        </svg>
                        <h2 class='font-bold text-color-text text-center'>NENHUM PRODUTO ENCONTRADO</h2>
                    </div>
                    `;
                }
            } else {
                
                return false;
            }
        } catch (erro) {

            console.error(erro);
            return false;
        }

    }

}

// Criar os botões de paginação e adiciona a função que muda a página
function botoesPaginacao() {

    // Puxa a quantidade de botões do sessionStorage
    const qtdBotoesProduto = sessionStorage.getItem('qtdBotoesProduto');
    // Puxa o elemento que irá receber os botoes
    const containerPaginacao = document.getElementById('containerPaginacao');

    // Cria os botoes
    for (let i = 0; i < qtdBotoesProduto; i++) {
        const a = document.createElement('a');

        // Define a cor dos botoes de acordo do número da página
        if (sessionStorage.getItem('paginaProduto') == i) {
            a.classList = 'in-page bg-body text-color-text text-sm px-3 py-1 rounded-md'
        } else {
            a.classList = 'bg-body text-color-text text-sm px-3 py-1 rounded-md'
        }

        a.href = ''
        a.textContent = i + 1
        a.onclick = () => {
            colocarPagina(i)
        }

        console.log(a);
        
        // Adiciona o botão antes da seta de proxima página
        let setaProxPagina = containerPaginacao.querySelector("a.w-4.h-4:last-child");
        containerPaginacao.insertBefore(a, setaProxPagina);
    }
}

// Seta o número da página no sessionStorage
function colocarPagina(num) {
    sessionStorage.setItem('paginaProduto', num);
}

// mascara do sgset em cada produto retornado
function sgsetMask(sgset){

    if(sgset){
        let mask = sgset.split('').reverse()
        let text = "";

        for (let i = 0; i < mask.length; i++) {
            if(i == 3){
                text += mask[i] + '/'
            }else{
                text += mask[i]
            }
        }
        
        text = text.split('').reverse()
        mask = ''


        for (let x = 0; x < text.length; x++) {
            mask += text[x]
        }

        return mask
    }

  }

function exibirProdutos(produtos) {

    if (produtos.length > 0) {

        // Limpando a tabela
        table.innerHTML = '';

        paginacao.classList.remove('hidden');

        for (let produto of produtos) {

            let statusIMG;
            let color;
            let optionIMG;
            // var sgset = produto['nSGSET'];

            // if (sgset.value.length == 3){
            // sgset.value += '-'
            // } else if (sgset.value.length == 6){
            // sgset.value += '/'
            // }
    
            if (produto['Situacao'].toLowerCase() == 'em andamento') {
                
                optionIMG = '#24c292';
                color = 'color-green';
                statusIMG = `<svg xmlns="http://www.w3.org/2000/svg" alt="${produto['situacao']}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${optionIMG}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings w-10 h-10 p-2 bg-${color}/20 rounded-md"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`;
            } else if (produto['Situacao'].toLowerCase() == 'concluido') {
                optionIMG = '#3976d1';
                color = 'primary';
                statusIMG = `<svg xmlns="http://www.w3.org/2000/svg" alt="${produto['situacao']}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${optionIMG}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings w-10 h-10 p-2 bg-${color}/20 rounded-md"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`;
            } else {
                optionIMG = '#737373';
                color = '[#737373]';
                statusIMG = `<svg xmlns="http://www.w3.org/2000/svg" alt="N/A" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${optionIMG}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-question w-10 h-10 p-2 bg-${color}/20 rounded-md"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>`;
            }

            let divRow = document.createElement('div');

            divRow.classList = 'row-item flex flex-nowrap bg-component rounded-md border-2 border-[transparent] hover:border-primary transition-colors';

            divRow.innerHTML = `
            <div class="area-left flex-1 flex flex-nowrap items-center justify-between rounded-l-md py-4 px-3 md:px-4 overflow-x-auto cursor-pointer">
                <div class="flex items-center gap-8 lg:w-full">
                    <div class="flex items-center gap-3 border-r border-color-text-secundary pr-8">
                        ${statusIMG}
                        <div class="w-[150px] overflow-hidden text-ellipsis">
                            <span title="${produto['TituloProposta'] ? produto['TituloProposta'] : 'N/A'}" class="font-semibold text-lg leading-4 whitespace-nowrap capitalize">${produto['TituloProposta'] ? produto['TituloProposta'] : 'N/A'}</span>
                            <div class="text-color-text-secundary font-semibold text-xs flex flex-wrap justify-between gap-1">
                                <span class="capitalize whitespace-nowrap" title="${sgsetMask(produto['nSGSET']) ? sgsetMask(produto['nSGSET']) : 'N/A'}">${sgsetMask(produto['nSGSET']) ? sgsetMask(produto['nSGSET']) : 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-3 border-r border-color-text-secundary pr-8">
                        <div class="flex flex-col gap-1 font-semibold w-[150px] max-w-[150px]">
                            <span class="text-lg leading-4 overflow-hidden text-ellipsis whitespace-nowrap capitalize" title="${produto['NomeProduto'] ? produto['NomeProduto'] : 'N/A'}">${produto['NomeProduto'] ? produto['NomeProduto'] : 'N/A'}</span>
                            <span title="${produto['ServicoCategoria'] ? produto['ServicoCategoria'] : 'N/A'}" class="text-xs text-color-text-secundary capitalize overflow-hidden text-ellipsis whitespace-nowrap">${produto['ServicoCategoria'] ? produto['ServicoCategoria'] : 'N/A'}</span>
                        </div>
                        </div>
                        <div class="flex items-center gap-3 border-r border-color-text-secundary pr-8">
                            <div class="flex flex-col gap-1 font-semibold w-[100px]">
                                <span class="text-lg leading-4 overflow-hidden text-ellipsis whitespace-nowrap capitalize">Proposta</span>
                                <span title="${produto['TituloProposta'] ? produto['TituloProposta'] : 'N/A'}" class="text-xs text-color-text-secundary capitalize overflow-hidden text-ellipsis whitespace-nowrap">${produto['TituloProposta'] ? produto['TituloProposta'] : 'N/A'}</span>
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
                    <div class="flex items-center gap-3">
                        <div class="flex flex-col gap-1 font-semibold w-[100px]">
                            <span class="text-lg leading-4 overflow-hidden text-ellipsis whitespace-nowrap">Data final</span>
                            <span title="${produto['DataFinal'] ? produto['DataFinal'].split('-').reverse().join('/') : 'N/A'}" class="text-xs text-color-text-secundary capitalize overflow-hidden text-ellipsis whitespace-nowrap">${produto['DataFinal'] ? produto['DataFinal'].split('-').reverse().join('/') : 'N/A'}</span>
                        </div>
                    </div>
                    <span class="bg-${color}/20 rounded-md text-${color} font-semibold text-xs py-2 px-6 ml-9 lg:ml-auto uppercase whitespace-nowrap">${produto['Situacao'] ? produto['Situacao'] : 'N/A'}</span>
                </div>
            </div>
            <div class="area-right bg-component rounded-md px-3 md:px-4 flex items-center justify-center">
                <button type="button" class="option-dropdown-trigger btn-trigger w-6 h-max bg-${color}/20 rounded-md relative">
                    <svg xmlns="http://www.w3.org/2000/svg" alt="Opções" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${optionIMG}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-more-vertical option-dropdown-trigger w-full p-1"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                    <div class="option-dropdown hidden absolute min-w-[150px] z-10 bottom-0 right-[125%] h-auto bg-component border border-body rounded-md shadow-md">
                        <div itemid="${produto['idProduto']}" class="view-btn space-y-2 p-2 rounded-md text-sm hover:bg-primary/20 transition-colors">
                            <div class="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" alt="Visualizar" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3976d1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye w-5 h-5"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
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
                verDetalhesProduto(divRow.querySelector('.view-btn'));
            })

            table.appendChild(divRow);
        }
        reloadLinhas();

        return;
    }

}

// Redirecionamento para ver 
function verDetalhesProduto(element) {

    localStorage.setItem('idProduto', element.getAttribute('itemid'));
            
    window.location.href = '../detalhesProduto/detalhesProduto.html';
}

// Alocar uma função de visualizar proposta em todos os botões das propostas na tabela
function getTodosBotoes() {

    document.querySelectorAll('.view-btn').forEach((btn) => {

        btn.addEventListener('click', () => {

            verDetalhesProduto(btn);
        });
    });
}

// Reaplicar as funções referentes a linhas da tabela
function reloadLinhas() {

    const btnAcionadores = document.querySelectorAll('.btn-trigger');

    btnAcionadores.forEach((btn) => {

        // Abrir o menu específico do botão clicado, na linha
        btn.addEventListener('click', () => {

            if (btn.querySelector('.option-dropdown').classList.contains('hidden')) {
                // Se tiver a classe hidden, significa que o usuário quer mostrar o menu
                esconderTudo();

                btn.querySelector('.option-dropdown').classList.toggle('hidden');
                btn.parentElement.parentElement.classList.toggle('selected-row');
            } else {
                // Se não tiver a classe hidden, significa que o usuário quer esconder o menu    
                esconderTudo();
            }
        });
    });

    getTodosBotoes();
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

// Fechar todos ao clicar fora do botão
window.addEventListener('click', (event) => {

    if (!event.target.matches('.option-dropdown-trigger')) {

        esconderTudo();
    }
});


window.addEventListener('load', async () => {

    if(sessionStorage.getItem('aba') == 'produto') {
        
        // Fazendo a requisição para a buscar os produto        
        userInfo.classList.add('hidden');
        userProd.classList.remove('hidden');

        spanInformacoes.classList.remove('text-primary');
        spanInformacoes.classList.remove('border-b-2');
        spanProdutos.classList.add('text-primary');
        spanProdutos.classList.add('border-b-2');
        
        if (await buscarProdutos() === false) {

            document.getElementById('table').innerHTML = `
            <div class='flex flex-col justify-center items-center gap-4'>
                <svg width="67" height="68" viewBox="0 0 67 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M33.5004 67.4168C32.6115 67.4168 31.7643 67.2502 30.9587 66.9168C30.1532 66.5835 29.4171 66.1113 28.7504 65.5002L2.00041 38.7502C1.3893 38.0835 0.917074 37.3474 0.58374 36.5418C0.250407 35.7363 0.0837402 34.8891 0.0837402 34.0002C0.0837402 33.1113 0.250407 32.2502 0.58374 31.4168C0.917074 30.5835 1.3893 29.8613 2.00041 29.2502L28.7504 2.50016C29.4171 1.8335 30.1532 1.34739 30.9587 1.04183C31.7643 0.736274 32.6115 0.583496 33.5004 0.583496C34.3893 0.583496 35.2504 0.736274 36.0837 1.04183C36.9171 1.34739 37.6393 1.8335 38.2504 2.50016L65.0004 29.2502C65.6671 29.8613 66.1532 30.5835 66.4587 31.4168C66.7643 32.2502 66.9171 33.1113 66.9171 34.0002C66.9171 34.8891 66.7643 35.7363 66.4587 36.5418C66.1532 37.3474 65.6671 38.0835 65.0004 38.7502L38.2504 65.5002C37.6393 66.1113 36.9171 66.5835 36.0837 66.9168C35.2504 67.2502 34.3893 67.4168 33.5004 67.4168ZM33.5004 60.7502L60.2504 34.0002L33.5004 7.25016L6.75041 34.0002L33.5004 60.7502ZM30.1671 37.3335H36.8337V17.3335H30.1671V37.3335ZM33.5004 47.3335C34.4449 47.3335 35.2365 47.0141 35.8754 46.3752C36.5143 45.7363 36.8337 44.9446 36.8337 44.0002C36.8337 43.0557 36.5143 42.2641 35.8754 41.6252C35.2365 40.9863 34.4449 40.6668 33.5004 40.6668C32.556 40.6668 31.7643 40.9863 31.1254 41.6252C30.4865 42.2641 30.1671 43.0557 30.1671 44.0002C30.1671 44.9446 30.4865 45.7363 31.1254 46.3752C31.7643 47.0141 32.556 47.3335 33.5004 47.3335Z" fill="#f54a4c"/>
                </svg>
                <h2 class='font-bold text-color-text text-center'>OPA, UM ERRO ACONTECEU AO BUSCAR OS PRODUTOS</h2>
            </div>
            `;

            return;
        }

        botoesPaginacao();
    }
    

});
