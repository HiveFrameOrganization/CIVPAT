import { back } from '../Rotas/rotas.js'
import alertas from '../../feedback.js';

let modalConfirmar;
let fecharModalConfirmar;
let modalFade = document.querySelector('#modal-fade');

// Função para desativar o usuário
async function desativarUsuario(nif) {
    renderizarModalConfirmar();

    modalConfirmar = document.querySelector('#modal-confirmar');
    fecharModalConfirmar = document.querySelector('#close-modal-confirmar');

    [fecharModalConfirmar, modalFade].forEach((el) => el.addEventListener('click', toggleModalConfirmar));

    let btnCancelar = document.querySelector('#btn-cancelar');
    let btnConfirmar = document.querySelector('#btn-confirmar');

    toggleModalConfirmar();

    let confirmarInativar;

    btnConfirmar.addEventListener('click', async () => {

        confirmarInativar = true;

        if (confirmarInativar === true && nif) {

            try {
    
                const requisicao = await fetch(back + `/funcionarios/demitirFuncionarios.php`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ nif: nif })
                });
    
                // Convertendo a requisição em um objeto JS
                const resposta = await requisicao.json();
    
                // Caso a resposta do servidor sej algum erro já previsto...
                if (resposta.status === 'erro') throw new Error(resposta.mensagem);
    
                localStorage.setItem('status', resposta.status);
                localStorage.setItem('mensagem', resposta.mensagem);
                
                if (resposta.status == 'error') {
                    alertas();

                }
    
                // Atualizando a lista em tempo real
                retornaFuncionarios(localStorage.getItem('filtroPadraoFuncionario'));
    
            } catch (erro) {
                console.error(erro);
            }

            toggleModalConfirmar();
        }

        document.body.removeChild(document.querySelector('#modal-confirmar'));

        window.location.reload();
    })
    
    btnCancelar.addEventListener('click', () => {
        confirmarInativar = false;
        toggleModalConfirmar();

        document.body.removeChild(document.querySelector('#modal-confirmar'));
    })
}

// Função para renderizar a modal de confirmar inativação do funcionário
function renderizarModalConfirmar() {

    const div = document.createElement('div');

    div.setAttribute('id', 'modal-confirmar');
    div.classList = 'hide bg-component w-[600px] max-w-[90%] rounded-md py-4 sm:py-8';

    const templateModalConfirmar = `
    <div class="modal-header flex justify-between items-start mb-8 px-4 sm:px-8">
        <div>
            <h2 class="text-2xl font-bold text-red">INATIVAR FUNCIONÁRIO</h2>
            <h3 class="text-xs font-normal"><strong class="text-color-red">Confirme sua escolha!</strong></h3>
        </div>
        <button id="close-modal-confirmar" type="button" class="p-1 hover:bg-primary/20 transition-colors rounded-full w-10 h-10"><img src="../../img/icon/x.svg" alt="Fechar" class="w-full"></button>
    </div>
    <div class="modal-body">
        <div class="px-4 sm:px-8 flex justify-between">
            <button id="btn-confirmar" value="yes"  type="button" class="bg-color-green py-2 px-6 text-[#fff] rounded-md text-xs font-semibold border border-color-green hover:bg-[transparent] hover:text-color-green transition-colors">CONFIRMAR</button>
            <button id="btn-cancelar" value="no" type="button" class="bg-color-red py-2 px-6 text-[#fff] rounded-md text-xs font-semibold border border-color-red hover:bg-[transparent] hover:text-color-red transition-colors">CANCELAR</button>
        </div>
    </div>
    `;

    div.innerHTML = templateModalConfirmar;

    document.body.appendChild(div);
}


const toggleModalConfirmar = () => {

    [modalConfirmar, modalFade].forEach((el) => el.classList.toggle('hide'));

};

export default desativarUsuario