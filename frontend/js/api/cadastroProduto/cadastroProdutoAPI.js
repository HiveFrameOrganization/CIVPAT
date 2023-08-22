async function salvarProduto () {
    idProposta = localStorage.getItem('idProposta');

    const tempoMaquina = document.getElementById('tempoMaquina').value;
    const tempoPessoa = document.getElementById('tempoPessoa').value;
    const unidadeRealizadora = document.getElementById('unidade').value;
    const dataInicial = document.getElementById('dataInicial').value;
    const dataFinal = document.getElementById('dataFinal').value;
    const area = 'metalmecanica';
    const servico = document.getElementById('servico').value;
    const produto = document.getElementById('produto').value;
    const valor = document.getElementById('valor').value;

    const dadosEnviados = {
        tempoMaquina: tempoMaquina,
        tempoPessoa: tempoPessoa,
        unidadeRealizadora: unidadeRealizadora,
        dataInicial: dataInicial,
        dataFinal: dataFinal,
        area: area,
        servico: servico,
        produto: produto,
        valor: valor,
        idProposta: idProposta
    }

    console.log(dadosEnviados);

    try {

        const resposta = await fetch('http://localhost:8080/backend/php/cadastroProduto/cadastroProduto.php', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosEnviados)
        });

        const dados = await resposta.json();

        console.log(dados);
    
    } catch (erro) {

        console.error(`Algum erro aconteceu: ${erro}`);

    }
}