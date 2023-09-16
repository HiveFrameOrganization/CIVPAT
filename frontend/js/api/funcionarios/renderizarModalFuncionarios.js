import { back } from '../Rotas/rotas.js'
import resetarSenhaUsuario from './resetarSenhaFuncionarios.js';

// Função para mostrar a tela de edição do usuário
async function FormularioEditarUsuario(nif) {

    // Quando aparecer o formulário será feita uma requisição para retornar os dados
    dadosParaEditar(nif);

    toggleModal();

    // Renderizar o botão de resetar senha, somente quando aparecer a modal de editar funcionario
    resetSenhaContainer.innerHTML = '<span id="resetarSenha" role="button" class="font-semibold text-base cursor-pointer">Resetar senha</span>';

    /*
    --------------------------------------------------------------------------------------- 
                            RESETAR A SENHA DO USUÁRIO 
    ---------------------------------------------------------------------------------------
    */

    // Quando o usuário clicar a senha será resetada
    resetSenhaContainer.querySelector('#resetarSenha').addEventListener('click', () => {

        const nif = localStorage.getItem('nif');

        // Função para resetar a senha
        resetarSenhaUsuario(nif);

    });
}

// Função para fazer a requisição para editar nome, email, cargo e resetar a senha
async function dadosParaEditar(nif) {
    try {

        // Requisição ao servidor
        const requisicao = await fetch(back + `/funcionarios/pesquisarFuncionario.php?valor=${nif}`);

        // Convertendo a resposta em json
        const resposta = await requisicao.json();

        // Receber erros personalizados do back-end
        if (resposta.status === 'erro') throw new Error(resposta.mensagem);

        console.log(resposta)

        // Função para retornar os dados para editar
        exibirDadosParaEditar(resposta.usuarios);

    } catch (erro) {
        console.error(erro);
    }
}

// Colocando os valores no formulário
function exibirDadosParaEditar(dados) {

    // Pegando os elementos para editar
    const editarNome = document.querySelector('#editarNome');
    const editarSobrenome = document.querySelector('#editarSobrenome');
    const editarEmail = document.querySelector('#editarEmail');
    const editarCargo = document.querySelector('#editarCargo');

    for (let usuario of dados) {
        editarNome.value = usuario.Nome;
        editarSobrenome.value = usuario.Sobrenome;
        editarEmail.value = usuario.Email
        editarCargo.value = usuario.TipoUser;
    }

}

const toggleModal = () => {

    [modalEdit, modalFade].forEach((el) => {

        el.classList.toggle('hide');

        resetSenhaContainer.innerHTML = '';
    });

};

const resetSenhaContainer = document.querySelector('#reset-container');
// Abertura e Fechamento da Modal
let modalEdit = document.querySelector('#modal');
let modalFade = document.querySelector('#modal-fade');
let fecharModal = document.querySelector('#close-modal');

[fecharModal, modalFade].forEach((el) => el.addEventListener('click', toggleModal));

export default FormularioEditarUsuario