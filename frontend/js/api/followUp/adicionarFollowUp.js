import { back } from '../Rotas/rotas.js'
import alertas from '../../feedback.js';
import { autenticacao } from '../login/autenticacao.js';
// let liSelected

// Pega data de hoje em yyyy-mm-dd
const hoje = new Date().toISOString().split('T')[0];


const data = document.getElementById('dataFollowUp');
// Determina a data máxima pra hoje
data.max = hoje;
data.addEventListener('input', evento => {
    const dataSelecionada = new Date(data.value);
    if (dataSelecionada > hoje) {
        data.setCustomValidity("A data selecionada não pode ser futura");
    }
});


// pega o elemento de input do próximo follow up
const dataProx = document.getElementById('dataFollowUpProx');
// Determina a data mínima pra hoje
dataProx.min = hoje;
dataProx.addEventListener('input', evento => {
    const dataSelecionada = new Date(dataProx.value);
    if (dataSelecionada < hoje) {
        dataProx.setCustomValidity("A data selecionada não pode ser passada");
    }
});

// Pegando o evento de "submit" do formulário
const form = document.querySelector('#formulario');

// if(dadosEnviados.dataFollowUpProx.length > 10)  dadosEnviados.dataFollowUpProx.slice(0, -1)


form.addEventListener('submit', evento => {

    const dataLimite = new Date('9999-12-31');


    // Pausa o evento para pegar os dados do formulário
    evento.preventDefault();
    // Seleciona os valores presentes nos inputs do formulário HTML
    const dataFollowUp = document.getElementById('dataFollowUp').value;
    const comentario = document.getElementById('comentario').value;
    const dataFollowUpProx = document.getElementById('dataFollowUpProx').value;
    const dataFollowUpInserido = new Date(dataFollowUp);
    const dataFollowUpInseridoProx = new Date(dataFollowUpProx);

    if (dataFollowUpInserido > dataLimite) {
        localStorage.setItem('status', 'error');
        localStorage.setItem('mensagem', 'A data está incorreta.');

        alertas();
    } else if (dataFollowUpInseridoProx > dataLimite) {

        localStorage.setItem('status', 'error');
        localStorage.setItem('mensagem', 'A data está incorreta.');

        alertas();

    } else {

        // Monta um objeto para ser enviado com json pro backend
    const dadosFollow = {
        idProposta: localStorage.getItem('idProposta'),
        dataFollowUp: dataFollowUp,
        comentario: comentario,
        dataFollowUpProx: dataFollowUpProx
    }

    enviaBackEnd(dadosFollow);

    }

    
});

async function enviaBackEnd(dadosEnviados) {
    const autenticado = await autenticacao(['adm', 'coor', 'ger'], false)
    if(!autenticado){
        return;
    }

    try {

        // Envia os dados do front pro Backend
        await fetch(back + `/followUp/postarFollowUp.php`, {
            method: 'POST',
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
