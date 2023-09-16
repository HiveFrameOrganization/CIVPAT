import { back } from "../Rotas/rotas.js";
import retornaFuncionarios from "./pegarFuncionarios.js";

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
    
            // Convertendo a requisição em um objeto JS
            const resposta = await requisicao.json();
    
            // Caso a resposta do servidor sej algum erro já previsto...
            if (resposta.status === 'erro') throw new Error(resposta.mensagem);
    
    
            // Atualizando a lista em tempo real
            retornaFuncionarios();
    
            resetSenhaContainer.innerHTML = 
            '<span class="font-semibold text-base text-color-green">Senha resetada!</span>';
        } catch (erro) {
            console.error(erro);
            resetSenhaContainer.innerHTML = `<span class="font-semibold text-base text-color-red">${erro}</span>`;
        }
    }
}

export default resetarSenhaUsuario