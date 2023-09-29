import { back } from '../Rotas/rotas.js';
import alertas from '../../feedback.js';


const botaoLancarHora = document.getElementById('lancarHoras');

botaoLancarHora.addEventListener('click', () => {
    lancarHoraParaOTecnico();
})


async function lancarHoraParaOTecnico () {
    const horaPessoa = document.getElementById('horaPessoaParaLancar').value;
    const horaMaquina = document.getElementById('horaMaquinaParaLancar').value;
    const nifTecnico = document.getElementById('tecnicos').value;
    const idProduto = localStorage.getItem('idProduto');
    
    const dataLancamento = document.getElementById('dataDoLancamento').value;

    if (horaPessoa == 0 && horaMaquina == 0){
        localStorage.setItem('status', 'error');
        localStorage.setItem('mensagem', 'Não pode lançar horas zeradas para os 2 campos');

        alertas();
    } else if (dataLancamento == '') {
        localStorage.setItem('status', 'error');
        localStorage.setItem('mensagem', 'Informe uma data para o lançamento da data');

        alertas();
    } else {
        const dadosEnviados = {
            horaPessoa: (horaPessoa == null) ? 0 : horaPessoa ,
            horaMaquina: (horaMaquina == null) ? 0 : horaMaquina,
            dataLancamento: dataLancamento,
            nifTecnico : nifTecnico,
            idProduto: idProduto
        }
    
        const requisicao = await fetch (back + '/lancarHorasEsquecidas/lancarHorasEsquecidas.php', {
            method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dadosEnviados)
        });
    
        const resposta = await requisicao.json();
        localStorage.setItem('status', resposta.status);
        localStorage.setItem('mensagem', resposta.mensagem);
    
        if (resposta.status == 'success'){
            window.location.href = '../lancarHorasEsquecidas/lancarHorasEsquecidas.html';
        } else {
            alertas();
        }

    }


}
