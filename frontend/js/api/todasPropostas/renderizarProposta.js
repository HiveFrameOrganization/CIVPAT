// Arquivo responsável por Gerar os cards 
// e fazer alterações visuais na tela de proposota

import { back } from '../Rotas/rotas.js';

async function getFotoFuncionario(nif) {

    if (nif) {

        const requisicao = await fetch(back + `/perfil/carregarFotoPerfil.php?nif=${nif}`)

        const resposta = await requisicao.blob();

        if (resposta.size > 0) {

            return URL.createObjectURL(resposta);
        }

        return false;
    }
    return false;
} 


async function exibirPropostas(propostas){

    paginacao.classList.add('hidden');

    if (propostas) {

        table.innerHTML = '';

        paginacao.classList.remove('hidden');
        
        for (let proposta of propostas) {

            let divRow = document.createElement('div');
    
            divRow.classList = 'row-item flex flex-nowrap bg-component rounded-md border-2 border-[transparent] hover:border-primary transition-colors';

            let fotoDePerfil = await getFotoFuncionario(proposta['fk_nifGerente']);
    
            let status = proposta['Status'].toLowerCase();
    
            let statusIMG;
            let color;
            let optionIMG;
            let statusDescricao;
            let data = ''
            let corData
            let fim = proposta['Fim']

            // VERIFICAR DATA DO FIM DA PROPOSTA
            if(fim === null || fim === undefined){
                data = ''
            }else if(proposta['Status'] == 'Em Análise' || proposta['Status'] == 'Aceito'){
                let date = new Date()
                date = date.toLocaleDateString()
                
                // SALVANDO DATAS EM OBEJETOS PARA SEREM CONSUMIDAS E SAPARADAS FUTURAMENTE
                const dataAtual={
                    dia: date[0].toString() + date[1].toString(),
                    mes: date[3].toString() + date[4].toString(),
                    ano: date[8].toString() + date[9].toString()
                }
                const dataFinal={
                    dia: fim[8].toString() + fim[9].toString(),
                    mes: fim[5].toString() + fim[6].toString(),
                    ano: fim[2].toString() + fim[3].toString()
                }
                
                // VERIFICA SE ESTA NO MESMO ANO
                if(dataAtual.ano == dataFinal.ano){
            
                    // VERIFICA SE ESTA NO MESMO MES
                    if(dataAtual.mes == dataFinal.mes){
                        
                        // VERIFICA SE FALTAM MENOS DE 10 DIAS PARA O FINAL DA PROPOSTA
                        if(dataFinal.dia - dataAtual.dia <= 10 && Math.sign(dataFinal.dia - dataAtual.dia) != -1){
                            // AVISO QUE ESTA PROXIMO HA DATA FINAL
                            data = 'Faltam '+(dataFinal.dia - dataAtual.dia) +' dia(s)'
                            corData = 'bg-color-orange/20 text-color-orange'
                        }else if(dataFinal.dia - dataAtual.dia > 10){
                            data = 'Atrasada '+ (dataAtual.dia - dataFinal.dia) +' dia(s)'
                            corData = 'bg-color-red/20 text-color-red'
                        }else{
                            data = ''
                        }
                    }else{
                        
                        // SALVA QUANTIDADE DE DIAS DO MES
                        let mesAtual = new Date(dataAtual.ano, dataAtual.mes, 0)
                        mesAtual = mesAtual.getDate()
                        
                        // calcula dias que faltam para o final do mes com base no dia atual
                        let diasRestantesMes = mesAtual - dataAtual.dia
                        
                        if(diasRestantesMes < 10){
                            console.log('MENOS de 10 dia(s) para o fim do mes!')
                            
                            // VERIFICA SE FALTAM MENOS DE 10 DIAS PARA O FINAL DA PROPOSTA
                            if(diasRestantesMes + parseInt(dataFinal.dia) <= 10){
                                data = (diasRestantesMes + parseInt(dataFinal.dia)) +' dia(s)'
                                corData = 'bg-color-orange/20 text-color-orange'
                            }
                        }
                    }
                
                }
            }else{
                // QUANDO NAO HOUVER NENHUM PRODUTO NA PROPOSTA
                data = ''
            }
            // FIM DA VERIFICAÇAO DO FIM DA PROPOSTA
    
            if (status == 'em análise') {
                
                statusDescricao = 'análise';
                optionIMG = '#fca001';
                color = 'color-orange';
                statusIMG = `<svg xmlns="http://www.w3.org/2000/svg" alt="${statusDescricao}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${optionIMG}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard-list w-10 h-10 p-2 bg-${color}/20 rounded-md"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>`;
            } else if (status == 'declinado') {
                
                statusDescricao = 'declinado';
                optionIMG = '#f54a4c';
                color = 'color-red';
                statusIMG = `<svg xmlns="http://www.w3.org/2000/svg" alt="${statusDescricao}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${optionIMG}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-alert-circle w-10 h-10 p-2 bg-${color}/20 rounded-md"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`;
            } else if (status == 'aceito') {
                
                statusDescricao = 'aceito';
                optionIMG = '#24c292';
                color = 'color-green'
                statusIMG = `<svg xmlns="http://www.w3.org/2000/svg" alt="${statusDescricao}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${optionIMG}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings w-10 h-10 p-2 bg-${color}/20 rounded-md"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`;
            } else if (status == 'concluido') {

                statusDescricao = 'concluído';
                optionIMG = '#3976d1';
                color = 'primary'
                statusIMG = `<svg xmlns="http://www.w3.org/2000/svg" alt="${statusDescricao}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${optionIMG}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle w-10 h-10 p-2 bg-${color}/20 rounded-md"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;
            } else {

                statusDescricao = 'N/A';
                optionIMG = '#737373';
                color = '[#737373]';
                statusIMG = `<svg xmlns="http://www.w3.org/2000/svg" alt="${statusDescricao}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${optionIMG}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-question w-10 h-10 p-2 bg-${color}/20 rounded-md"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>`;
            }

            if (proposta['nSGSET']){

                var sgset = proposta['nSGSET'];
                if (sgset != ''){
                    sgset = [sgset.slice(0, 3), '-', sgset.slice(3)].join('');
                    sgset = [sgset.slice(0, 6), '/', sgset.slice(6)].join('');
                }
            }
    
            // Inserindo o Template na linha
            divRow.innerHTML = `
            <div class="area-left cursor-pointer flex-1 flex flex-nowrap items-center justify-between rounded-l-md py-4 px-3 md:px-4 overflow-x-auto">
                <div class="flex items-center gap-8 lg:w-full">
                    <div class="flex items-center gap-3 border-r border-color-text-secundary pr-8">
                        ${statusIMG}
                        <div class="w-[200px] max-w-[200px] overflow-hidden text-ellipsis">
                            <span title="${proposta['TituloProposta']}" class="font-semibold text-lg leading-4 whitespace-nowrap capitalize">${proposta['TituloProposta']}</span>
                            <div class="text-color-text-secundary font-semibold text-xs flex flex-wrap justify-between gap-1">
                                <span title="Número do SGSET">${proposta['nSGSET'] ? sgset : 'N/A'}</span>
                                <span title="Data de início e fim">${proposta['Inicio'] && proposta['Fim'] ? proposta['Inicio']+' - '+proposta['Fim'] : 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <img src="${fotoDePerfil ? fotoDePerfil : '../../img/icon/no-image.jpg'}" alt="Responsável" class="w-8 h-8 border border-primary rounded-full">
                        <div class="flex flex-col gap-1 font-semibold">
                            <span class="text-lg leading-4 whitespace-nowrap capitalize">${proposta['Nome']}</span>
                            <span class="text-xs text-color-text-secundary capitalize">Gerente</span>
                        </div>
                    </div>
                    
                    <span class="rounded-md font-semibold text-xs py-2 px-6 ml-9 lg:ml-auto uppercase whitespace-nowrap ${corData}">${data}</span>
                    
                    <span class="bg-${color}/20 rounded-md text-${color} font-semibold text-xs py-2 px-6 ml-9 lg:ml-auto uppercase whitespace-nowrap">${statusDescricao}</span>
                </div>
            </div>
            <div class="area-right bg-component rounded-md px-3 md:px-4 flex items-center justify-center">
                <button type="button" class="option-dropdown-trigger btn-trigger w-6 h-max bg-${color}/20 rounded-md relative">
                    <svg xmlns="http://www.w3.org/2000/svg" alt="Opções" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${optionIMG}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-more-vertical option-dropdown-trigger w-full p-1"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                    <div class="option-dropdown hidden absolute min-w-[150px] z-10 bottom-0 right-[125%] h-auto bg-component border border-body rounded-md shadow-md">
                        <div itemid="${proposta['idProposta']}" class="view-btn space-y-2 p-2 rounded-md text-sm hover:bg-primary/20 transition-colors">
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
                verDetalhesDaProposta(divRow.querySelector('.view-btn'));
            })

            table.appendChild(divRow);
        }
    
        reloadLinhas();

        return;
    } else {

        document.getElementById('table').innerHTML = `
        <div class='flex flex-col justify-center items-center gap-4'>
            <img src="../../img/icon/emergency.svg" alt="atenção">
            <h2 class='font-bold'>NENHUMA PROPOSTA ENCONTRADA</h2>
        </div>
        `;
    }
};

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

function selecionarAba(filtroAoCarregarPagina) {
    
    filtroAoCarregarPagina != null || filtroAoCarregarPagina != undefined && document.getElementById(`propostas${filtroAoCarregarPagina}`).classList.add('text-primary', 'border-b-2', 'border-primary');

    document.getElementById(`todasPropostas`).classList.remove('text-primary', 'border-b-2' , 'border-primary');
}

export default exibirPropostas
export { esconderTudo, selecionarAba }