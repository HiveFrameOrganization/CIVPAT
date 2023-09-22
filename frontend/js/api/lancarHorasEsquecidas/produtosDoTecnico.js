import alertas from '../../feedback.js';
import { back } from '../Rotas/rotas.js';

const botaoPesquisar = document.getElementById('pesquisar');

botaoPesquisar.addEventListener('click', () => {
    puxarProdutosDoTecnico();
    
})

async function puxarProdutosDoTecnico () {
    const nif = document.getElementById('pesquisaNif').value;

    const requisicao = await fetch (back + `/lancarHorasEsquecidas/carregarProdutosDoTecnico.php?nif=${nif}`);

    const resposta = await requisicao.json();

    console.log(resposta);

    if(resposta.length == 0){
        localStorage.setItem('status', 'error');
        localStorage.setItem('mensagem', 'Nenhum produto encontado para esse Técnico');

        alertas();
    } else {
        const divProdutos = document.getElementById('produtosDoTecnico');
        // Loop pela lista
        for (var i = 0; i < resposta.length; i++) {
            // Cria um elemento de botão
            var botao = document.createElement("button");
    
            // Define o texto do botão como o valor atual da lista
            botao.textContent = resposta[i]['idProduto'];
            botao.value = resposta[i]['idProduto'];
            botao.setAttribute('id', 'produto');   
    
            // Adiciona o evento de clique ao botão
            botao.addEventListener("click", function() {
                // Quando o botão é clicado, exibe o valor no console.log
                localStorage.setItem('idProduto', this.value);
    
                window.location.href = '../detalhesProdutoParaLancarHora/DetalhesProdutoParaLancarHora.html';
            });
            
    
            // Adiciona o botão à div
            divProdutos.appendChild(botao);
        }

    }


}