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
        const statusAtualP = document.createElement('p');
        const statusAnteriorP = document.createElement('p');
        const dataInicialP = document.createElement('p');
        const dataFinalP = document.createElement('p');
        const dataDiferencaP = document.createElement('p');

        let dataInicial = new Date(historico[2]);
        let dataFinal = new Date(historico[3]);
        // Calcule a diferença em dias
        let diferencaEmDias = (dataFinal - dataInicial) / (1000 * 60 * 60 * 24);

        statusAtualP.textContent = "Status Atual: " + historico[0];
        statusAnteriorP.textContent = "Status Anterior: " + historico[1];
        dataInicialP.textContent = "Data Inicial: " + historico[2];
        dataFinalP.textContent = "Data Final: " + historico[3]; // Adiciona o texto do p (Para poder ser visto na tela)
        dataDiferencaP.textContent = "Diferença de Datas: " + diferencaEmDias + " dias";

        div.appendChild(statusAtualP); // Adiciona o p à div
        div.appendChild(statusAnteriorP);
        div.appendChild(dataInicialP);
        div.appendChild(dataFinalP);
        div.appendChild(dataDiferencaP);
    });
})
.catch(error => {
    console.error('Error:', error);
});