import { back } from "../Rotas/rotas.js";
import alertas from "../../feedback.js";
import { autenticacao } from '../login/autenticacao.js';

window.addEventListener('load', () => {
    LancamentoHoras();
})

var horasRestantes;
var horasRestantesMaquina;

async function LancamentoHoras() {
    const autenticado = await autenticacao(['tec'], false)
    if(!autenticado){
        return;
    }

    const id = localStorage.getItem('idProduto');

    try {
        const exibirHoras = await fetch(back + `/detalhesProduto/lancamentoHoras.php?id=${id}`)

        const resposta = await exibirHoras.json();


        if (localStorage.getItem('cargo') == 'tec') {

            // PESSOAS

            if (resposta['horaTotalPessoa'] == undefined) {
                document.querySelector('#horasPessoa').value = localStorage.getItem('tempoPessoa');
            } else {
                document.querySelector('#horasPessoa').value = resposta['horaTotalPessoa'];
            }

            // verificando se existem horas acumuladas
            if (resposta['horasAcumuladasPessoa'] == undefined) {
                document.querySelector("#horasPessoaAcumuladas").value = 0;
            } else {
                document.querySelector("#horasPessoaAcumuladas").value = resposta['horasAcumuladasPessoa'];
            }

            // MAQUINAS

            if (localStorage.getItem('tempoMaquina') != 0) {
                if (resposta['horaTotalMaquina'] == undefined) {
                    setTimeout(renderizaHoraMaquina, 1000)

                    function renderizaHoraMaquina(){
                        document.querySelector('#horasMaquina').value = localStorage.getItem('tempoMaquina');
                    }
                } else {
                    document.querySelector('#horasMaquina').value = resposta['horaTotalMaquina'];
                }

                if (resposta['horasAcumuladasMaquina'] == undefined) {
                    document.querySelector("#horasMaquinaAcumuladas").value = 0;
                } else {
                    document.querySelector("#horasMaquinaAcumuladas").value = resposta['horasAcumuladasMaquina'];
                }
            }

            setTimeout(coresInput, 1000);

            function coresInput(){

                const horasTotais = localStorage.getItem('tempoPessoa');

                // adiciona cor diferente se as horas acumuladas estiverem perto de ultrapassar o total
    
                if (resposta['horasAcumuladasPessoa'] >= ((horasTotais * 75) / 100)) {
                    document.querySelector('#horasPessoaAcumuladas').classList.add('vencendo');
                }
    
                // adiciona cor diferente se as horas acumuladas ultrapassarem o total
    
                if (resposta['horasAcumuladasPessoa'] > horasTotais) {
                    document.querySelector('#horasPessoaAcumuladas').classList.add('vencido');
                }
            }

        } else {
            // inputs do coordenador

            if (resposta['horasAcumuladasPessoa'] == undefined) {
                document.querySelector("#horasPessoaAcumuladasCoor").value = 0;
            } else {
                document.querySelector("#horasPessoaAcumuladasCoor").value = resposta['horasAcumuladasPessoa'];
            }

            if (resposta['horasAcumuladasMaquina'] == undefined) {
                document.querySelector("#horasMaquinaAcumuladasCoor").value = 0;
            } else {
                document.querySelector("#horasMaquinaAcumuladasCoor").value = resposta['horasAcumuladasMaquina'];
            }
        }


        if (localStorage.getItem('cargo') == 'tec') {


            //Condicionais para gerar os botões com as opções de lançamento de horas dependendo da hora trabalhada
            if (resposta.totalHorasPessoaDiarias == undefined) {
                horasRestantes = 10 - 0;
            } else {
                horasRestantes = 10 - (resposta.totalHorasPessoaDiarias);
            }

            if (resposta.totalHorasMaquinaDiarias == undefined) {
                horasRestantesMaquina = 10 - 0;
            } else {
                horasRestantesMaquina = 10 - (resposta.totalHorasMaquinaDiarias);
            }


            const opcoesHoraPessoa = document.getElementById('horaPessoaDiaria');
            const opcoesHoraMaquina = document.getElementById('horaMaquinaDiaria');

            opcoesHoraPessoa.innerHTML = ''; // Limpe as opções existentes em ambos os select
            if (localStorage.getItem('tempoMaquina') != 0) {
                opcoesHoraMaquina.innerHTML = '';
            }

            if (horasRestantes == 0) {
                let option = document.createElement('option');
                option.classList.add('bg-body');
                option.value = 0;
                option.textContent = 0;
                opcoesHoraPessoa.appendChild(option);
            } else {
                for (let i = 0; i < horasRestantes; i++) {
                    let option = document.createElement('option');
                    option.classList.add('bg-body');
                    option.value = i + 1;
                    option.textContent = i + 1;
                    opcoesHoraPessoa.appendChild(option);
                }
            }

            if (localStorage.getItem('tempoMaquina') != 0) {
                if (horasRestantesMaquina == 0) {
                    let option = document.createElement('option');
                    option.classList.add('bg-body');
                    option.value = 0;
                    option.textContent = 0;
                    opcoesHoraMaquina.appendChild(option);
                } else {
                    for (let i = -1; i < horasRestantesMaquina; i++) {
                        let option = document.createElement('option');
                        option.classList.add('bg-body');
                        option.value = i + 1;
                        option.textContent = i + 1;
                        opcoesHoraMaquina.appendChild(option);
                    }
                }
            }

            // desabilita o botao de salvar horas se o tecnico ja tiver terminado suas horas

            if (horasRestantes == 0) {
                document.querySelector('#salvarHoras').disabled = true;
            }
        }


    } catch (error) {
        console.error(error)
    }

}


if (localStorage.getItem('cargo') == 'tec') {

    //Ao clicar no botão, sera acionada a função para salvar os dados no back
    const salvarHoras = document.getElementById('salvarHoras').addEventListener('click', async () => {
        const id = localStorage.getItem('idProduto');
        const nifPerfil = localStorage.getItem('nifPerfil');

        const horaPessoaDiaria = document.getElementById('horaPessoaDiaria').value;

        if (localStorage.getItem('tempoMaquina') != 0) {
            var horaMaquinaDiaria = document.getElementById('horaMaquinaDiaria').value;
        } else {
            var horaMaquinaDiaria = 0;
        }

        const dados = {
            nifPerfil: nifPerfil,
            id: id,
            horaPessoaDiaria: horaPessoaDiaria,
            horaMaquinaDiaria: horaMaquinaDiaria
        };



        try {
            if (horaPessoaDiaria > horasRestantes || horaMaquinaDiaria > horasRestantesMaquina){
                
                localStorage.setItem('status', 'error');
                localStorage.setItem('mensagem', 'Horas informadas invalidas');

                alertas();
            }
            else{
                const autenticado = await autenticacao(['adm', 'coor', 'ger'], false)
                if(!autenticado){
                    return;
                }

                const requisicao = await fetch(back + `/detalhesProduto/salvarLancamentoHoras.php`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dados)
                });

                const resposta = await requisicao.json();



                localStorage.setItem('status', resposta.status);
                localStorage.setItem('mensagem', resposta.mensagem);

                if (resposta.status == 'error') {
                    alertas();
                } else {
                    window.location.href = '/frontend/pages/perfil/index.html';
                }
            }

        } catch (error) {
            console.error(error);

        }
    })
};