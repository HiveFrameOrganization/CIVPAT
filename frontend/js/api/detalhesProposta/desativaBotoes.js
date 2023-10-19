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
    }

    if(localStorage.getItem('statusProposta') == 'Aceito' || localStorage.getItem('statusProposta') == 'Declinado' || localStorage.getItem('statusProposta') == 'Concluido'){
        let botaoAceitar = document.querySelector('#aceitarProposta');
        botaoAceitar.setAttribute('disabled', 'true');
        botaoAceitar.classList.add('disabled:opacity-20');
        botaoAceitar.classList.remove('hover:bg-btn-blue/40');
        botaoAceitar.classList.remove('cursor-pointer');
    }

    
}