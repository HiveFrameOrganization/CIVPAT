import { back } from '../Rotas/rotas.js'
import { autenticacao } from '../login/autenticacao.js';
// let liSelected

// Pegando o evento de "submit" do formulário
const form = document.querySelector('#formularioeditar');

form.addEventListener('submit', evento => {
    // Pausa o evento para pegar os dados do formulário
    evento.preventDefault();
    // Seleciona os valores presentes nos inputs do formulário HTML
    const comentario = document.getElementById('comentarioEdit').value;
    const idFollowUp = document.getElementById('idFollowUpModal').textContent;

    // Monta um objeto para ser enviado com json pro backend
    const dadosFollow = {
        idFollowUp: idFollowUp,
        comentario: comentario
    }
    enviaBackEnd(dadosFollow);
});

async function enviaBackEnd(dadosEnviados) {
    const autenticado = await autenticacao(['adm', 'coor', 'ger'], false)
    if(!autenticado){
        return;
    }

    try {
        // Envia os dados do front pro Backend
        await fetch(back + `/followUp/atualizarFollowUp.php`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosEnviados)
        })
        .then(response => response.json())
        .then(data => {
            // Mostra a mensagem e o status no console
            localStorage.setItem('status', data.status);
            localStorage.setItem('mensagem', data.mensagem);
            if (data.status != 'Erro') {
                window.location.pathname = '/frontend/pages/detalhesProposta/detalhesProposta.html';
            }
        }).catch(error => {
            console.error('Erro no processamento dos dados', error);
        });
    } catch (error) {
        console.error('Erro no Fetch', error);
    }
}
