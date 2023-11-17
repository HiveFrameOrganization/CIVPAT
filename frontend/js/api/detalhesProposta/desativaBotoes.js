import { editandoProposta } from "./detalhesProposta.js"

// DESATIVA BOTÃO DE EDITAR E NOVO PRODUTO QUANDO NAO ESTA MAIS EM ANALISE
export default function desativaBotoes(){
    let declinarProposta = document.querySelector('#declinarProposta')
    // if(localStorage.getItem('statusProposta') == 'Em Análise'){
    //     console.log('em analise ou solicitada')
    // }else{
    //     editandoProposta.setAttribute('disabled', 'true')
    //     editandoProposta.classList.add('disabled:opacity-20')
    //     editandoProposta.classList.remove('hover:bg-btn-blue/40')
    //     editandoProposta.classList.remove('cursor-pointer')
    
    //     let btnNovoProduto = document.querySelector('#btnNovoProduto')
    //     btnNovoProduto.setAttribute('disabled', 'true')
    //     btnNovoProduto.classList.remove('hover:outline')
    //     btnNovoProduto.classList.remove('hover:text-primary')
    //     btnNovoProduto.classList.remove('hover:bg-[transparent]')
    //     btnNovoProduto.classList.add('disabled:opacity-20')

    //     declinarProposta.setAttribute('disabled', 'true')
    //     declinarProposta.classList.add('disabled:opacity-20')
    //     declinarProposta.classList.remove('hover:bg-color-red/40')
    //     declinarProposta.classList.remove('cursor-pointer')
    //     declinarProposta.classList.remove('hover:bg-[transparent]')
    //     declinarProposta.classList.remove('hover:text-color-red')
    // }

    let botaoAceitar = document.querySelector('#aceitarProposta');
    if(localStorage.getItem('statusProposta') == 'Aceito' || localStorage.getItem('statusProposta') == 'Declinado' || localStorage.getItem('statusProposta') == 'Concluido'){
        
        botaoAceitar.parentElement.removeChild(botaoAceitar)
    }

    if(localStorage.getItem('statusProposta') == 'Declinado' || localStorage.getItem('statusProposta') == 'Concluido'){
        let botaoPDF = document.querySelector('#botaoSalvarPdf');

        botaoPDF.parentElement.removeChild(botaoPDF)

        let botaoFollowUp = document.querySelector('#adicionar');
        
        botaoFollowUp.parentElement.removeChild(botaoFollowUp)
    }

    if (localStorage.getItem('statusProposta') == 'Solicitação de Declinio'){

        botaoAceitar.parentElement.removeChild(botaoAceitar)

        // botaoAceitar.setAttribute('disabled', 'true');
        // botaoAceitar.classList.add('disabled:opacity-20');
        // botaoAceitar.classList.remove('hover:bg-btn-blue/40');
        // botaoAceitar.classList.remove('cursor-pointer');
        // botaoAceitar.classList.remove('hover:bg-[transparent]');
        // botaoAceitar.classList.remove('hover:text-color-green')

        editandoProposta.setAttribute('disabled', 'true')
        editandoProposta.classList.add('disabled:opacity-20')
        editandoProposta.classList.remove('hover:bg-btn-blue/40')
        editandoProposta.classList.remove('cursor-pointer')
    } 

    if (localStorage.getItem('statusProposta') == 'Solicitação de Aceite'){
        let botaoAceitar = document.querySelector('#aceitarProposta');
        botaoAceitar.removeAttribute('disabled');
        botaoAceitar.classList.add('disabled:opacity-20');
        botaoAceitar.classList.add('hover:bg-btn-blue/40');
        botaoAceitar.classList.add('cursor-pointer');
        botaoAceitar.classList.add('hover:bg-[transparent]');
        botaoAceitar.classList.add('hover:text-color-green')

        botaoDeclinar.removeAttribute('disabled');
        editandoProposta.removeAttribute('disabled')
        editandoProposta.classList.add('hover:bg-btn-blue/40')
        editandoProposta.classList.add('cursor-pointer')
        botaoDeclinar.classList.add('cursor-pointer')
        botaoDeclinar.classList.add('hover:bg-[transparent]')
        botaoDeclinar.classList.add('hover:text-color-red')

    }
    
}