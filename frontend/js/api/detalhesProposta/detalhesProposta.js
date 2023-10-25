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
window.addEventListener('load', async () => {
    const idProposta = localStorage.getItem('idProposta');

    // Levar o valor do id do local Storage atravez da função para o back end
    verificarBancoProposta(idProposta);
    verificarPdfExistente(idProposta);
    pegarUnidadesCriadoras();


    if (await carregarProdutos(idProposta) === false) {
        document.getElementById('propostas').innerHTML = `
        <div class='flex flex-col justify-center items-center gap-4'>
            <svg width="67" height="68" viewBox="0 0 67 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M33.5004 67.4168C32.6115 67.4168 31.7643 67.2502 30.9587 66.9168C30.1532 66.5835 29.4171 66.1113 28.7504 65.5002L2.00041 38.7502C1.3893 38.0835 0.917074 37.3474 0.58374 36.5418C0.250407 35.7363 0.0837402 34.8891 0.0837402 34.0002C0.0837402 33.1113 0.250407 32.2502 0.58374 31.4168C0.917074 30.5835 1.3893 29.8613 2.00041 29.2502L28.7504 2.50016C29.4171 1.8335 30.1532 1.34739 30.9587 1.04183C31.7643 0.736274 32.6115 0.583496 33.5004 0.583496C34.3893 0.583496 35.2504 0.736274 36.0837 1.04183C36.9171 1.34739 37.6393 1.8335 38.2504 2.50016L65.0004 29.2502C65.6671 29.8613 66.1532 30.5835 66.4587 31.4168C66.7643 32.2502 66.9171 33.1113 66.9171 34.0002C66.9171 34.8891 66.7643 35.7363 66.4587 36.5418C66.1532 37.3474 65.6671 38.0835 65.0004 38.7502L38.2504 65.5002C37.6393 66.1113 36.9171 66.5835 36.0837 66.9168C35.2504 67.2502 34.3893 67.4168 33.5004 67.4168ZM33.5004 60.7502L60.2504 34.0002L33.5004 7.25016L6.75041 34.0002L33.5004 60.7502ZM30.1671 37.3335H36.8337V17.3335H30.1671V37.3335ZM33.5004 47.3335C34.4449 47.3335 35.2365 47.0141 35.8754 46.3752C36.5143 45.7363 36.8337 44.9446 36.8337 44.0002C36.8337 43.0557 36.5143 42.2641 35.8754 41.6252C35.2365 40.9863 34.4449 40.6668 33.5004 40.6668C32.556 40.6668 31.7643 40.9863 31.1254 41.6252C30.4865 42.2641 30.1671 43.0557 30.1671 44.0002C30.1671 44.9446 30.4865 45.7363 31.1254 46.3752C31.7643 47.0141 32.556 47.3335 33.5004 47.3335Z" fill="#f54a4c"/>
            </svg>
            <h2 class='font-bold text-color-text text-center'>OPA, UM ERRO ACONTECEU AO BUSCAR OS PRODUTOS</h2>
        </div>
        `;

        return;
    }

    alertas();
})

document.getElementById('orcamento').addEventListener('change', () => {
    nomeDoArquivoPdfNoInput('orcamento', 'inputFileUpOrcamento');
});

document.getElementById('propostaAssinada').addEventListener('change', () => {
    nomeDoArquivoPdfNoInput('propostaAssinada', 'inputFileUpPropostaAssinada');
});

document.getElementById('relatorioFinal').addEventListener('change', () => {
    nomeDoArquivoPdfNoInput('relatorioFinal', 'inputRelatorioFinal');
});

document.getElementById('pesquisaDeSatisfacao').addEventListener('change', () => {
    nomeDoArquivoPdfNoInput('pesquisaDeSatisfacao','inputPesquisaDeSaisfacao');
});


function nomeDoArquivoPdfNoInput(inputAondeSobreOArquivo, inputAondeTemOPlaceholder) { 
    const pegandoInput = document.getElementById(inputAondeSobreOArquivo);
    const campoComPlaceholder = document.getElementById(inputAondeTemOPlaceholder);
    const arquivoEstaNoInput = pegandoInput.files[0];

    if (arquivoEstaNoInput) {
        campoComPlaceholder.setAttribute('placeholder', arquivoEstaNoInput.name);
        console.log(arquivoEstaNoInput);
    }
}

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
        
        console.log(formData);
    
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
        modalConfirmar(true)
        // aceitarProposta()
    } catch (error) {
        console.log(error)
    }
})

declinarPropostaButton.addEventListener('click', () => {
    try {
        modalConfirmar(false)
        // declinarPropostaBanco()
    } catch (error) {
        console.log(error)
    }
})

// const botaoDeclinarProposta = document.getElementById('declinarProposta');

// botaoDeclinarProposta.addEventListener('click', () => {
//     declinarPropostaBanco();
// })

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
    localStorage.setItem('maquina', document.getElementById('maquinas').value);

    let maquina = localStorage.getItem('maquina');

    primerioCadastroProduto.classList.add('hidden')
    segundoCadastroProduto.classList.remove('hidden')

    if(maquina == 1){
        tempo.setAttribute('type', 'text')
        tempo.value = 'Nenhuma máquina selecionada'
        tempo.classList.add('text-[90%]')
        tempo.setAttribute('readonly', 'true')
        tempo.classList.add('bg-component')
        tempo.classList.add('cursor-default')
        tempo.classList.remove('focus:outline-primary')
    }else{
        tempo.setAttribute('type', 'number')
        tempo.classList.remove('text-[90%]')
        tempo.removeAttribute('readonly')
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

// MODAL DE CONFIRMAÇÃO PARA DECLINIO E ACEITAÇÃO DE PROPOSTA
const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
function modalConfirmar(fun){

    let cnpj = document.querySelector('#cnpj').value
    let data = document.querySelector('#dataPrimeiroProduto').value
    let sgset = document.querySelector('#numeroSGSET').value

    console.log(cnpj)
    console.log(localStorage.getItem('cargo') == 'ger' ? 'gerente' : 'nao é gerente')
    console.log(sgset)
    const camposObrigatorios = document.querySelectorAll('.campoObrigatorio')

    if(localStorage.getItem('cargo') != 'ger' && cnpj && sgset == '' ){
    
        Toast.fire({
            icon: 'error',
            title: 'Preencha todos os campos obrigatorios em vermelho!'
        })

        if(cnpj == ''){
            camposObrigatorios[0].classList.add('bg-color-red/20')
            camposObrigatorios[0].classList.add('outline')
            camposObrigatorios[0].classList.add('outline-1')
            camposObrigatorios[0].classList.add('outline-[red]')
            camposObrigatorios[0].classList.remove('disabled:bg-body')
        }
        if(sgset == ''){
            camposObrigatorios[1].classList.add('bg-color-red/20')
            camposObrigatorios[1].classList.add('outline')
            camposObrigatorios[1].classList.add('outline-1')
            camposObrigatorios[1].classList.add('outline-[red]')
            camposObrigatorios[1].classList.remove('disabled:bg-body')
        }

    }else if(localStorage.getItem('cargo') == 'ger' && cnpj == ''){
    
        Toast.fire({
            icon: 'error',
            title: 'Preencha todos os campos obrigatorios em vermelho!'
        })

        camposObrigatorios[0].classList.add('bg-color-red/20')
        camposObrigatorios[0].classList.add('outline')
        camposObrigatorios[0].classList.add('outline-1')
        camposObrigatorios[0].classList.add('outline-[red]')
        camposObrigatorios[0].classList.remove('disabled:bg-body')
        
    }else if(data == ''){
    
        Toast.fire({
            icon: 'error',
            title: 'Cadastre algum produto para poder aceitar a proposta!'
        })
    }else{
        const div = document.createElement('div');
        const aside = document.createElement('aside');

        div.classList = 'bg-component w-[600px] max-w-[90%] rounded-md py-4 sm:py-8 fixed z-10 right-1/2 left-1/2 -translate-x-1/2 top-1/2 bottom-1/2 -translate-y-1/2 h-max';
        aside.classList = 'bg-[black] opacity-50 w-full h-screen fixed top-0'

        const templateModalConfirmar = `
        <div class="modal-header flex justify-between items-start mb-8 px-4 sm:px-8">
            <div>
                <h2 class="text-2xl font-bold text-red">${fun ? 'DESEJA ACEITAR A PROPOSTA?' : 'DESEJA DECLINAR A PROPOSTA?'}</h2>
                <h3 class="text-xs font-normal"><strong class="text-color-red">Confirme sua escolha!</strong></h3>
            </div>
            <button id="close-modal-confirmar" type="button" class="p-1 hover:bg-primary/20 transition-colors rounded-full w-10 h-10"><img src="../../img/icon/x.svg" alt="Fechar" class="w-full"></button>
        </div>
        <div class="modal-body">
            <div class="px-4 sm:px-8 flex justify-between">
                <button id="btn-confirmar" value="yes" type="button" class="bg-color-green py-2 px-6 text-[#fff] rounded-md text-xs font-semibold border border-color-green hover:bg-[transparent] hover:text-color-green transition-colors">CONFIRMAR</button>
                <button id="btn-cancelar" value="no" type="button" class="bg-color-red py-2 px-6 text-[#fff] rounded-md text-xs font-semibold border border-color-red hover:bg-[transparent] hover:text-color-red transition-colors">CANCELAR</button>
            </div>
        </div>
        `;

        
        div.innerHTML = templateModalConfirmar;
        
        document.body.appendChild(div);
        document.body.appendChild(aside)
        
        // CHAMA FUNÇAO PARA ACEITAR PROPOSTA OU DECLINAR PROPOSTA
        if(fun){
            document.querySelector('#btn-confirmar').addEventListener('click', ()=>{
                aceitarProposta()
            })
        }else{
            document.querySelector('#btn-confirmar').addEventListener('click', ()=>{
                declinarPropostaBanco()
            })
        }

        // APAGAR ELEMENTOS DE MODAL
        aside.addEventListener('click', ()=>{
            document.body.removeChild(div)
            document.body.removeChild(aside)
        })
        document.querySelector('#close-modal-confirmar').addEventListener('click', ()=>{
            document.body.removeChild(div)
            document.body.removeChild(aside)
        })
        document.querySelector('#btn-cancelar').addEventListener('click', ()=>{
            document.body.removeChild(div)
            document.body.removeChild(aside)
        })
    }

}