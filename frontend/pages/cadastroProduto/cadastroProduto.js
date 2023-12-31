import { back } from '../../js/api/Rotas/rotas.js';
import gerarHora from '../../js/api/cadastroProduto/cadastroProdutoAPI.js';

window.addEventListener('load', () =>  pegarUnidadesCriadoras());
   

// formatar a data
const hoje = new Date();
console.log(hoje);
const ano = hoje.getFullYear();
let mes = hoje.getMonth() + 1;
let dia = hoje.getDate() + 1;

// Garantir que vai ter um 0 em meses que não tem dois números
if (mes < 10) {
    mes = '0' + mes;
};
if (dia < 10) {
    dia = '0' + dia;
};

console.log(ano, mes, dia)
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

// Quando for selecionado executar 
document.getElementById("servico").addEventListener("change", async function() {
    const idServicoCategoria = document.getElementById('servico').value;
    const produtoSelect = document.getElementById("produto");
    
    // remove estilização anterior
    produtoSelect.classList.remove('outline')
    produtoSelect.classList.remove('outline-1')
    produtoSelect.classList.remove('outline-[red]')
    produtoSelect.classList.remove('bg-color-red/20')
    produtoSelect.classList.add('valid:bg-primary/20')
    
    // Excluir as options anteriores
    produtoSelect.innerHTML = "";
    
    try {
        const requisicao = await fetch(back + `/cadastroProduto/carregarProdutos.php?id=${idServicoCategoria}`);

        // dados de todas as propostar recebidas (resposta da api)
        const dados = await requisicao.json();

        // caso a requisição de um erro, irá exibir uma mensagem de erro
        if (dados.resposta === 'erro') throw new Error(dados.message);

        // Loop pelos resultados e crie as options
        console.log(dados.length)
        if (dados.length == 0){
            var option = document.createElement('option');
            option.value = 'null';
            option.text = 'Nenhum produto pertencente a esse serviço categoria!';
            option.classList.add('bg-body')
            produtoSelect.classList.add('outline')
            produtoSelect.classList.add('outline-1')
            produtoSelect.classList.add('outline-[red]')
            produtoSelect.classList.remove('valid:bg-primary/20')
            produtoSelect.classList.add('bg-color-red/20')
            produtoSelect.appendChild(option);
        }else{
            dados.forEach(function(dado) {
                var option = document.createElement('option');
                option.value = dado.idNomeProduto;
                option.text = dado.NomeProduto;
                option.classList.add('bg-body')
                produtoSelect.appendChild(option);
            });
        }
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


async function pegarUnidadesCriadoras() {
    
    const unidadesSelect = document.getElementById('unidadeCriadora');

    const requisicao = await fetch (back + '/todasPropostas/pegarUnidadesCriadoras.php');

    // dados de todas as propostar recebidas (resposta da api)
    const dados = await requisicao.json();
    
    // caso a requisição de um erro, irá exibir uma mensagem de erro
    if (dados.resposta === 'erro') throw new Error(dados.message);

    for (let i = 0; i < dados.length; i++) {
        let option = document.createElement('option');
        option.value = dados[i].idUnidadeCriadora;
        option.textContent = dados[i].UnidadeCriadora;
        unidadesSelect.appendChild(option);
    }

}


document.getElementById('valor').addEventListener('keydown', () => {

    const valorInserido = document.getElementById('valor').value;
    if (valorInserido > 99999999.99){
        alert('Valor Máximo digitado');
        const inputValor = document.getElementById('valor').value = '';
    }


});

/////////////////////////////

