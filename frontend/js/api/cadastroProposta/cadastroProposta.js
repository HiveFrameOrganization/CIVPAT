import { back } from '../Rotas/rotas.js'
const form = document.querySelector('.formulario');
const listaGerentes = document.querySelector('#listaGerentes');

let gerenteEncarregado;

// Chamando a função quando carregar a página
window.addEventListener('load', dropdownGerentes)

// Ao Carregar a janela é retornado todos os gerentes, e adicionados ao dropdown
async function dropdownGerentes() {
    let gerentes = await pegarGerentes();

    console.log(gerentes.gerentesRetornados);

    if (gerentes.retorno === true) {

        // Criação do dropdown
        gerentes.gerentesRetornados.forEach(gerente => {
            const option = document.createElement('option');
            option.textContent = `${gerente.nome} ${gerente.sobrenome[0]}.`;
            option.setAttribute('value', gerente.nif);
            listaGerentes.appendChild(option);

        });
    }
};

// Ao form ser ativado, valida-se os dados e caso valido, envia ao back
form.addEventListener('submit', async evento => {

    // Parando o evento de enviar o formulário
    evento.preventDefault();

    // Pegando os valores do formulário
    const nomeProjeto = document.querySelector('#nomeProjeto').value;
    const nomeRepresentante = document.querySelector('#nomeRepresentante').value;
    const emailRepresentante = document.querySelector('#emailRepresentante').value;
    const telefoneRepresentante = document.querySelector('#telefone').value;
    const unidadeCriadora = document.querySelector('#unidadeCriadora').value;
    const empresa = document.querySelector('#empresa').value;
    const textoResumo = document.querySelector('#textoResumo').value;
    const gerente = document.querySelector('#listaGerentes').value;

    try {

        // Algumas validações...

        // Verificando se o número de telefone possui algum caractere além de números...
        if (!contemApenasNumeros(telefoneRepresentante)) throw new Error('O NÚMERO DE TELEFONE NÃO PODE RECEBERE ALGO ALÉM DE NÚMEROS...');

        const dadosProposta = {
            nomeProjeto: nomeProjeto,
            representante: nomeRepresentante,
            emailRepresentante: emailRepresentante,
            telefoneRepresentante: telefoneRepresentante,
            resumo: textoResumo,
            unidadeCriadora: unidadeCriadora,
            empresa: empresa,
            gerente: gerente
        };

        console.log(dadosProposta);

        // Retorna a resposta do back, e se for sucesso, significa que cadastrou
        let resposta = await enviaBackEnd(dadosProposta);

        if (resposta.status === 'success') {
            localStorage.setItem('status', resposta.status);
            localStorage.setItem('mensagem', resposta.mensagem);
            window.location.pathname = '/frontend/pages/todasPropostas/todasPropostas.html';
        } else {
            if (resposta.mensagem === 'registro existe') {
                console.log('Proposta não cadastrada. (Nome da proposta já existe)');
            }
        }

    } catch (erro) {
        console.error(erro);
    }

});

// Envia os dados contido no argumento para o back
async function enviaBackEnd(dadosEnviados) {
    try {
        let resposta = await fetch(back + `/cadastroProposta/cadastroProposta.php`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosEnviados)
        });

        // Caso a requisição NÃO seja bem sucedida é jogado um erro
        if (!resposta.ok) {
            throw new Error('Erro na requisição');
        }

        let dados = await resposta.json();
        console.log(dados);

        // Retorna 'sucesso' ou 'erro'
        return dados;

    } catch (error) {
        console.error('Erro', error);
    }
}

// Funcao para retornar o nome, sobrenome e NIF dos gerentes
async function pegarGerentes() {
    try {
        let resposta = await fetch(back + '/cadastroProposta/pegarGerentes.php', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!resposta.ok) {
            throw new Error('Erro na requisição');
        }

        // JSON de nome, sobrenome e NIF
        let dados = await resposta.json();

        console.log(dados);
        return dados;

    } catch (error) {
        console.log('Erro', error);
    }
}

/*------------------------------------------- FUNÇÕES PARA VALIDAR ALGUMAS COISAS --------------------------------------------------------------*/

function contemApenasNumeros(string) {
    return /^\d+$/.test(string);
}