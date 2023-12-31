import validarCNPJ from './validarCNPJ.js';
import validarSGSET from './validarSGSET.js';
import validarEmail from './validarEmail.js';
import { back } from '../Rotas/rotas.js';
import validarNumero from './validarNumero.js';
import { autenticacao } from '../login/autenticacao.js';
import alertas from '../../feedback.js';

export default async function salvarMudancasNaProposta() {


    const idProposta = localStorage.getItem('idProposta');

    //Pegando os valores dos input's para transformalos em objeto
    const cnpj = document.querySelector('#cnpj').value.replace(/\D/g, '');
    const cnpjString = cnpj.toString();
    const empresa = document.querySelector('#empresa').value;
    const uniCriadora = document.querySelector('#uniCriadora').value;
    const funil = document.querySelector('#funil').value;
    const primeiroGerente = document.querySelector('#primeiroGerente').value;
    const segundoGerente = document.querySelector('#segundoGerente').value;
    const numeroSGSET = document.querySelector('#numeroSGSET').value.replace(/\D/g, '');
    const nomeContato = document.querySelector('#nomeContato').value;
    const emailContato = document.querySelector('#emailContato').value;
    const numeroContato = document.querySelector('#numeroContato').value;

    var verificacaoDoCnpj = validarCNPJ(cnpjString);
    var verificacaoDoSGSET = validarSGSET(numeroSGSET);
    var verificacaoDoEmail = validarEmail(emailContato);
    var verificacaoNumero = validarNumero(numeroContato);

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
    } else if (primeiroGerente.toLowerCase() == segundoGerente.toLowerCase()){
        location.reload();

        localStorage.setItem('status', 'error');
        localStorage.setItem('mensagem', 'Mesmo gerente nos dois campos');

        alertas();
    } else if (verificacaoDoEmail == false) {
        location.reload();

        localStorage.setItem('status', 'error');
        localStorage.setItem('mensagem', 'E-mail inválido');

        alertas();
    } else if (verificacaoNumero == false){
        location.reload();

        localStorage.setItem('status', 'error');
        localStorage.setItem('mensagem', 'Número inválido');

        alertas();
    } else {
        const dados = {
            idProposta: idProposta,
            cnpj: (cnpjString == '') ? null : cnpjString,
            empresa: (empresa == '') ? null : empresa,
            uniCriadora: (uniCriadora == '') ? null : uniCriadora,
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

        try {

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
    
        } catch(err) {

            localStorage.setItem('status', 'error');
            localStorage.setItem('mensagem', 'Erro ao salvar!');
        }

        window.location.href = "../../pages/detalhesProposta/detalhesProposta.html";

    }
}