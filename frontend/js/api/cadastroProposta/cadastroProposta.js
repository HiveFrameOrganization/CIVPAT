import { back } from '../Rotas/rotas.js'
const form = document.querySelector('.formulario');
const listaGerentes = document.querySelector('#listaGerentes');

let gerenteEncarregado;


// Ao Carregar a janela é retornado todos os gerentes, e adicionados ao dropdown
export async function dropdownGerentes() {
    let gerentes = await pegarGerentes();

    if (gerentes.retorno === true) {

        // Criação do dropdown
        gerentes.gerentesRetornados.forEach(gerente => {
            const li = document.createElement('li');
            li.textContent = `${gerente.nome} ${gerente.sobrenome[0]}.`;
            li.setAttribute('data-value', gerente.nif);
            listaGerentes.appendChild(li);

            li.addEventListener('click',function () {
                listaGerentes.querySelectorAll('li').forEach(function (linha) {
                    if (linha.classList.contains('gerente-encarregado')) {
                        linha.classList.remove('gerente-encarregado');
                    }
                });

                li.classList.add('gerente-encarregado');
                gerenteEncarregado = li.dataset.value;
            });
        });
    } 
};

// Ao form ser ativado, valida-se os dados e caso valido, envia ao back
form.addEventListener('submit', async evento => {

    evento.preventDefault();

    const nomeProjeto = document.querySelector('#nomeProjeto').value;
    const nomeRepresentante = document.querySelector('#nomeRepresentante').value;
    const emailRepresentante = document.querySelector('#emailRepresentante').value;
    const telefoneRepresentante = document.querySelector('#telefone').value;
    const unidadeCriadora = document.querySelector('unidadeCriadora').value;
    const empresa = document.querySelector('#empresa').value;
    const resumo = document.querySelector('#resumo').value;

    if (gerenteEncarregado === undefined) {
        alert('Selecione um gerente. ');
        return;
    }


    const dadosProj = {
        nomeProjeto: nomeProjeto,
        unidadeCriadora: unidadeCriadora,
        empresa: empresa,
        gerente: gerenteEncarregado
    };

    // Retorna a resposta do back, e se for sucesso, significa que cadastrou
    let resposta = await enviaBackEnd(dadosProj);

    if (resposta.status === 'success') {
        localStorage.setItem('status', resposta.status);
        localStorage.setItem('mensagem', resposta.mensagem);
        window.location.pathname = '/frontend/pages/todasPropostas/todasPropostas.html';
    } else {
        if (resposta.mensagem === 'registro existe') {
            console.log('Proposta não cadastrada. (Nome da proposta já existe)');
        }
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

        return dados;

    } catch(error) {
        console.log('Erro', error);
    }
}

// Função para fazer o cálculo do CNPJ
function validacaoCNPJ(cnpj) {

    // Verificar se o CNPJ possui 14 dígitos após a remoção dos não numéricos
    if (cnpj.length !== 14) {
      return false;
    }
  
    // Calcular o primeiro dígito verificador
    for(let digito = 0; digito < 2; digito++) {

        let sum = 0; let num = 0;

        for (let i = 5 + digito; i > 1; i--) {
          sum += parseInt(cnpj[num]) * i;
          num++;
        }

        for (let i = 9; i > 1; i--) {
            sum += parseInt(cnpj[num]) * i;
            num++;
        }

        // Definição dos digitos validos
        if (digito == 0) {
            var digito1 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        } else {
            var digito2 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        }
    }
    
    if (parseInt(cnpj[12]) !== digito1 || parseInt(cnpj[13]) !== digito2) {
      return false;
    }

    return true;
}