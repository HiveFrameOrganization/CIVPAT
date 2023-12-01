export default async function exibirProdutos(produtos) {
    // selecionando a div dos botões
    const botoes = document.getElementById('propostas');
    // limpando os possíveis elementos que possam estar na div
    document.getElementById('propostas').innerHTML = '';
    
    for (let produto of produtos) {
        
        const divRow = document.createElement('div');
        
        divRow.classList = 'row-item flex flex-nowrap bg-component rounded-md border-2 border-[transparent] hover:border-primary transition-colors cursor-pointer';

        let optionIMG
        let statusDescricao
        let statusIMG;
        let color;

        let valor = produto['Valor'];

        valor = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(valor);
    
        let status = produto['Situacao'].toLowerCase();

        if (status == 'concluido') {
            
            statusDescricao = 'Concluído';
            statusIMG = '../../img/icon/check-circle.svg';
            optionIMG = '../../img/icon/more-vertical.svg';
            color = 'primary';
        } else if (status == 'em andamento') {
            
            statusDescricao = 'Em andamento';
            statusIMG = '../../img/icon/settings-green.svg';
            optionIMG = '../../img/icon/more-vertical-green.svg';
            color = 'color-green'
        }
    
        
        divRow.innerHTML = `
            <div class="flex-1 flex flex-nowrap items-center justify-between rounded-l-md py-4 px-3 md:px-4 overflow-x-auto">
                <div class="flex items-center gap-8 lg:w-full">
                    <div class="flex items-center gap-3 border-r border-color-text-secundary pr-8">
                        <img src="${statusIMG}" alt="${statusDescricao}" class="w-10 h-10 p-2 bg-${color}/20 rounded-md">
                        <div class="w-[300px] max-w-[300px] overflow-hidden text-ellipsis">
                            <span title="${produto['NomeProduto']}" class="font-semibold text-lg leading-4 whitespace-nowrap capitalize">${produto['NomeProduto']}</span>
                            <div class="text-color-text-secundary font-semibold text-xs flex flex-wrap justify-between gap-1 whitespace-nowrap">
                                <span title="${produto['ServicoCategoria']}" class="overflow-hidden text-ellipsis">${produto['ServicoCategoria'] ? produto['ServicoCategoria'] : 'N/A'}</span>
                            </div>
                        </div>
                    </div>


                    <div class="flex items-center gap-3 border-r border-color-text-secundary pr-8">
                        <div class="w-[120px] max-w-[120px] overflow-hidden text-ellipsis">
                            <span title="${produto['Nome']}" class="font-semibold text-lg leading-4 whitespace-nowrap capitalize">${produto['Nome']}</span>
                            <div class="text-color-text-secundary font-semibold text-xs flex flex-wrap justify-between gap-1">
                                <span title="Técnico">Técnico</span>
                            </div>
                        </div>
                    </div>



                    <div class="flex items-center gap-3 border-r border-color-text-secundary pr-8">
                        <div class="w-[120px] max-w-[120px] overflow-hidden text-ellipsis">
                            <span title="${valor}" class="font-semibold text-lg leading-4 whitespace-nowrap capitalize">${valor}</span>
                            <div class="text-color-text-secundary font-semibold text-xs flex flex-wrap justify-between gap-1">
                                <span title="Valor">Valor</span>
                            </div>
                        </div>
                    </div>


                    <div class="flex items-center gap-3 pr-8">
                        <div class=" overflow-hidden text-ellipsis">
                            <span title="Data de término" class="font-semibold text-lg leading-4 whitespace-nowrap capitalize">${produto['DataFinal']}</span>
                            <div class="text-color-text-secundary font-semibold text-xs flex flex-wrap justify-between gap-1">
                                <span title="Data de término">Data de término</span>
                            </div>
                        </div>
                    </div>

                    <span class="bg-${color}/20 text-${color} rounded-md font-semibold text-xs py-2 px-6 ml-9 lg:ml-auto uppercase whitespace-nowrap">${statusDescricao}</span>
            </div>`
          


        divRow.onclick = () => {
            localStorage.setItem('idProduto', produto['idProduto']);

            window.location.href = '../../pages/detalhesProduto/detalhesProduto.html';

        }

        botoes.append(divRow)
    }
}