let liSelected

const data = document.getElementById('dataUp');

// Pega data de hoje em yyyy-mm-dd
const hoje = new Date().toISOString().split('T')[0];

// Determina a data máxima pra hoje
data.max = hoje;
data.addEventListener('input', evento => {
    if (data.value > hoje) {
        data.setCustomValidity("A data selecionada não pode ser futura");
    }
});

const select = document.getElementById('funil');
// Acessa o backend para pegar os status do funil
fetch(`http://localhost:8080/backend/php/followUp/pegarStatus.php`, {method: 'GET'})
.then(response => {
    if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status} ${response.statusText}`);
    }
    return response.json();
})
.then(data => {
    // Loop para criar os options
    data.forEach((status, index) => {
        const li = document.createElement('li');
        li.value = index + 1; // Adiciona o valor do option (É um número devido ao fk_idStatusFunil)
        li.textContent = status[0];     // Adiciona o texto do option (Para poder ser visto na tela)
        li.addEventListener('click', (e) => {
            liSelected = e.target.value
        });
        select.appendChild(li); // Adiciona o option ao select
    });
})
.catch(error => {
    console.error('Error:', error);
});

// Pegando o evento de "submit" do formulário
const form = document.querySelector('#formulario');

form.addEventListener('submit', evento => {
    // Pausa o evento para pegar os dados do formulário
    evento.preventDefault();
    if (liSelected == undefined) {
        alert("Por favor, selecione um Status")
    } else {
        // Seleciona os valores presentes nos inputs do formulário HTML
        const funil = liSelected;
        const dataUp = document.getElementById('dataUp').value;
        const comentario = document.getElementById('comentario').value;

        // Monta um objeto para ser enviado com json pro backend
        const dadosFollow = {
            dataUp: dataUp,
            comentario: comentario,
            funil: funil
        }
        enviaBackEnd(dadosFollow);
    }
});

async function enviaBackEnd(dadosEnviados) {
    try {
        // Envia os dados do front pro Backend
        await fetch(`http://localhost:8080/backend/php/followUp/postarFollow.php`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosEnviados)
        })
        .then(response => response.json())
        .then(data => {
            // Mostra a mensagem e o status no console
            console.log(data.mensagem);
            console.log(data.status);
        }).catch(error => {
            console.error('Erro no processamento dos dados', error);
        });;
    } catch (error) {
        console.error('Erro no Fetch', error);
    }
}
