import { back } from '../Rotas/rotas.js'

const table = document.querySelector('#table');

window.addEventListener('load', () => {
    // ao carregar a página, a função irá executar
    pegarTodasAsPropostas();
})

async function pegarTodasAsPropostas () {

    try{
        // link da requisição
        const resposta = await fetch(back + '/todasPropostas/todasPropostas.php');
        
        // dados de todas as propostar recebidas (resposta da api)
        const dados = await resposta.json();

        // caso a requisição de um erro, irá exibir uma mensagem de erro
        if (dados.resposta === 'erro') throw new Error(dados.message);
        
        exibirPropostas(dados.propostas);

        // Adicionando a quaqntidade de propostas de acordo com os seus status
        document.getElementById('analise').textContent = `# ${dados['Em Análise']}`;
        document.getElementById('aceitos').textContent = `# ${dados['Aceito']}`;
        document.getElementById('declinados').textContent = `# ${dados['Declinado']}`;
        document.getElementById('concluidos').textContent = `# ${dados['Concluido']}`;

    } catch (error){
        console.error(error)
    }

}


function exibirPropostas(propostas){

    for (let proposta of propostas) {

        let divRow = document.createElement('div');

        divRow.classList = 'row-item flex flex-nowrap bg-component rounded-md border-2 border-[transparent] hover:border-primary transition-colors';

        const fotoDePerfil = proposta['FotoDePerfil'];

        // Inserindo o Template na linha
        divRow.innerHTML = `
        <div class="flex-1 flex flex-nowrap items-center justify-between rounded-l-md py-4 px-3 md:px-4 overflow-x-auto">
            <div class="flex items-center gap-8 lg:w-full">
                <div class="flex items-center gap-3 border-r border-color-text-secundary pr-8">
                    <img src="../../img/icon/inventory.svg" alt="Em análise" class="w-10 h-10 p-2 bg-[#7950FF]/20 rounded-md">
                    <div class="max-w-[250px] overflow-hidden text-ellipsis">
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
                <span class="bg-[#7950FF]/20 rounded-md text-primary font-semibold text-xs py-2 px-6 ml-9 lg:ml-auto uppercase">${proposta['Status']}</span>
            </div>
        </div>
        <div class="bg-component rounded-md px-3 md:px-4 flex items-center justify-center">
            <button type="button" class="w-6 h-6 p-1 bg-[#7950FF]/20 rounded-md relative">
                <img src="../../img/icon/more-vertical.svg" alt="Opções" class="option-dropdown-trigger w-full">
                <div class="option-dropdown hidden absolute z-10 bottom-0 right-[125%] h-auto bg-component rounded-md border border-body shadow-sm">
                    <ul role="listitem" class="space-y-2">
                        <li role="option" class="text-color-text-secundary hover:bg-color-text-secundary/20 transition-colors px-4 py-1 text-sm cursor-pointer rounded-md">
                            <a itemid="${proposta['idProposta']}" href="#" class="view px-1 py-1">
                                Visualizar
                            </a>
                        </li>
                    </ul>
                </div>
            </button>
        </div>`;

        table.appendChild(divRow);
    }
};
