import { back } from '../Rotas/rotas.js';
import { autenticacao } from '../login/autenticacao.js';

export default async function  verificarPdfExistente(idProposta) {
    const autenticado = await autenticacao(['adm', 'coor', 'ger'], false)
    if(!autenticado){
        return;
    }

    try {

        // Cria a requisição 
        const requisicao = await fetch(back + `/PDF/verificarPdfExistente.php?id=${idProposta}`)


        // recebe a resposta do servidor
        const resposta = await requisicao.json();


        // Loop para verificar para cada tipo de PDF se a proposta possui aquele tipo de PDF ja salvo
        for (const chave in resposta) {
            const valor = resposta[chave];

            if (valor == true) {
                // Se o PDF do tipo for encontrado, tirará o disable do botão para baixar
                document.getElementById(chave).disabled = false;
            } else {
                // Se o PDF não for encontrado, o botão ficará em disabled
                document.getElementById(chave).disabled = true;
            }
        }
    } catch (error) {
        console.error(error) 
        return;
    }

    // sumir o botão se nao ouver pdf no banco
    if (document.querySelector('#botaoOrcamento').disabled == false) {
        document.querySelector('.sumirOrcamento').classList.remove('hidden')
    }
    if (document.querySelector('#botaoPropostaAssinada').disabled == false) {
        document.querySelector('.sumirPropostaAssinada').classList.remove('hidden')
    }
    if (document.querySelector('#botaoRelatorioFinal').disabled == false) {
        document.querySelector('.sumirRelatorioFinal').classList.remove('hidden')
    }
    if (document.querySelector('#botaoPesquisaDeSatisfacao').disabled == false) {
        document.querySelector('.sumirPesquisaDeSatisfacao').classList.remove('hidden')
    }
}