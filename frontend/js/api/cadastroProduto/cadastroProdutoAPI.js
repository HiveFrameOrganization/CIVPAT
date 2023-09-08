import { back } from '../Rotas/rotas.js';
import alertas from '../../feedback.js';

const corpoDaPagina = document.querySelector('body');

const botaoSalvarProduto = document.getElementById('salvarProduto');

window.addEventListener('load', () => {

    // Função para carregar os técnicos no dropdown
    carregarTecnicos();

    // Função para carregar as máquinas
    carregarMaquinas();


});

// window.addEventListener('load', () => pegarUnidadesCriadoras());

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

     // Obter a data atual
    var dataAtual = new Date();
    var dataLimite = new Date('9999-12-31');

    

    const tempoMaquina = document.getElementById('tempoMaquina').value;
    const tempoPessoa = document.getElementById('tempoPessoa').value;
    const unidadeRealizadora = document.getElementById('unidadeCriadora').value;
    const dataInicial = document.getElementById('dataInicial').value;
    const dataFinal = document.getElementById('dataFinal').value;
    const area = 'metalmecanica';
    const servico = document.getElementById('servico').value;
    const produto = document.getElementById('produto').value;
    const valor = document.getElementById('valor').value;
    const nifTecnico = document.getElementById('tecnicos').value;
    const maquina = document.getElementById('maquinas').value;

    // Obter a data inserida pelo usuário
    var dataInicialInserida = new Date(dataInicial);
    var dataFinalInserida = new Date(dataFinal);

    if (!tempoMaquina || !tempoPessoa || !unidadeRealizadora || !dataInicial || !dataFinal || !servico || !produto || !valor || !nifTecnico || !maquina ) {
        localStorage.setItem('status', 'error');
        localStorage.setItem('mensagem', 'Preencha todos os campos');

        alertas();
        
    } else if (tempoMaquina < 1 || tempoPessoa < 1 || valor < 1){
        localStorage.setItem('status', 'error');
        localStorage.setItem('mensagem', 'Proibido valores menores que 1');

        alertas();
    } else if (dataInicialInserida < dataAtual){
        localStorage.setItem('status', 'error');
        localStorage.setItem('mensagem', 'Data inicial inserida ja passou');

        alertas();
    } else if (dataFinalInserida < dataInicialInserida){
        localStorage.setItem('status', 'error');
        localStorage.setItem('mensagem', 'Data final não pode ser antes da data inicial');

        alertas();
    }   else if (dataInicialInserida > dataLimite) {
        localStorage.setItem('status', 'error');
        localStorage.setItem('mensagem', 'Data inicial fora do limite');

        alertas();
    } else if (dataFinalInserida > dataLimite) {
        localStorage.setItem('status', 'error');
        localStorage.setItem('mensagem', 'Data final fora do limite');

        alertas();
    }
    
    else {
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
            nifTecnico: nifTecnico,
            maquina: Number(maquina)
        }
    
    
        try {
    
            const resposta = await fetch(back + '/cadastroProduto/cadastroProduto.php', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dadosEnviados)
            });
    
            const dados = await resposta.json();


    
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

async function carregarMaquinas() {

    try {

        const requisicao = await fetch(back + '/cadastroProduto/carregarMaquinas.php');

        const resposta = await requisicao.json();

        // Caso ocorra algum erro previsto no back-end
        if(resposta.status === 'error') throw new Error(resposta.mensagem);

        exibirMaquinas(resposta.maquinas)

    } catch(erro) {
        console.error(erro);
    }

}

function exibirMaquinas(vetor) {
    
    // Selecionando o dropdown que vai guardar as máquinas
    const maquinas = document.querySelector('#maquinas');

    for(let maquina of vetor) {

        // Criando cada opção do meu dropdown
        const option = document.createElement('option');

        // Colocando o valor da máquina
        option.value = maquina.idMaquina;

        // Colocando o nome da máquina
        option.textContent = maquina.Maquina;

        // Jogando dentro do dropdown
        maquinas.appendChild(option);

    }

}
