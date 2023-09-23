import { back } from '../Rotas/rotas.js'
const div = document.getElementById('tabelaHist');

const idProposta = localStorage.getItem('idProposta');
// Acessa o backend para pegar os historicos do funil de vendas
fetch(back + `/historico/pegarHistoricoFunil.php?idProposta=${idProposta}`, {method: 'GET'})
.then(response => {
    if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status} ${response.statusText}`);
    }
    return response.json();
})
.then(data => {
    // Loop para criar os ps
    data.forEach((historico) => {

        let dataInicial = new Date(historico[2]);
        let dataFinal = new Date(historico[3]);
        // Calcule a diferença em dias
        let diferencaEmDias = (dataFinal - dataInicial) / (1000 * 60 * 60 * 24);

        // criando os cards

        const card = document.createElement('div');

        card.innerHTML += `
        <div id="cardHistorico" class="rounded-lg w-60 bg-primary h-auto text-[#fff] ml-2 mt-2">
                            
            <div class="bg-[#285292] w-full py-3 rounded-t-lg text-center">
                <h1 class="font-bold">INTERVALO</h1>
                <p class="text-sm text-[#c5c5c5]">${diferencaEmDias} dias</p>
            </div>

            <div class="px-6 py-4 gap-4 flex flex-col">

                <div class="flex flex-col gap-4 text-center">
                    <div>
                        <h3 class="text-sm font-semibold">Data inicial:</h3>
                        <p class="text-sm text-[#c5c5c5]">${historico[2]}</p>
                    </div>

                    <div>
                        <h3 class="text-sm font-semibold">Data final:</h3>
                        <p class="text-sm text-[#c5c5c5]">${historico[3]}</p>
                    </div>
                </div>

                <div class="flex flex-col gap-4 text-center">
                    <div>
                        <h3 class="text-sm font-semibold">Status anterior:</h3>
                        <p class="text-sm text-[#c5c5c5] uppercase">${historico[1]}</p>
                    </div>

                    <div class="pl-[2px]">
                        <h3 class="text-sm font-semibold">Status atual:</h3>
                        <p class="text-sm text-[#c5c5c5] uppercase">${historico[0]}</p>
                    </div>
                </div>

            </div>

        </div>`

        // adicionando o card à tabela

        div.appendChild(card);
    });
})
.catch(error => {
    console.error('Error:', error);
});