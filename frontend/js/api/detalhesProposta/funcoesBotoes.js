import aceitarProposta from './aceitarProposta.js';
import declinarPropostaBanco from './declinarPropostaBanco.js';
import salvarMudancasNaProposta from './salvarMudancasNaProposta.js';
import concluirProposta from './concluirProposta.js';

// MODAL DE CONFIRMAÇÃO PARA DECLINIO E ACEITAÇÃO DE PROPOSTA
const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

// Recupera o cargo do usuário!
const usuario = localStorage.getItem('cargo');

function modalConfirmar(fun) {

    let cnpj = document.querySelector('#cnpj').value
    let data = document.querySelector('#dataPrimeiroProduto').value
    let sgset = document.querySelector('#numeroSGSET').value

    const camposObrigatorios = document.querySelectorAll('.campoObrigatorio');
    
    if (fun && usuario == 'ger' && !cnpj) {

        Toast.fire({
            icon: 'error',
            title: 'Preencha todos os campos obrigatórios em vermelho!'
        })

        if(cnpj == ''){
            camposObrigatorios[0].classList.add('bg-color-red/20')
            camposObrigatorios[0].classList.add('outline')
            camposObrigatorios[0].classList.add('outline-1')
            camposObrigatorios[0].classList.add('outline-[red]')
            camposObrigatorios[0].classList.remove('disabled:bg-body')
        }
    } else if (fun && usuario != 'ger' && (!cnpj || !sgset)) {
        Toast.fire({
            icon: 'error',
            title: 'Preencha todos os campos obrigatórios em vermelho!'
        })

        if(cnpj == ''){
            camposObrigatorios[0].classList.add('bg-color-red/20')
            camposObrigatorios[0].classList.add('outline')
            camposObrigatorios[0].classList.add('outline-1')
            camposObrigatorios[0].classList.add('outline-[red]')
            camposObrigatorios[0].classList.remove('disabled:bg-body')
        }
        if(sgset == ''){
            camposObrigatorios[1].classList.add('bg-color-red/20')
            camposObrigatorios[1].classList.add('outline')
            camposObrigatorios[1].classList.add('outline-1')
            camposObrigatorios[1].classList.add('outline-[red]')
            camposObrigatorios[1].classList.remove('disabled:bg-body')
        }
    } else if (fun && !data) {

        Toast.fire({
            icon: 'error',
            title: 'Cadastre algum produto para poder aceitar a proposta!'
        })
    } else {

        Swal.fire({
            title: `${fun ? usuario == 'ger' ? 'Solicitar aceite?' : 'Aceitar proposta?' : usuario == 'ger' ? 'Solicitar declínio?' : 'Declinar proposta?'}`,
            icon: `${fun ? 'info' : 'warning'}`,
            text: 'Você não poderá reverter isso!',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `${fun ? usuario == 'ger' ? 'Sim, solicitar' : 'Sim, aceitar' : usuario == 'ger' ? 'Sim, solicitar' : 'Sim, declinar'}`,
            cancelButtonText: 'Cancelar'
        }).then((result) => {

            if (result.isConfirmed && fun) {

                aceitarProposta();
            } else if (result.isConfirmed && fun === false) {

                declinarPropostaBanco();
            }
        });
    }
}

function eventListenerExibirModal(exibir) {

    // exibir = True || False

    try {
        modalConfirmar(exibir)
        // aceitarProposta()
    } catch (error) {
        console.log(error)
    }
}

function editarProposta(editarButton, aceitarButton, declinarButton, concluirButton) {

    // Mudando estado do botão
    let estadoInput = document.querySelectorAll('.estadoInput')
    if (editarButton.value == 'EDITAR') {

        aceitarButton ? aceitarButton.parentElement.removeChild(aceitarButton) : null;
        declinarButton ? declinarButton.parentElement.removeChild(declinarButton) : null
        if (localStorage.getItem('statusProposta') == 'Aceito' || localStorage.getItem('statusProposta') == 'Solicitação de Conclusão'){
            concluirButton ? concluirButton.parentElement.removeChild(concluirButton) : null;
        }

        editarButton.value = 'SALVAR';

        const cancelarEdicaoProposta = document.createElement('button');

        cancelarEdicaoProposta.setAttribute('aria-label', 'Cancelar edição');
        cancelarEdicaoProposta.classList = 'bg-color-red py-2 px-12 text-[#fff] rounded-md text-xs font-semibold border border-color-red hover:bg-[transparent] hover:text-color-red transition-colors cursor-pointer';
        cancelarEdicaoProposta.setAttribute('id', 'cancelarEdicaoProposta');
        cancelarEdicaoProposta.textContent = 'CANCELAR';

        cancelarEdicaoProposta.addEventListener('click', () => {

            window.location.reload();
        });

        editarButton.parentElement.appendChild(cancelarEdicaoProposta);

        for (let i = 0; i < estadoInput.length; i++) {
            estadoInput[i].removeAttribute('disabled')
        }

        
    } else {
        salvarMudancasNaProposta();
    }
}

function concluirPropostaConfirmar() {
    
    Swal.fire({
        title: `${usuario == 'ger' ? 'Solicitar conclusão?' : 'Concluir proposta?'}`,
        icon: 'info',
        text: 'Você não poderá reverter isso!',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: `${usuario == 'ger' ? 'Sim, solicitar' : 'Sim, concluir'}`,
        cancelButtonText: 'Cancelar'
    }).then((result) => {

        result.isConfirmed && concluirProposta();
    });
}

export function aplicarFuncoes() {

    const aceitarPropostaButton = document.getElementById('aceitarProposta');
    const declinarPropostaButton = document.getElementById('declinarProposta');
    const concluirPropostaButton = document.getElementById('concluirProposta');
    const editandoPropostaButton = document.getElementById('editarProposta');

    if (editandoPropostaButton) editandoPropostaButton.addEventListener('click', editarProposta.bind(null, editandoPropostaButton, aceitarPropostaButton, declinarPropostaButton, concluirPropostaButton));

    if (aceitarPropostaButton) aceitarPropostaButton.addEventListener('click', eventListenerExibirModal.bind(null, true));

    if (declinarPropostaButton) declinarPropostaButton.addEventListener('click', eventListenerExibirModal.bind(null, false));

    if (concluirPropostaButton) concluirPropostaButton.addEventListener('click', concluirPropostaConfirmar);
}
