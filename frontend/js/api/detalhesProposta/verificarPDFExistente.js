import { back } from '../Rotas/rotas.js';

export default async function  verificarPdfExistente(idProposta) {
    try {

        // Cria a requisição 
        const requisicao = await fetch(back + `/PDF/verificarPdfExistente.php?id=${idProposta}`)

        // // Verificando se deu erro ao fazer a requisição
        // if (requisicao.ok == false) {
            
        //     localStorage.setItem('status', 'error');
        //     localStorage.setItem("mensagem", "Opa, um erro aconteceu ao verificar os PDF's existentes!");

        //     return;
        // }

        // recebe a resposta do servidor
        const resposta = await requisicao.json();

        console.log(resposta);

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

        localStorage.setItem('status', 'error');
        localStorage.setItem("mensagem", "Opa, um erro aconteceu ao verificar os PDF's existentes!");

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