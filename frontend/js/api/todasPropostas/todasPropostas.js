window.addEventListener('load', () => {
    // ao carregar a página, a função irá executar
    pegarTodasAsPropostas()
})

async function pegarTodasAsPropostas () {

    try{
        // link da requisição
        const resposta = await fetch('http://localhost:8080/backend/php/todasPropostas/todasPropostas.php');
        
        // dados de todas as propostar recebidas (resposta da api)
        const dados = await resposta.json();

        // caso a requisição de um erro, irá exibir uma mensagem de erro
        if (dados.resposta === 'erro') throw new Error(dados.message);

        console.log(dados);  
        
        exibirPropostas(dados.propostas);

        // Adicionando a quanntidade de propostas de acordo com os seus status
        document.getElementById('analise').innerHTML ='Projetos Em Análise: ' + dados['Em Análise'];
        document.getElementById('aceitos').innerHTML ='Projetos Aceitos: ' + dados['Aceito'];
        document.getElementById('declinados').innerHTML ='Projetos Declinados: ' + dados['Declinado'];
        document.getElementById('concluidos').innerHTML ='Projetos em Concluídos: ' + dados['Concluido'];

    } catch (error){
        console.error(error)
    }

}


function exibirPropostas(propostas){

    // selecionando a div dos botões
    const botoes = document.getElementById('botoes');

    // limpando os possíveis elementos que possam estar na div
    botoes.innerHTML = '';

    for (let proposta of propostas) {
        // criando o botão da proposta
        const botao = document.createElement('button');

        // adicionando o valor ao botão da proposta
        botao.value = proposta.idProposta;
        botao.innerHTML = proposta.TituloProj;

        botao.onclick = () => {
            localStorage.setItem('idProposta', botao.value);
            window.location.href = '../detalhesProposta/detalhesProposta.html';
        }

        botoes.appendChild(botao);

    }
};