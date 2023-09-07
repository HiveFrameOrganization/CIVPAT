import { back } from '../Rotas/rotas.js'
const div = document.getElementById('tabelaHist');

// Acessa o backend para pegar os historicos do funil de vendas
fetch(back + `/followUp/pegarHistoricoFunil.php?idProposta=1`, {method: 'GET'})
.then(response => {
    if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status} ${response.statusText}`);
    }
    return response.json();
})
.then(data => {
    // Loop para criar os ps
    if (data.mensagem) {
        
    } else {
        data.forEach((status) => {
            const p = document.createElement('p');
            p.textContent = status; // Adiciona o texto do p (Para poder ser visto na tela)
            div.appendChild(p); // Adiciona o p à div
        });
    }
})
.catch(error => {
    console.error('Error:', error);
});