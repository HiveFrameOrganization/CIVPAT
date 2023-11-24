import { back } from '../Rotas/rotas.js'
import { autenticacao } from '../login/autenticacao.js';

import retornaFuncionarios from './pegarFuncionarios.js';


// Função para desativar o usuário
async function desativarUsuario(nif) {
    const autenticado = await autenticacao(['coor'], false)
    if(!autenticado){
        return;
    }

    const response = await Swal.fire({
        title: 'Inativar funcionário, você tem certeza?',
        text: "Você não poderá reverter isso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, inativar!',
        cancelButtonText: 'Cancelar'
        }).then(async (result) => {

            if (result.isConfirmed) {

                try {

                    const requisicao = await fetch(back + `/funcionarios/demitirFuncionarios.php`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ nif: nif })
                    });

                    if (!requisicao.ok) {

                        return false;
                    }

                    // Convertendo a requisição em um objeto JS
                    const resposta = await requisicao.json();

                    if (resposta.status != 'success') {

                        return false;
                    }

                    // Atualizando a lista em tempo real
                    retornaFuncionarios(localStorage.getItem('filtroPadraoFuncionario'));

                    return true;

                } catch (erro) {

                    return false;
                }
            }
        })

    if (response === true) {

        Swal.fire(
            'Inativado!',
            'O funcionário foi inativado!',
            'success'
        );
    } else if (response === false) {

        Swal.fire(
            'Erro ao inativar funcionário!',
            'Tente novamente!',
            'error'
        );
    }
}

export default desativarUsuario