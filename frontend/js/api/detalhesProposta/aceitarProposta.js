import { back } from "../Rotas/rotas.js";
import alertas from "../../feedback.js";

export default async function aceitarProposta() {

    const baixarPdfOrcamento = document.getElementsByClassName('sumirOrcamento')[0];
    const baixarPdfPropostaAssinada = document.getElementsByClassName('sumirPropostaAssinada')[0];

    for (let i = 0; i < document.getElementsByClassName('p-2 text-lg').length; i++) {
        console.log(document.getElementsByClassName('p-2 text-lg')[i].value + document.getElementsByClassName('p-2 text-lg')[i].value == "")
    }

    for (let i = 0; i < document.getElementsByClassName('px-2').length; i++) {
        console.log(document.getElementsByClassName('px-2')[i].value + document.getElementsByClassName('px-2')[i].value == "")
    }

    if (baixarPdfOrcamento.classList.contains('hidden') || baixarPdfPropostaAssinada.classList.contains("hidden")) {
        localStorage.setItem('status', 'error');
        localStorage.setItem('mensagem', 'PDFs obrigatórios não preenchidos');
        alertas();

    } else {
        const idProposta = localStorage.getItem('idProposta');

        // criando uma variável para enviar a lista para o php, transformando o string em objeto json
        const requisicao = await fetch(back + `/detalhesProposta/aceitarProposta.php?id=${idProposta}`);

        const resposta = await requisicao.json();

        localStorage.setItem('status', resposta.status);
        localStorage.setItem('mensagem', resposta.mensagem);

        if (resposta.status == 'error') {
            alertas('Errado');
        } else {
            window.location.href = '/frontend/pages/Home/index.html';
        }

    }
 
}
