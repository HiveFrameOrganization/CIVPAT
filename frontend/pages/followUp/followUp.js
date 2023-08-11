function getStatus() {
    fetch(`http://localhost:8080/backend/php/followUp/getStatus.php`,
    {method: 'GET'})
    .then(response => {
        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status} ${response.statusText}`);
        }
        return response.json(); // Assuming you are expecting JSON data
    })
    .then(data => {
        function decodeEntities(encodedString) {
            let parser = new DOMParser();
            let dom = parser.parseFromString('<!doctype html><body>' + encodedString, 'text/html');
            return dom.body.textContent;
        }
        
        // Create a new object with the decoded data
        let decodedData = {};
        for (let key in data) {
            decodedData[key] = decodeEntities(data[key]);
        }
        alert(data['1'])
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Pegando o evento de "submit" do formulário
const form = document.querySelector('#formulario');

// function postFollowUp() {
//     // Pausando o evento para pegar os dados do formulário
//     evento.preventDefault();

//     // Selecionando os valores presentes nos inputs do formulário HTML
//     const nomeProj = document.getElementsByName('nomeProjeto');
//     const cnpj = document.getElementsByName('cnpj');
//     const uniCriadora = document.getElementsByName('uniCriadora');
//     const empresa = document.getElementsByName('empresa');

//     const dadosProj = {
//         nomeProj: nomeProj,
//         cnpj: cnpj,
//         uniCriadora: uniCriadora,
//         empresa: empresa
//     }

//     enviaBackEnd(dadosProj);

//     if (dadosProj == 'Deu certo') {
//         alert('aaaaaaaaa')
//     } else {
//         alert('bbbbbbbbb')
//     }
// }
