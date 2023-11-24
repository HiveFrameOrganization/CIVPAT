import { back } from "../Rotas/rotas.js";
import alertas from "../../feedback.js";
import { autenticacao } from '../login/autenticacao.js';

export default async function aceitarProposta() {
    const autenticado = await autenticacao(['adm', 'coor', 'ger'], false)
    if(!autenticado){
        return;
    }

    const baixarPdfOrcamento = document.getElementsByClassName('sumirOrcamento')[0];
    const baixarPdfPropostaAssinada = document.getElementsByClassName('sumirPropostaAssinada')[0];
    let aceitar = true;
    let pdfObrigatorio = !baixarPdfOrcamento.classList.contains('hidden') 
    && !baixarPdfPropostaAssinada.classList.contains("hidden")

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

    console.log(pdfObrigatorio)
    if (aceitar && pdfObrigatorio) {
        const botaoAceitar = document.getElementById('aceitarProposta');
        const idProposta = localStorage.getItem('idProposta');
        const tipoAceite = (botaoAceitar.value == 'ACEITAR') ? 'Aceito' : 'Solicitação de Aceite';

        // criando uma variável para enviar a lista para o php, transformando o string em objeto json
        const requisicao = await fetch(back + `/detalhesProposta/aceitarProposta.php?id=${idProposta}&tipoAceite=${tipoAceite}`);

        const resposta = await requisicao.json();

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
