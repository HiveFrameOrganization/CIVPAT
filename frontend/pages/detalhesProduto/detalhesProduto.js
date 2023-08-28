import { back } from '../../js/api/Rotas/rotas.js';


// formatar a data
const hoje = new Date();
const ano = hoje.getFullYear();
let mes = hoje.getMonth() + 1;
let dia = hoje.getDate();

// Garantir que vai ter um 0 em meses que não tem dois números
if (mes < 10) {
    mes = '0' + mes;
};
if (dia < 10) {
    dia = '0' + dia;
};

// Não permitir que marque uma data depois de hoje.
const dataMaxima = `${ano}-${mes}-${dia}`;
document.getElementById('dataInicial').setAttribute('min', dataMaxima);
// document.getElementsByName('dataFinal').setAttribute('max', dataMaxima);

////////////////////////////////////////////////

const dataInicial = document.getElementById('dataInicial');

dataInicial.addEventListener('change', () => validacaoDataFinal());

async function validacaoDataFinal () {
    // Validação para o input da data final nunca receber uma data antes da data inicial
    const dataInicial = document.getElementById('dataInicial').value;

    document.getElementById('dataFinal').setAttribute('min', dataInicial);

}

window.addEventListener('load',async function (){

    const produtoSelect = document.getElementById("produto");
    const servicoCategoriaSelect = document.getElementById('servico');

    const dadosProduto = await carregarDetalhesProduto();  

    const idServicoCategoria = dadosProduto.idProduto; 

    // Percorra as opções do <select> para encontrar a que corresponde ao valor desejado
    for (var i = 0; i < servicoCategoriaSelect.options.length; i++) {
        if (servicoCategoriaSelect.options[i].value == dadosProduto.fk_idServicoCategoria) {
            servicoCategoriaSelect.options[i].selected = true;
            break; // Saia do loop após encontrar a opção desejada
        }
    }
    
    // Excluir as options anteriores
    produtoSelect.innerHTML = "";
    
    try {
        const requisicao = await fetch(back + `/cadastroProduto/carregarProdutos.php?id=${idServicoCategoria}`);

        // dados de todas as propostar recebidas (resposta da api)
        const dados = await requisicao.json();

        // caso a requisição de um erro, irá exibir uma mensagem de erro
        if (dados.resposta === 'erro') throw new Error(dados.message);

        // Loop pelos resultados e crie as options
        dados.forEach(function(dado) {
            var option = document.createElement('option');
            option.value = dado.idNomeProduto;
            option.text = dado.NomeProduto;
            produtoSelect.appendChild(option);
        });

        
        
    } catch {
        console.log('Error');
    }

    
})

// Quando for selecionado executar 
document.getElementById("servico").addEventListener("change",async function() {
    const idServicoCategoria = document.getElementById('servico').value;
    const produtoSelect = document.getElementById("produto");


    
    // Excluir as options anteriores
    produtoSelect.innerHTML = "";
    
    try {
        const requisicao = await fetch(back + `/cadastroProduto/carregarProdutos.php?id=${idServicoCategoria}`);

        // dados de todas as propostar recebidas (resposta da api)
        const dados = await requisicao.json();

        // caso a requisição de um erro, irá exibir uma mensagem de erro
        if (dados.resposta === 'erro') throw new Error(dados.message);

        // Loop pelos resultados e crie as options
        dados.forEach(function(dado) {
            var option = document.createElement('option');
            option.value = dado.idNomeProduto;
            option.text = dado.NomeProduto;
            produtoSelect.appendChild(option);
        });
    } catch {
        console.log('Error');
    }
// Adicionar o Select2
// $(document).ready(function() { 
//     $("#servico").select2();
// });

// $(document).ready(function() { 
//         $("#produto").select2();
//     });
});


async function carregarDetalhesProduto() {
    const idProduto = localStorage.getItem('idProduto');

    const requisicao = await fetch(back + `/detalhesProduto/detalhesProduto.php?id=${idProduto}`);

    // dados de todas as propostar recebidas (resposta da api)
    const dados = await requisicao.json();

    // caso a requisição de um erro, irá exibir uma mensagem de erro
    if (dados.resposta === 'erro') throw new Error(dados.message);

    return dados[0];

}

async function selecionarProduto(dadosProduto) {

    console.log(dadosProduto);

    const produtoSelect = document.getElementById("produto");
    // Percorra as opções do <select> para encontrar a que corresponde ao valor desejado
    for (var i = 0; i < produtoSelect.options.length; i++) {
        if (produtoSelect.options[i].value == dadosProduto.fk_idNomeProduto) {
            produtoSelect.options[i].selected = true;
            break; // Saia do loop após encontrar a opção desejada
        }
    }
}

/////////////////////////////

