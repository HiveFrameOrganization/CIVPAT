import { editandoProposta } from "./detalhesProposta.js"

// DESATIVA BOTÃO DE EDITAR E NOVO PRODUTO QUANDO NAO ESTA MAIS EM ANALISE
export default function desativaBotoes(){
    let declinarProposta = document.querySelector('#declinarProposta')
    if(localStorage.getItem('statusProposta') == 'Em Análise' || localStorage.getItem('statusProposta') == 'Solicitação de Aceite'){
        console.log('em analise ou solicitada')
    }else{
        editandoProposta.setAttribute('disabled', 'true')
        editandoProposta.classList.add('disabled:opacity-20')
        editandoProposta.classList.remove('hover:bg-btn-blue/40')
        editandoProposta.classList.remove('cursor-pointer')
    
        let btnNovoProduto = document.querySelector('#btnNovoProduto')
        btnNovoProduto.setAttribute('disabled', 'true')
        btnNovoProduto.classList.remove('hover:outline')
        btnNovoProduto.classList.remove('hover:text-primary')
        btnNovoProduto.classList.remove('hover:bg-[transparent]')
        btnNovoProduto.classList.add('disabled:opacity-20')

        declinarProposta.setAttribute('disabled', 'true')
        declinarProposta.classList.add('disabled:opacity-20')
        declinarProposta.classList.remove('hover:bg-color-red/40')
        declinarProposta.classList.remove('cursor-pointer')
        declinarProposta.classList.remove('hover:bg-[transparent]')
        declinarProposta.classList.remove('hover:text-color-red')
    }

    if(localStorage.getItem('statusProposta') == 'Aceito' || localStorage.getItem('statusProposta') == 'Declinado' || localStorage.getItem('statusProposta') == 'Concluido'){
        let botaoAceitar = document.querySelector('#aceitarProposta');
        botaoAceitar.setAttribute('disabled', 'true');
        botaoAceitar.classList.add('disabled:opacity-20');
        botaoAceitar.classList.remove('hover:bg-btn-blue/40');
        botaoAceitar.classList.remove('cursor-pointer');
        botaoAceitar.classList.remove('hover:bg-[transparent]');
        botaoAceitar.classList.remove('hover:text-color-green')

        let botaoSalvar = document.querySelector('#editarProposta');
        botaoSalvar.classList.remove('hover:text-primary');
        botaoSalvar.classList.remove('hover:bg-[transparent]')
    }

    if(localStorage.getItem('statusProposta') == 'Declinado' || localStorage.getItem('statusProposta') == 'Concluido'){
        let botaoPDF = document.querySelector('#botaoSalvarPdf');
        botaoPDF.setAttribute('disabled', 'true');
        botaoPDF.classList.add('disabled:opacity-20');
        botaoPDF.classList.remove('hover:outline')
        botaoPDF.classList.remove('hover:text-primary')
        botaoPDF.classList.remove('hover:bg-btn-blue/40');
        botaoPDF.classList.remove('hover:bg-[transparent]')
        botaoPDF.classList.remove('cursor-pointer');

        let botaoFollowUp = document.querySelector('#adicionar');
        botaoFollowUp.setAttribute('disabled', 'true');
        botaoFollowUp.classList.add('disabled:opacity-20');
        botaoFollowUp.classList.remove('hover:outline')
        botaoFollowUp.classList.remove('hover:text-primary')
        botaoFollowUp.classList.remove('hover:bg-btn-blue/40');
        botaoFollowUp.classList.remove('hover:bg-[transparent]')
        botaoFollowUp.classList.remove('cursor-pointer');
    }

    
}