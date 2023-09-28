import alertas from '../../feedback.js';
import { back } from '../Rotas/rotas.js';

const botaoPesquisar = document.getElementById('pesquisar');

let tabela = document.querySelector('#produtosDoTecnico');

botaoPesquisar.addEventListener('click', () => {
    puxarProdutosDoTecnico();
    
})

// EXIBIR UM ALERTA
function exibirAlerta(template) {

    tabela.innerHTML = template;
}

async function puxarProdutosDoTecnico () {
    const nif = document.getElementById('pesquisaNif').value;

    const requisicao = await fetch (back + `/lancarHorasEsquecidas/carregarProdutosDoTecnico.php?nif=${nif}`);

    const resposta = await requisicao.json();

    console.log(resposta);

    if(resposta.length == 0){

        exibirAlerta(`
        <div class='flex flex-col justify-center items-center gap-4'>
            <img src="../../img/icon/emergency.svg" alt="atenção">
            <h2 class='font-bold'>NENHUM PRODUTO ENCONTRADO</h2>
            <p>Certifique-se de passar um NIF correto!</p>
            </div>
        </div>`
        );

        localStorage.setItem('status', 'error');
        localStorage.setItem('mensagem', 'Nenhum produto encontado para esse Técnico');

        alertas();
    } else {
        const divProdutos = document.getElementById('produtosDoTecnico');

        exibirAlerta('');

        // Loop pela lista
        for (var i = 0; i < resposta.length; i++) {
            // Cria um elemento de botão
            
            console.log(resposta[i]);

            let statusIMG;
            let color;
            let optionIMG;
    
            if (resposta[i]['situacao'].toLowerCase() == 'em andamento') {
                
                optionIMG = '#24c292';
                color = 'color-green';
                statusIMG = `<svg xmlns="http://www.w3.org/2000/svg" alt="${resposta[i]['situacao']}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${optionIMG}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings w-10 h-10 p-2 bg-${color}/20 rounded-md"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`;
            } else if (resposta[i]['situacao'].toLowerCase() == 'concluida') {

                optionIMG = '#3976d1';
                color = 'primary';
                statusIMG = `<svg xmlns="http://www.w3.org/2000/svg" alt="${resposta[i]['situacao']}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${optionIMG}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings w-10 h-10 p-2 bg-${color}/20 rounded-md"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`;
            } else {

                optionIMG = '#737373';
                color = '[#737373]';
                statusIMG = `<svg xmlns="http://www.w3.org/2000/svg" alt="N/A" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${optionIMG}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-question w-10 h-10 p-2 bg-${color}/20 rounded-md"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>`;
            }
            
            let div = document.createElement('div');

            div.classList = 'row-item flex flex-nowrap bg-component rounded-md border-2 border-[transparent] hover:border-primary transition-colors';

            div.innerHTML = `
            <div class="area-left flex-1 flex flex-nowrap items-center justify-between rounded-l-md py-4 px-3 md:px-4 overflow-x-auto cursor-pointer">
                <div class="flex items-center gap-8 lg:w-full">
                    <div class="flex items-center gap-3 border-r border-color-text-secundary pr-8">
                        ${statusIMG}
                        <div class="w-[150px] max-w-[150px] overflow-hidden text-ellipsis">
                            <span title="${resposta[i]['NomeProduto'] ? resposta[i]['NomeProduto'] : 'N/A'}" class="font-semibold text-lg leading-4 whitespace-nowrap capitalize">${resposta[i]['NomeProduto'] ? resposta[i]['NomeProduto'] : 'N/A'}</span>
                            <div class="text-color-text-secundary font-semibold text-xs flex flex-wrap justify-between gap-1">
                                <span class="capitalize overflow-hidden text-ellipsis whitespace-nowrap" title="${resposta[i]['ServicoCategoria'] ? resposta[i]['ServicoCategoria'] : 'N/A'}">${resposta[i]['ServicoCategoria'] ? resposta[i]['ServicoCategoria'] : 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-3 border-r border-color-text-secundary pr-8">
                        <div class="flex flex-col gap-1 font-semibold w-[100px]">
                            <span class="text-lg leading-4 overflow-hidden text-ellipsis whitespace-nowrap capitalize">Máquina</span>
                            <span title="${resposta[i]['Maquina'] ? resposta[i]['Maquina'] : 'N/A'}" class="text-xs text-color-text-secundary capitalize overflow-hidden text-ellipsis whitespace-nowrap">${resposta[i]['Maquina'] ? resposta[i]['Maquina'] : 'N/A'}</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-3 border-r border-color-text-secundary pr-8">
                        <div class="flex flex-col gap-1 font-semibold w-[100px]">
                            <span class="text-lg leading-4 overflow-hidden text-ellipsis whitespace-nowrap capitalize">Área</span>
                            <span title="${resposta[i]['area'] ? resposta[i]['area'] : 'N/A'}" class="text-xs text-color-text-secundary capitalize overflow-hidden text-ellipsis whitespace-nowrap">${resposta[i]['area'] ? resposta[i]['area'] : 'N/A'}</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <div class="flex flex-col gap-1 font-semibold w-[100px]">
                            <span class="text-lg leading-4 overflow-hidden text-ellipsis whitespace-nowrap">Data final</span>
                            <span title="${resposta[i]['DataFinal'] ? resposta[i]['DataFinal'].split('-').reverse().join('/') : 'N/A'}" class="text-xs text-color-text-secundary capitalize overflow-hidden text-ellipsis whitespace-nowrap">${resposta[i]['DataFinal'] ? resposta[i]['DataFinal'].split('-').reverse().join('/') : 'N/A'}</span>
                        </div>
                    </div>
                    <span class="bg-${color}/20 rounded-md text-${color} font-semibold text-xs py-2 px-6 ml-9 lg:ml-auto uppercase">${resposta[i]['situacao'] ? resposta[i]['situacao'] : 'N/A'}</span>
                </div>
            </div>
            <div class="area-right bg-component rounded-md px-3 md:px-4 flex items-center justify-center">
                <button type="button" class="option-dropdown-trigger btn-trigger w-6 h-max bg-${color}/20 rounded-md relative">
                    <svg xmlns="http://www.w3.org/2000/svg" alt="Opções" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${optionIMG}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-more-vertical option-dropdown-trigger w-full p-1"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                    <div class="option-dropdown hidden absolute min-w-[150px] z-10 bottom-0 right-[125%] h-auto bg-component border border-body rounded-md shadow-md">
                        <div itemid="${resposta[i]['idProduto']}" class="view-btn space-y-2 p-2 rounded-md text-sm hover:bg-primary/20 transition-colors">
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

            div.querySelector('.area-left').addEventListener('click', function() {

                // Recuperando o botão o itemid, ao clicar na linha
                verDetalhesProduto(div.querySelector('.view-btn'));
            })

            tabela.appendChild(div);
        }

        reloadLinhas();

    }
}

// Alocar uma função de visualizar proposta em todos os botões das propostas na tabela
function getTodosBotoes() {

    document.querySelectorAll('.view-btn').forEach((btn) => {

        btn.addEventListener('click', () => {

            verDetalhesProduto(btn);
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

function verDetalhesProduto(element) {


    localStorage.setItem('idProduto', element.getAttribute('itemid'));
            
    window.location.href = '../detalhesProdutoParaLancarHora/DetalhesProdutoParaLancarHora.html';
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

// Fechar todos os menus de opções das linhas, ao clicar fora do botão
window.addEventListener('click', (event) => {

    if (!event.target.matches('.option-dropdown-trigger')) {

        esconderTudo();
    }
});

exibirAlerta(
    `
    <h1 class='text-color-text font-semibold text-lg leading-4 uppercase text-center'>
        Insira o NIF do funcionario desejado!
    </h1>
    `
);
