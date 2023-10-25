import { back } from '../Rotas/rotas.js';
import alertas from '../../feedback.js';


const botaoLancarHora = document.getElementById('lancarHoras');

botaoLancarHora.addEventListener('click', () => {
    lancarHoraParaOTecnico();
})

async function setarData(dadosEnviados) {

    try {

        const requisicao = await fetch (back + '/lancarHorasEsquecidas/lancarHorasEsquecidas.php', {
            method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dadosEnviados)
        });
    
        if (!requisicao.ok) {
    
            return false;
        }
    
        const resposta = await requisicao.json();

        return resposta;

    } catch(err) {

        return false;
    }
}

async function lancarHoraParaOTecnico () {
    const id = localStorage.getItem('idProduto');
    try{
        
    
        const horaPessoa = document.getElementById('horaPessoaParaLancar').value;
        const horaMaquina = document.getElementById('horaMaquinaParaLancar').value;
        const nifTecnico = document.getElementById('tecnicos').value;
        const idProduto = localStorage.getItem('idProduto');
        
        const dataLancamento = document.getElementById('dataDoLancamento').value;
        
        
        
        const exibirHoras = await fetch(back + `/detalhesProduto/lancamentoHoras.php?id=${id}&Data=${dataLancamento}`);
            const resposta = await exibirHoras.json();


        console.log(resposta)
        const horasRestantes = 10 - resposta.horasDiariasPessoas;
        const horasRestantesMaquina = 10 - resposta.horasDiariasMaquina;



        if (horaPessoa > horasRestantes || horaMaquina > horasRestantesMaquina) {
            localStorage.setItem('status', 'error');
            localStorage.setItem('mensagem', `Não pode lançar horas com valores superiores de (${horasRestantes}) para Tecnico ou (${horasRestantesMaquina}) para maquina`);
            alertas();
        } else {
          
            if (horaPessoa == 0 && horaMaquina == 0){
                localStorage.setItem('status', 'error');
                localStorage.setItem('mensagem', 'Não pode lançar horas zeradas para os 2 campos');
    
                alertas();
                
        
            }
            else if (dataLancamento == '') {
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
    
                const resposta = await setarData(dadosEnviados);
    
                if (resposta === false) {
    
                    localStorage.setItem("status", "error");
                    localStorage.setItem("mensagem", "Erro ao lançar as horas, tente novamente!");
            
                    alertas();
    
                    return;
                }
    
                localStorage.setItem('status', resposta.status);
                localStorage.setItem('mensagem', resposta.mensagem);
            
                if (resposta.status == 'success'){
                    window.location.href = '../lancarHorasEsquecidas/lancarHorasEsquecidas.html';
                } else {
                    alertas();
                }
    
            }
        }
    

    }catch (error) {
        console.error(error)
    }


   
}
