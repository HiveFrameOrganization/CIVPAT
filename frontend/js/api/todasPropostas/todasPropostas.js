window.addEventListener('load', () => {
    pegasTodasAsPropostas()
})

async function pegasTodasAsPropostas () {

    try{
        const resposta = await fetch('http://localhost:8080/backend/php/todasPropostas/todasPropostas.php');
    
        const dados = await resposta.json();

        if (dados.resposta === 'erro') throw new Error(dados.message);

        console.log(dados)

    } catch (error){
        console.error(error)
    }

}