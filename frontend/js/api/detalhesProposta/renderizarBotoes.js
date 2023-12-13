import { aplicarFuncoes } from "./funcoesBotoes.js";

export function renderizarBotoes() {
    /**
     * Renderizar os botões (aceitar, editar, declinar e concluir) da proposta condicionalmente
     */

    const botoesArea = document.getElementById('area-botoes');
    const statusProposta = localStorage.getItem('statusProposta').toLowerCase();
    const usuario = localStorage.getItem('cargo');

    if (statusProposta == 'em análise') {

        botoesArea.innerHTML = `
        <div class="flex gap-5 flex-col sm:flex-row mb-5">
            <input
                aria-label="Aceitar proposta"
                class="bg-color-green py-2 px-12 text-[#fff] rounded-md text-xs font-semibold border border-color-green hover:bg-[transparent] hover:text-color-green transition-colors cursor-pointer"
                type="button" value="${usuario == 'ger' ? 'SOLICITAR ACEITE' : 'ACEITAR'}" id="aceitarProposta">

            <input
                aria-label="Editar proposta"
                class="bg-color-gray py-2 px-12 text-[#fff] rounded-md text-xs font-semibold border border-color-gray hover:bg-[transparent] hover:text-color-gray transition-colors cursor-pointer"
                type="button" value="EDITAR" id="editarProposta">

        </div>
        <div>
            <input       
                aria-label="Declinar proposta"
                class="bg-color-red w-full py-2 px-12 text-[#fff] rounded-md text-xs font-semibold border border-color-red hover:bg-[transparent] hover:text-color-red transition-colors cursor-pointer"
                type="button" value="${usuario == 'ger' ? 'SOLICITAR DECLÍNIO' : 'DECLINAR'}" id="declinarProposta">
        </div>`;
    } else if (statusProposta == 'aceito') {

        botoesArea.innerHTML = `
        <div class="flex gap-5 flex-col sm:flex-row mb-5">
            <input aria-label="Concluir proposta" type="button" id="concluirProposta" class="bg-primary py-2 px-12 text-[#fff] rounded-md text-xs font-semibold border border-primary hover:bg-[transparent] hover:text-primary transition-colors cursor-pointer" value="${usuario == 'ger' ? 'SOLICITAR CONCLUSÃO' : 'CONCLUIR'}">
        </div>`;
    } else if (statusProposta == 'concluido' || statusProposta == 'declinado') {

        botoesArea.innerHTML = '';
    } else if (statusProposta == 'solicitação de aceite') {

        if (usuario == 'ger') {

            botoesArea.innerHTML = '';
        } else {

            botoesArea.innerHTML = `
            <div class="flex gap-5 flex-col sm:flex-row mb-5">
                <input
                    aria-label="Aceitar proposta"
                    class="bg-color-green py-2 px-12 text-[#fff] rounded-md text-xs font-semibold border border-color-green hover:bg-[transparent] hover:text-color-green transition-colors cursor-pointer"
                    type="button" value="${usuario == 'ger' ? 'SOLICITAR ACEITE' : 'ACEITAR'}" id="aceitarProposta">
            </div>`;
        }
    } else if (statusProposta == 'solicitação de declinio') {

        if (usuario == 'ger') {

            botoesArea.innerHTML = '';
        } else {

            botoesArea.innerHTML = `
            <div class="flex gap-5 flex-col sm:flex-row mb-5">
                <input       
                    aria-label="Declinar proposta"
                    class="bg-color-red w-full py-2 px-12 text-[#fff] rounded-md text-xs font-semibold border border-color-red hover:bg-[transparent] hover:text-color-red transition-colors cursor-pointer"
                    type="button" value="${usuario == 'ger' ? 'SOLICITAR DECLÍNIO' : 'DECLINAR'}" id="declinarProposta">
            </div>`;
        }
    } else if (statusProposta == 'solicitação de conclusão') {

        if (usuario == 'ger') {

            botoesArea.innerHTML = '';
        } else {

            botoesArea.innerHTML = `
            <div class="flex gap-5 flex-col sm:flex-row mb-5">
                <input aria-label="Concluir proposta" type="button" id="concluirProposta" class="bg-primary py-2 px-12 text-[#fff] rounded-md text-xs font-semibold border border-primary hover:bg-[transparent] hover:text-primary transition-colors cursor-pointer" value="${usuario == 'ger' ? 'SOLICITAR CONCLUSÃO' : 'CONCLUIR'}">
            </div>`;
        }
    }

    aplicarFuncoes();
}
