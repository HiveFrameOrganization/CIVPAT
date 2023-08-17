// Quando a página carregar será feita a requisição para buscar os funcionários cadastrados
window.addEventListener('load', () => {

    retornaFuncionarios();

});

async function retornaFuncionarios() {

    try {
        // Fazendo a requisição para buscar os dados
        const resposta = await fetch(`http://localhost:8080/backend/php/funcionarios/exibirFuncionarios.php`);

        const dados = await resposta.json();

        // Caso retorne algum erro previsto no back-end
        if (dados.status === 'erro') throw new Error(dados.mensagem);

        console.log(dados);

        exibir(dados.usuarios);


    } catch (erro) {
        console.error(erro)
    }
}

function exibir (dados) {
//Selecionando a div que vai ter os funcionário
const exibicao = document.querySelector('#exibicao');

for (funcionario of dados) {
    
    // Criando os elementos
    const nome = document.createElement('p');
    const sobrenome = document.createElement('p');
    const nif = document.createElement('p');
    const email = document.createElement('p');
    const cargo = document.createElement('p');
    const hr = document.createElement('hr');

    // Adicionando conteúdo nos elementos
    nome.textContent = funcionario.Nome;
    sobrenome.textContent = funcionario.Sobrenome;
    email.textContent = funcionario.Email;
    nif.textContent = funcionario.NIF;
    cargo.textContent = funcionario.TipoUser;

    exibicao.appendChild(nif);
    exibicao.appendChild(nome);
    exibicao.appendChild(sobrenome);
    exibicao.appendChild(cargo);
    exibicao.appendChild(email);
    exibicao.appendChild(hr);

}


};