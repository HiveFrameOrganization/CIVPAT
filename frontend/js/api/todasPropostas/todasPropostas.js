window.addEventListener('load', () => {
    pegarTodasAsPropostas()
})

async function pegarTodasAsPropostas () {

    try{
        const resposta = await fetch('http://localhost:8080/backend/php/todasPropostas/todasPropostas.php');
    
        const dados = await resposta.json();

        if (dados.resposta === 'erro') throw new Error(dados.message);

        console.log(dados)

        // console.log(dados.length)  
        
        exibirPropostas(dados.propostas);


    } catch (error){
        console.error(error)
    }

}


exibirPropostas(propostas) {
    for (porposta of propostas) {
        
    }
}