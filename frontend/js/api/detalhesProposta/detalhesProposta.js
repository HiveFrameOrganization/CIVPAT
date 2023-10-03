import salvarMudancasNaProposta from './salvarMudancasNaProposta.js';
import pegarUnidadesCriadoras from './pegarUnidadesCriadoras.js';
import verificarPdfExistente from './verificarPDFExistente.js';
import declinarPropostaBanco from './declinarPropostaBanco.js';
import verificarBancoProposta from './verificarProposta.js';
import carregarProdutos from './carregarProdutos.js';
import aceitarProposta from './aceitarProposta.js';
import  alertas  from '../../feedback.js';
import { back } from '../Rotas/rotas.js';
import baixarPdf from './baixarPDF.js';

// Ao carregar a pagina essa função irá pegar o id do local Storage para verificar no banco e trazer as informações
window.addEventListener('load', () => {
    const idProposta = localStorage.getItem('idProposta');

    // Levar o valor do id do local Storage atravez da função para o back end
    verificarBancoProposta(idProposta);
    verificarPdfExistente(idProposta);
    carregarProdutos(idProposta);
    pegarUnidadesCriadoras();
    alertas();
})

const botaoSalvarPdf = document.getElementById('botaoSalvarPdf');

botaoSalvarPdf.addEventListener('click', () => {
    // Pegar o id da proposta salvo no localstorage
    const identificador = localStorage.getItem('idProposta');

    // Obter o arquivo PDF selecionado pelo usuário
    const pdfOrcamento = document.getElementById('orcamento').files[0];
    const pdfPropostaAssinada = document.getElementById('propostaAssinada').files[0];
    const pdfRelatorioFinal = document.getElementById('relatorioFinal').files[0];
    const pdfPesquisaDeSatisfacao = document.getElementById('pesquisaDeSatisfacao').files[0];

    console.log(pdfOrcamento);

    if (pdfOrcamento != null && pdfOrcamento != undefined) {

        document.getElementById('inputFileUpOrcamento').placeholder =  pdfOrcamento.name;
    } 
    if (pdfPropostaAssinada != null && pdfPropostaAssinada != undefined) {
        document.getElementById('inputFileUpPropostaAssinada').placeholder = pdfPropostaAssinada.name;
    }
    if (pdfRelatorioFinal != null && pdfRelatorioFinal != undefined) {
        document.getElementById('inputRelatorioFinal').placeholder = pdfRelatorioFinal.name;
    }
    if (pdfPesquisaDeSatisfacao != null && pdfPesquisaDeSatisfacao != undefined) {
        document.getElementById('inputPesquisaDeSaisfacao').placeholder = pdfPesquisaDeSatisfacao.name;
    }


    if (pdfOrcamento == undefined && pdfPropostaAssinada == undefined && pdfRelatorioFinal == undefined && pdfPesquisaDeSatisfacao == undefined) {
        localStorage.setItem('status', 'error');
        localStorage.setItem('mensagem', 'Campos vazios');

        alertas();
    } else {
        
        
        // Criar um objeto FormData e adicionar o arquivo PDF a ele
        // formdata serve para mandar dados e arquivos facilmente por via api
        // usado para enviar dados do cliente para o servidor, especialmente 
        // quando se envia um formulário HTML através de uma requisição AJAX
        var formData = new FormData();
    
        //inserindo o pdf dentro do objeto formdata
        formData.append('pdfOrcamento', pdfOrcamento);
        formData.append('pdfPropostaAssinada', pdfPropostaAssinada);
        formData.append('pdfRelatorioFinal', pdfRelatorioFinal);
        formData.append('pdfPesquisaDeSatisfacao', pdfPesquisaDeSatisfacao);
    
        // formData.forEach((valor, chave) => {
        //     console.log(`${chave}: ${valor}`);
        //   });
    
        // Enviar o formulário como uma solicitação POST usando fetch
        fetch(back + `/PDF/salvarPdf.php?id=${identificador}`, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(json => {
    
                localStorage.setItem('status', json.status);
                localStorage.setItem('mensagem', json.mensagem);
                window.location.href = '../../pages/detalhesProposta/detalhesProposta.html';
                
                verificarPdfExistente(identificador);
            })
            .catch(error => {
                console.error('Erro ao salvar o PDF:', error);
            });

    }
})

const botaoOrcamento = document.getElementById('botaoOrcamento');
botaoOrcamento.addEventListener('click', () => {
    baixarPdf(1);
});

const botaoPropostaAssinada = document.getElementById('botaoPropostaAssinada');
botaoPropostaAssinada.addEventListener('click', () => {
    baixarPdf(2)
});

const botaoRelatorioFinal = document.getElementById('botaoRelatorioFinal');
botaoRelatorioFinal.addEventListener('click', () => {
    baixarPdf(3)
});

const botaoPesquisaDeSatisfacao = document.getElementById('botaoPesquisaDeSatisfacao');
botaoPesquisaDeSatisfacao.addEventListener('click', () => {
    baixarPdf(4)
});

export const editandoProposta = document.querySelector('#editarProposta');
editandoProposta.addEventListener('click', () => {

    
    // Mudando estado do botão
    let estadoInput = document.querySelectorAll('.estadoInput')
    if (editandoProposta.value == 'EDITAR') {
        editandoProposta.value = 'SALVAR'

        for (let i = 0; i < estadoInput.length; i++) {
            estadoInput[i].removeAttribute('disabled')
        }
    } else {
        salvarMudancasNaProposta();
        
        editandoProposta.value = 'EDITAR'

        // DESATIVA OU ATIVA OS INPUTS PARA EDIÇÃO DA PROPOSTA
        for (let i = 0; i < estadoInput.length; i++) {
            estadoInput[i].setAttribute('disabled', 'true')
        }
    }


});

const aceitarPropostaButton = document.getElementById('aceitarProposta');
const declinarPropostaButton = document.getElementById('declinarProposta');
const orcamentoInput = document.getElementById('orcamento');
const propostaAssinadaInput = document.getElementById('propostaAssinada');

// Executando a função 'aceitarProposta'.

aceitarPropostaButton.addEventListener('click', () => {
    try {
        aceitarProposta()
    } catch (error) {
        console.log(error)
    }
})

declinarPropostaButton.addEventListener('click', () => {
    try {
        declinarPropostaBanco()
    } catch (error) {
        console.log(error)
    }
})

const botaoDeclinarProposta = document.getElementById('declinarProposta');

botaoDeclinarProposta.addEventListener('click', () => {
    declinarPropostaBanco();
})

// abrir modal de cadastro de produto
document.querySelector('#btnNovoProduto').addEventListener('click', ()=>{
    
})

// Modal de varias etapas de cadastro de produto
let primerioCadastroProduto = document.querySelector('#primerioCadastroProduto')
let segundoCadastroProduto = document.querySelector('#segundoCadastroProduto')
let paraPrimeiroModal = document.querySelector('#paraPrimeiroModal')
let paraSegundoModal = document.querySelector('#paraSegundoModal')
let tempo = document.getElementById('tempoMaquina')

paraSegundoModal.addEventListener('click', ()=>{
    primerioCadastroProduto.classList.add('hidden')
    segundoCadastroProduto.classList.remove('hidden')

    console.log(tempo.value)
    if(tempo.value == ''){
        tempo.setAttribute('type', 'text')
        tempo.value = 'Nenhuma maquina selecionada'
        tempo.classList.add('text-[90%]')
        tempo.setAttribute('readonly', 'true')
        tempo.classList.add('bg-component')
        tempo.classList.add('cursor-default')
        tempo.classList.remove('focus:outline-primary')
    }else{
        tempo.value = ''
        tempo.setAttribute('type', 'number')
        tempo.classList.remove('text-[90%]')
        tempo.setAttribute('readonly', 'false')
        tempo.classList.remove('bg-component')
        tempo.classList.remove('cursor-default')
        tempo.classList.add('focus:outline-primary')
    }
})

paraPrimeiroModal.addEventListener('click', ()=>{
    primerioCadastroProduto.classList.remove('hidden')
    segundoCadastroProduto.classList.add('hidden')
})

// abre aba para mostrar resumo
let abaResumo = document.querySelector('#abaResumo')
document.querySelector('#btnResumo').addEventListener('click', ()=>{
    if(abaResumo.classList.contains('h-24')){
        abaResumo.classList.remove('h-24')
        abaResumo.classList.add('h-0')        
    }else{
        abaResumo.classList.add('h-24')
        abaResumo.classList.remove('h-0')
    }
})
