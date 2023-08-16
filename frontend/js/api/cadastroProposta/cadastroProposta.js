const form = document.querySelector('.formulario');
const listaGerentes = document.querySelector('#listaGerentes');

var gerenteEncarregado;

window.onload = async function () {
    var gerentes = await returnGerentes();

    if (gerentes.retorno === true) {
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

form.addEventListener('submit', async evento => {

    evento.preventDefault();

    const nomeProj = document.querySelector('[name="nomeProjeto"]').value;
    const cnpj = document.querySelector('[name="cnpj"]').value;
    const uniCriadora = document.querySelector('[name="uniCriadora"]').value;
    const empresa = document.querySelector('[name="empresa"]').value;

    if (gerenteEncarregado === undefined) {
        alert('Selecione um gerente.');
        return
    }

    const dadosProj = {
        nomeProj: nomeProj,
        cnpj: cnpj,
        uniCriadora: uniCriadora,
        empresa: empresa,
        gerente: gerenteEncarregado
    }

    console.log(dadosProj)

    // lenMinimo = [10, 14, 3, 3];

    // for (let key in dadosProj) {
    //     valor = dadosProj[key];

    //     if (valor.length > letMinimo)
    // }

    let resposta = await enviaBackEnd(dadosProj);

    console.log(resposta)

    if (resposta.retorno === true) {
        console.log('Proposta cadastrada.');
    } else {
        if (resposta.mensagem === 'registro existe') {
            console.log('Proposta não cadastrada. (Nome da proposta já existe)');
        }
    }
});

async function enviaBackEnd(dadosEnviados) {
    try {
        let resposta = await fetch(`http://localhost:8080/backend/php/cadastroProposta/cadastro.php`, {
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

        return dados;

    } catch (error) {
        console.error('Erro', error);
    }
}

async function returnGerentes() {
    try {
        let resposta = await fetch('http://localhost:8080/backend/php/cadastroProposta/returnGerentes.php', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!resposta.ok) {
            throw new Error('Erro na requisição');
        }

        let dados = await resposta.json();

        return dados;

    } catch(error) {
        console.log('Erro', error);
    }
}