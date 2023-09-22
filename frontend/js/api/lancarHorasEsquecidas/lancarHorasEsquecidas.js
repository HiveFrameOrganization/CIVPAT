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

const botaoLancarHora = document.getElementById('lancarhora');

botaoLancarHora.addEventListener('click', () => {
    lancarHoraParaOTecnico();
})


async function lancarHoraParaOTecnico () {
    const horaPessoa = document.getElementById('horaPessoaInput').value;
    const horaMaquina = document.getElementById('horaMaquinaInput').value;
    // const nifTecnico = 
    
    const dataLancamento = document.getElementById('dataDoLancamento').value;

    const dadosEnviados = {
        horaPessoa: (horaPessoa == null) ? 0 : horaPessoa ,
        horaMaquina: (horaMaquina == null) ? 0 : horaMaquina,
        dataLancamento: dataLancamento,


    }

    const requisicao = await fetch (back + '/lancarHorasEsquecidas/lancarHorasEsquecidas.php', {
        method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dadosEnviados)
    });

    const dados = await resposta.json();

}
