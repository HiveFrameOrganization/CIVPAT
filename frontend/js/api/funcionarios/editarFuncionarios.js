import { back } from '../Rotas/rotas.js';
import alertas from '../../feedback.js';

// Quando recarregar a página o alerta será chamado
window.addEventListener('load', () => {alertas()})

async function editarFuncionarios() {

    // Pegando os valores do formulário
    const nome = document.querySelector('#editarNome').value;
    const sobrenome = document.querySelector('#editarSobrenome').value;
    const email = document.querySelector('#editarEmail').value
    const cargo = document.querySelector('#editarCargo').value;

    try {
        // Pegando o nif armazenado no localStorage
        const nif = localStorage.getItem('nif');

        if (!contemApenasLetrasEspacos(nome) || !contemApenasLetrasEspacos(sobrenome) || !contemPeloMenosUmaLetra(email)) {
            
            localStorage.setItem('status', 'error');
            localStorage.setItem('mensagem', 'Campos preenchidos incorretamente');

            alertas();

        } else {
            const dadosEditados = {
                nif: nif,
                nome: nome,
                sobrenome: sobrenome,
                email: email + "@sp.senai.br",
                cargo: cargo
            }

            // Função para editar os funcionários
            const resp = await requisicaoEditar(dadosEditados);

            if (resp === false) {

                localStorage.setItem('status', 'error');
                localStorage.setItem('mensagem', 'Erro ao tentar editar o usuário! Tente novamente');

                alertas();

                return;
            }

            if (resp.status == 'success') {
                // Verifica se o funcionário editado, é a própria pessoa que está se editando
                // Assim, setando no LocalStorage as novas informações
                if (localStorage.getItem('nifPerfil') == nif) {
                    localStorage.setItem('nomeLogin', `${nome.charAt(0).toUpperCase() + nome.slice(1)} ${sobrenome.charAt(0).toUpperCase() + sobrenome.slice(1)}`);
                    localStorage.setItem('cargo', `${cargo.toLowerCase()}`);
                };

                localStorage.setItem('status', 'success');
                localStorage.setItem('mensagem', 'Usuário editado com sucesso!');
                
                location.reload();
                
            } else if (resp.status == 'error') {

                localStorage.setItem('status', 'error');
                localStorage.setItem('mensagem', 'Erro ao tentar editar o usuário!  Tente novamente');
                
                alertas();
            }
            
        }
    } catch (erro) {
        
        localStorage.setItem('status', 'error');
        localStorage.setItem('mensagem', 'Erro ao tentar editar o usuário! Tente novamente');

        alertas();
    }

}


// Função para mandar os dados para editar
async function requisicaoEditar(dados) {

    try {

        // Requisição PUT para editar
        const requisicao = await fetch(back + `/funcionarios/editarFuncionario.php`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        if (!requisicao.ok) {

            return false;
        }

        // Pegando a resposta retornado pelo servidor
        const resposta = await requisicao.json();

        return resposta;

    } catch(err) {

        return false;
    }
}

function contemPeloMenosUmaLetra(string) {
    const regex = /[a-zA-Z]/;
    return regex.test(string);
}

function contemApenasLetrasEspacos(string) {
    const regex = /^[a-zA-ZÉéÇçãÃõÕit\s]+$/;
    return regex.test(string);
}

export default editarFuncionarios
