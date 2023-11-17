import { back } from '../Rotas/rotas.js';
import alertas from '../../feedback.js';
import { autenticacao }  from '../login/autenticacao.js';

const formularioProposta = document.querySelector('#formularioProposta');
const listaGerentes = document.querySelector('#listaGerentes');

let gerenteEncarregado;

// Chamando a função quando carregar a página
window.addEventListener('load', async () => {

    if (!autenticacao(['ger', 'coor', 'adm'], false)) {
        localStorage.clear();
        localStorage.setItem('status', 'error');
        localStorage.setItem('mensagem', 'Autenticação inválida, realize o login novamente')

        window.location.pathname = '';
        return;
    }
    let gerentes = await pegarGerentes();

    if (gerentes.retorno === true) {

        // Criação do dropdown
        gerentes.gerentesRetornados.forEach(gerente => {
            const option = document.createElement('option');
            option.textContent = `${gerente.nome} ${gerente.sobrenome[0]}.`;
            option.setAttribute('value', gerente.nif);
            option.classList.add("bg-body");
            listaGerentes.appendChild(option);

        });
    }

});


// Ao form ser ativado, valida-se os dados e caso valido, envia ao back
formularioProposta.addEventListener('submit', async evento => {
    // Parando o evento de enviar o formulário
    evento.preventDefault();

    // Pegando os valores do formulário
    const nomeProjeto = document.querySelector('#nomeProjeto').value.trim();
    const nomeRepresentante = document.querySelector('#nomeRepresentante').value.trim();
    const emailRepresentante = document.querySelector('#emailRepresentante').value;
    const telefoneRepresentante = document.querySelector('#telefone').value;
    const unidadeCriadora = document.querySelector('#unidadeCriadora').value;
    const empresa = document.querySelector('#empresa').value.trim();
    const textoResumo = document.querySelector('#textoResumo').value.trim();
    const gerente = document.querySelector('#listaGerentes').value;

    try {
        // Algumas validações...
        // Verificando se o número de telefone possui algum caractere além de números...
        if (!contemApenasNumeros(telefoneRepresentante)){
            localStorage.setItem('status', 'error');
            localStorage.setItem('mensagem', 'O número de telefone não pode receber algo além de números.');

            alertas();
        } else if (nomeProjeto == '' || nomeRepresentante == '' || empresa == '' || textoResumo == '') {
            localStorage.setItem('status', 'error');
            localStorage.setItem('mensagem', 'Campos não podem conter só espaços');

            alertas();
        } else {
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
    
    
    
            // Retorna a resposta do back, e se for sucesso, significa que cadastrou
            let resposta = await enviaBackEnd(dadosProposta);
    
            if (resposta.status === 'success') {
                localStorage.setItem('status', resposta.status);
                localStorage.setItem('mensagem', resposta.mensagem);
                localStorage.setItem('historico', resposta.historico);
                sessionStorage.removeItem('qtdBotoesProposta');
                window.location.href = '';
            } else {

                if (resposta.mensagem == 'Registro existe') {

                    localStorage.setItem('status', resposta.status);
                    localStorage.setItem('mensagem', 'O título da proposta já existe!');
                    alertas()
                }
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

        return dados;

    } catch (error) {
        console.log('Erro', error);
    }
}

/*------------------------------------------- FUNÇÕES PARA VALIDAR ALGUMAS COISAS --------------------------------------------------------------*/

function contemApenasNumeros(string) {
    return /^\d+$/.test(string);
}