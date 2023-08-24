import { back } from '../Rotas/rotas.js';

const corpoDaPagina = document.querySelector('body');

const botaoSalvarProduto = document.getElementById('salvarProduto');

window.addEventListener('load', () => carregarTecnicos());

botaoSalvarProduto.addEventListener('click', () => salvarProduto());

async function carregarTecnicos () {
    const requisicao = await fetch(back + 'cadastroProduto/carregarTecnicos.php');

    const resposta = await requisicao.json();

    console.log(resposta);

}

async function salvarProduto () {
    idProposta = localStorage.getItem('idProposta');

    const tempoMaquina = document.getElementById('tempoMaquina').value;
    const tempoPessoa = document.getElementById('tempoPessoa').value;
    const unidadeRealizadora = document.getElementById('unidade').value;
    const dataInicial = document.getElementById('dataInicial').value;
    const dataFinal = document.getElementById('dataFinal').value;
    const area = 'metalmecanica';
    const servico = document.getElementById('servico').value;
    const produto = document.getElementById('produto').value;
    const valor = document.getElementById('valor').value;

    const dadosEnviados = {
        tempoMaquina: tempoMaquina,
        tempoPessoa: tempoPessoa,
        unidadeRealizadora: unidadeRealizadora,
        dataInicial: dataInicial,
        dataFinal: dataFinal,
        area: area,
        servico: servico,
        produto: produto,
        valor: valor,
        idProposta: idProposta
    }

    console.log(dadosEnviados);

    try {

        const resposta = await fetch(back + '/cadastroProduto/cadastroProduto.php', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosEnviados)
        });

        const dados = await resposta.json();

        console.log(dados['status']);

        if (dados['status'] == 'success'){
            localStorage.setItem('status', dados['status']);
            localStorage.setItem('mensagem', dados['mensagem']);
        }

        window.location.pathname = '/frontend/pages/detalhesProposta/detalhesProposta.html';
    
    } catch (erro) {

        console.error(`Algum erro aconteceu: ${erro}`);

    }
}