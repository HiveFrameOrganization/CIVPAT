async function preencherServicoCategoria() {
    try {
        let resposta = await fetch(`http://localhost:8080/backend/php/cadastroProduto/carregarServicoCategoria.php`, {
            method: 'GET',
            headers: {
                "content-type" : "application/json"
            }
        });

        if (!resposta.ok) {
            throw new Error('Erro na requisição');
        }

        var produtos = await resposta.json();

        string = ''

        for (let i = 0; i < produtos.length; i++) {
          const nome = produtos[i];
          
          string += `<option value='${nome}'>${nome}</option>`
          
        }

        document.getElementById('listaServicoCategoria').innerHTML = string;

        console.log(produtos);
    } catch (error) {
        console.log('Erro', error);
    }
}


async function atualizaProdutos() {
    valor = document.getElementById('listaServicoCategoria').value;

    console.log(valor);
}