import { back } from '../Rotas/rotas.js';

const corpoDaPagina = document.querySelector('body');

const botaoSalvarProduto = document.getElementById('salvarProduto');

window.addEventListener('load', () => carregarTecnicos());

window.addEventListener('load', () => pegarUnidadesCriadoras());

botaoSalvarProduto.addEventListener('click', () => salvarProduto());

async function carregarTecnicos () {
    const requisicao = await fetch(back + '/cadastroProduto/carregarTecnicos.php', {
        methods : 'GET'
    });

    const resposta = await requisicao.json();

    const opcoesTecnicos = document.getElementById('tecnicos');

    for (var i = 0; i < resposta.length; i++) {
        var optionElement = document.createElement("option");
        optionElement.value = resposta[i + 1];
        optionElement.textContent = resposta[i];
        opcoesTecnicos.appendChild(optionElement);

        i += 1;
    }

}

async function salvarProduto () {
    const idProposta = localStorage.getItem('idProposta');

    const tempoMaquina = document.getElementById('tempoMaquina').value;
    const tempoPessoa = document.getElementById('tempoPessoa').value;
    const unidadeRealizadora = document.getElementById('unidade').value;
    const dataInicial = document.getElementById('dataInicial').value;
    const dataFinal = document.getElementById('dataFinal').value;
    const area = 'metalmecanica';
    const servico = document.getElementById('servico').value;
    const produto = document.getElementById('produto').value;
    const valor = document.getElementById('valor').value;
    const nifTecnico = document.getElementById('tecnicos').value;

    if (!tempoMaquina || !tempoPessoa || !unidadeRealizadora || !dataInicial || !dataFinal || !servico || !produto || !valor || !nifTecnico ) {
        alert('Por favor, preencha todos os campos obrigatórios.');
    } else {
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
            idProposta: idProposta,
            nifTecnico: nifTecnico
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
        
}


async function pegarUnidadesCriadoras() {
    
    const unidadesSelect = document.getElementById('unidadeCriadora');

    const requisicao = await fetch (back + '/todasPropostas/PegarUnidadesCriadoras.php');

    // dados de todas as propostar recebidas (resposta da api)
    const dados = await requisicao.json();

    console.log(dados);
    
    // caso a requisição de um erro, irá exibir uma mensagem de erro
    if (dados.resposta === 'erro') throw new Error(dados.message);

    for (let i = 0; i < dados.length; i++) {
        let option = document.createElement('option');
        option.value = dados[i].idUnidadeCriadora;
        option.textContent = dados[i].UnidadeCriadora;
        unidadesSelect.appendChild(option);
    }

    console.log(dados);

}
