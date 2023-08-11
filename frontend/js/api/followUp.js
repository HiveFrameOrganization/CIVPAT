let liSelected

function getStatus() {
    const select = document.getElementById('funil');

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
            li.value = index + 1;     // Adiciona o valor do option
            li.textContent = status[0];     // Adiciona o texto do option
            li.addEventListener('click', (e) => {
                liSelected = e.target.value
            });
            select.appendChild(li); // Adiciona o option ao select
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Pegando o evento de "submit" do formulário
const form = document.querySelector('#formulario');

form.addEventListener('submit', evento => {
    // Pausando o evento para pegar os dados do formulário
    evento.preventDefault();
    if (liSelected == undefined) {
        alert("Por favor, selecione um Status")
    } else {
        // Selecionando os valores presentes nos inputs do formulário HTML
        const funil = liSelected;
        const dataUp = document.getElementById('dataUp').value;
        const comentario = document.getElementById('comentario').value;

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
        const resposta = await fetch(`http://localhost:8080/backend/php/followUp/postarFollow.php`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosEnviados)
        });

        if (!resposta.ok) {
            throw new Error('Erro na requisição');
        }

        const dados = await resposta.json();

        console.log(dados);

    } catch (error) {
        console.error('Erro', error);
    }
}
