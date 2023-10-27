import validarCNPJ from './validarCNPJ.js';
import validarSGSET from './validarSGSET.js';
import { back } from '../Rotas/rotas.js';

export default async function salvarMudancasNaProposta() {
    const idProposta = localStorage.getItem('idProposta');

    //Pegando os valores dos input's para transformalos em objeto
    const nomeProposta = document.querySelector('#tituloProposta').value;
    const statusProposta = document.querySelector('#statusProposta').value;
    const criadorProposta = document.querySelector('#criadorProposta').value;
    const cnpj = document.querySelector('#cnpj').value.replace(/\D/g, '');
    const cnpjString = cnpj.toString();
    const empresa = document.querySelector('#empresa').value;
    const uniCriadora = document.querySelector('#uniCriadora').value;
    const dataInicio = document.querySelector('#dataPrimeiroProduto').value;
    const dataFim = document.querySelector('#dataUltimoProduto').value;
    const valor = parseFloat(document.querySelector('#valorTotalProdutos').value.replace(/\R/g, '').replace(/\$/g, '').replace(/\./g, '').replace(/\s/g, ''));
    const funil = document.querySelector('#funil').value;
    const primeiroGerente = document.querySelector('#primeiroGerente').value;
    const segundoGerente = document.querySelector('#segundoGerente').value;
    const numeroSGSET = document.querySelector('#numeroSGSET').value.replace(/\D/g, '');
    const nomeContato = document.querySelector('#nomeContato').value;
    const emailContato = document.querySelector('#emailContato').value;
    const numeroContato = document.querySelector('#numeroContato').value;

    var verificacaoDoCnpj = validarCNPJ(cnpjString);
    var verificacaoDoSGSET = validarSGSET(numeroSGSET);

    if (verificacaoDoCnpj == false) {
        location.reload();

        localStorage.setItem('status', 'error');
        localStorage.setItem('mensagem', 'CNPJ inválido');

        alertas();

    } else if (verificacaoDoSGSET == false) {
        location.reload();

        localStorage.setItem('status', 'error');
        localStorage.setItem('mensagem', 'SGSET inválido');

        alertas();
    } else if (primeiroGerente == segundoGerente){
        localStorage.setItem('status', 'error');
        localStorage.setItem('mensagem', 'Mesmo gerente nos dois campos');

        alertas();
    } else {
        const dados = {
            idProposta: idProposta,
            nomeProposta: (nomeProposta == '') ? null : nomeProposta,
            statusProposta: (statusProposta == '') ? null : statusProposta,
            criadorProposta: (criadorProposta == '') ? null : criadorProposta,
            cnpj: (cnpjString == '') ? null : cnpjString,
            empresa: (empresa == '') ? null : empresa,
            uniCriadora: (uniCriadora == '') ? null : uniCriadora,
            dataInicio: (dataInicio == '') ? null : dataInicio,
            dataFim: (dataFim == '') ? null : dataFim,
            valor: (valor == '') ? null : valor,
            funil: (funil == '') ? null : funil,
            primeiroGerenteAntigo: localStorage.getItem('gerente1'),
            segundoGerenteAntigo: localStorage.getItem('gerente2'),
            primeiroGerenteNovo: (primeiroGerente == '') ? null : primeiroGerente,
            segundoGerenteNovo: (segundoGerente == '') ? null : segundoGerente,
            numeroSGSET: (numeroSGSET == '') ? null : numeroSGSET,
            nomeContato: (nomeContato == '') ? null : nomeContato,
            emailContato: (emailContato == '') ? null : emailContato,
            numeroContato: (numeroContato == '') ? null : numeroContato,
            idRepresentante: sessionStorage.getItem('idRepresentante')
        }

        const requisicao = await fetch(back + '/detalhesProposta/postDetalhesProposta.php', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(dados)
        })

        const resposta = await requisicao.json();

        localStorage.setItem('status', resposta.status);
        localStorage.setItem('mensagem', resposta.mensagem);

        if (resposta.status == 'success'){
            window.location.href = "../../pages/detalhesProposta/detalhesProposta.html";

        }
    }
}