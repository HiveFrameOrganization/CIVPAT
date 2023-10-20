import { back } from "../Rotas/rotas.js";
import alertas from "../../feedback.js"

const resetSenhaContainer = document.querySelector('#reset-container');

// Função para desativar o usuário
async function resetarSenhaUsuario(nif) {

    const confirmarReset = confirm('Confirmar reset de senha?');

    if (confirmarReset === true) {

        try {
            const requisicao = await fetch(back + `/funcionarios/resetarSenha.php`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nif: nif })
            });

            if(!requisicao.ok){

                
                localStorage.setItem("status", "error");
                localStorage.setItem("mensagem", "Erro ao alterar a senha!");

                alertas();
                return;
            }
            
            // Convertendo a requisição em um objeto JS
            const resposta = await requisicao.json();
    
            resetSenhaContainer.innerHTML = 
            '<span class="font-semibold text-base text-color-green">Senha resetada!</span>';

        } catch (erro) {

            resetSenhaContainer.innerHTML = `<span class="font-semibold text-base text-color-red">${String(erro).replace('Error: ', '')}</span>`;
        }
    }
}

export default resetarSenhaUsuario