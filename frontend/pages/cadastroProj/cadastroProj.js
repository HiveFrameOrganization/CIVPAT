
// Pegando o evento de "submit" do formulário
const form = document.querySelector('.formulario');

form.addEventListener('submit', evento => {


    // Pausando o evento para pegar os dados do formulário
    evento.preventDefault();

    // Selecionando os valores presentes nos inputs do formulário HTML
    const nomeProj = document.querySelector('[name="nomeProjeto"]').value;
    const cnpj = document.querySelector('[name="cnpj"]').value;
    const uniCriadora = document.querySelector('[name="uniCriadora"]').value;
    const empresa = document.querySelector('[name="empresa"]').value;

    const dadosProj = {
        nomeProj: nomeProj,
        cnpj: cnpj,
        uniCriadora: uniCriadora,
        empresa: empresa
    }

    let resposta = enviaBackEnd(dadosProj);
    // console.log(resposta)

    // if (resposta == 'Deu certo') {
    //     alert('aaaaaaaaa')
    // } else {
    //     alert('bbbbbbbbb')
    // }
});

async function enviaBackEnd(dadosEnviados) {

    try {
        let resposta = await fetch(`http://localhost:8080/backend/php/cadastroProj/cadastro.php`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosEnviados)
        });

        if (!resposta.ok) {
            throw new Error('Erro na requisição');
        }

        let dados = await resposta.json();

        console.log(dados);
        return dados;

    } catch (error) {
        console.error('Erro', error);
    }
}

await function returnGerentes() {
    try {
        let resposta = fetch('http://localhost:8080/backend/php/cadastroProj/cadastro.php', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosEnviados)
        });

        if (!resposta.ok) {
            throw new Error('Erro na requisição');
        }

        let dados = resposta.json();

        console.log(dados);
        return dados;

    } catch(error) {
        console.log('Erro', error);
    }
}