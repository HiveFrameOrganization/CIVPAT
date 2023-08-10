
// Pegando o evento de "submit" do formulário
const form = document.querySelector('.formulario');

form.addEventListener('submit', evento => {


    // Pausando o evento para pegar os dados do formulário
    evento.preventDefault();

    // Selecionando os valores presentes nos inputs do formulário HTML
    const nomeProj = document.getElementsByName('nomeProjeto');
    const cnpj = document.getElementsByName('cnpj');
    const uniCriadora = document.getElementsByName('uniCriadora');
    const empresa = document.getElementsByName('empresa');

    const dadosProj = {
        nomeProj: nomeProj,
        cnpj: cnpj,
        uniCriadora: uniCriadora,
        empresa: empresa
    }

    enviaBackEnd(dadosProj);

    if (dadosProj == 'Deu certo') {
        alert('aaaaaaaaa')
    } else {
        alert('bbbbbbbbb')
    }
});

async function enviaBackEnd(dadosEnviados) {


    try {
        const resposta = await fetch(`http://localhost:8080/backend/php/cadastroProj/cadastro.php`, {
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

        alert(dados.mensagem);

    } catch (error) {
        console.error('Erro', error);
    }
}