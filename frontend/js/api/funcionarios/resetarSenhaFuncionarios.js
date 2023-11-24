import { back } from "../Rotas/rotas.js";
import alertas from "../../feedback.js"
import { autenticacao } from '../login/autenticacao.js';

const resetSenhaContainer = document.querySelector('#reset-container');

// Função para desativar o usuário
async function resetarSenhaUsuario(nif) {

    const confirmarReset = await Swal.fire({
        title: 'Você tem certeza?',
        text: "A senha será retornada ao padrão",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, resetar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
            if (result.isConfirmed) {
            
                return true;
            }
      })

    if (confirmarReset === true) {
        const autenticado = await autenticacao(['coor'], false)
        if(!autenticado){
            return;
        }

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

            Swal.fire(
                'Sucesso!',
                'A senha foi resetada com sucesso!',
                'success'
              )
    
            resetSenhaContainer.innerHTML = 
            '<span class="font-semibold text-base text-color-green">Senha resetada!</span>';

        } catch (erro) {

            localStorage.setItem("status", "error");
            localStorage.setItem("mensagem", "Erro ao alterar a senha!");

            alertas();

            resetSenhaContainer.innerHTML = `<span class="font-semibold text-base text-color-red">A senha foi não foi resetada!</span>`;
        }
    }
}

export default resetarSenhaUsuario