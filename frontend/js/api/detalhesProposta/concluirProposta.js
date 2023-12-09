import { back } from "../Rotas/rotas.js";
import alertas from "../../feedback.js";

export default async function concluirProposta() {

    const baixarPdfOrcamento = document.getElementsByClassName('sumirOrcamento')[0];
    const baixarPdfPropostaAssinada = document.getElementsByClassName('sumirPropostaAssinada')[0];
    const baixarPdfRelatorioFinal = document.getElementsByClassName('sumirRelatorioFinal')[0];
    const baixarPdfPesquisaDeSatisfacao = document.getElementsByClassName('sumirPesquisaDeSatisfacao')[0];
    let aceitar = true;
    let pdfObrigatorio = !baixarPdfOrcamento.classList.contains('hidden') 
    && !baixarPdfPropostaAssinada.classList.contains("hidden") && !baixarPdfRelatorioFinal.classList.contains("hidden") && !baixarPdfPesquisaDeSatisfacao.classList.contains("hidden");

    if (aceitar) {
        for (let i = 0; i < document.getElementsByClassName('p-2 text-lg').length; i++) {
            if (i != 5 && i != 6) {
                const result = document.getElementsByClassName('p-2 text-lg')[i].value != ""
                if(!result) {
                    aceitar = result
                    break
                }
            }   
        }
    }

    if (aceitar) {
        for (let i = 0; i < document.getElementsByClassName('px-2').length; i++) {
            if (i != 2) {
                const result = document.getElementsByClassName('px-2')[i].value != ""
                if(!result) {
                    aceitar = result
                    break
                }
            }
        }
    }


    if (aceitar && pdfObrigatorio) {

        const botaoConcluir = document.getElementById('concluirProposta');
        const idProposta = localStorage.getItem('idProposta');
        const tipoConclusao = (botaoConcluir.value == 'CONCLUIR') ? 'Concluido' : 'Solicitação de conclusão';

        // criando uma variável para enviar a lista para o php, transformando o string em objeto json
        const requisicao = await fetch(back + `/detalhesProposta/concluirProposta.php?id=${idProposta}&tipoConclusao=${tipoConclusao}`);

        const resposta = await requisicao.json();

        console.log(resposta);

        localStorage.setItem('status', resposta.status);
        localStorage.setItem('mensagem', resposta.mensagem);

        if (resposta.status == 'error') {
            alertas('Errado');
        } else {
            window.location.href = '/frontend/pages/Home/index.html';
        }
    } else {
        let espera = 0

        if(!pdfObrigatorio) {
            localStorage.setItem('status', 'error');
            localStorage.setItem('mensagem', 'PDFs obrigatórios não preenchidos');
            alertas();
            espera = 2000
        }

        setTimeout(() => {
            if(!aceitar) {
                localStorage.setItem('status', 'error');
                localStorage.setItem('mensagem', 'Campos obrigatórios não preenchidos');
                alertas();
            }
        }, espera)
    }
    
}

const botaoConcluir = document.getElementById('concluirProposta');

botaoConcluir.addEventListener('click', () => {
    Swal.fire({
        title: `${localStorage.getItem('cargo') == 'ger' ? 'Solicitar conclusão?' : 'Concluir proposta?'}`,
        icon: 'info',
        text: 'Você não poderá reverter isso!',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: `${localStorage.getItem('cargo') == 'ger' ? 'Sim, solicitar' : 'Sim, concluir'}`,
        cancelButtonText: 'Cancelar'
    }).then((result) => {

        result.isConfirmed && concluirProposta();
    });
});
