import FormularioEditarUsuario from './renderizarModalFuncionarios.js';
import desativarUsuario from './desativarFuncionarios.js';

function exibir(dados) {
    //Selecionando a div que vai ter os funcionário
    const exibe = document.querySelector('#exibicao');

    // Removendo um possível elemento na div de exibição
    exibe.innerHTML = '';

    for (let funcionario of dados) {
        // Criando os elementos
        const div = document.createElement('div');

        div.classList = 'row-item flex flex-nowrap bg-component rounded-md border-2 border-[transparent] hover:border-primary transition-colors';

        let fotoDePerfil = funcionario['FotoDePerfil'];

        let cargo;
        let cor;
        let imgColor;
        let mostrarBotao;

        if (funcionario['Status'].toLowerCase() == 'ativo') {
            mostrarBotao = true
            cor = 'primary';
            imgColor = '#3976d1';
        } else {
            mostrarBotao = false
            cor = 'color-red';
            imgColor = '#f54a4c';
        }

        if (funcionario['TipoUser'] == 'tec') {

            cargo = 'Técnico';
        } else if (funcionario['TipoUser'] == 'adm') {

            cargo = 'Administrador';
        } else if (funcionario['TipoUser'] == 'ger') {
            
            cargo = 'Gerente';
        } else {

            cargo = 'Coordenador'
        }

        div.innerHTML = `
        <div class="area-left text-color-text flex-1 flex flex-nowrap items-center justify-between rounded-l-md py-4 px-3 md:px-4 overflow-x-auto">
            <div class="flex items-center gap-8 lg:w-full">
                <div class="flex items-center gap-3 border-r border-color-text-secundary pr-8">
                    <img src="${fotoDePerfil ? '' : '../../img/icon/no-image.jpg'}" alt="Responsável" class="w-8 h-8 border border-${cor} rounded-full">
                    <div class="w-[175px] max-w-[175px] overflow-hidden text-ellipsis">
                        <span title="${funcionario['Nome']+' '+funcionario['Sobrenome']}" class="font-semibold text-lg leading-4 whitespace-nowrap capitalize">${funcionario['Nome']+' '+funcionario['Sobrenome']}</span>
                        <div class="text-color-text-secundary font-semibold text-xs flex flex-wrap justify-between gap-1">
                            <span class="text-xs text-color-text-secundary capitalize">${cargo}</span>
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-3 border-r border-color-text-secundary pr-8">
                    <div class="flex flex-col gap-1 font-semibold w-[75px] max-w-[75px] overflow-hidden text-ellipsis">
                        <span class="text-lg leading-4 whitespace-nowrap">NIF</span>
                        <span class="text-xs text-color-text-secundary">${funcionario['NIF'] ? funcionario['NIF'] : 'N/A'}</span>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <div class="flex flex-col gap-1 font-semibold w-[275px] max-w-[275px] overflow-hidden text-ellipsis">
                        <span class="text-lg leading-4 whitespace-nowrap">Email</span>
                        <span title="${funcionario['Email'] ? funcionario['Email'] : 'N/A'}" class="text-xs text-color-text-secundary">${funcionario['Email'] ? funcionario['Email'] : 'N/A'}</span>
                    </div>
                </div>
                <span class="bg-${cor}/20 rounded-md text-${cor} font-semibold text-xs py-2 px-6 ml-9 lg:ml-auto uppercase whitespace-nowrap">${funcionario['Status']}</span>
            </div>
        </div>
        <div class="area-right text-color-text bg-component rounded-md px-3 md:px-4 flex items-center justify-center">
            <button type="button" class="option-dropdown-trigger btn-trigger w-6 h-max bg-${cor}/20 rounded-md relative">
                <svg xmlns="http://www.w3.org/2000/svg" alt="Opções" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${imgColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-more-vertical ${mostrarBotao && 'option-dropdown-trigger'} w-full p-1"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                <div class="option-dropdown hidden absolute min-w-[150px] z-10 bottom-0 right-[125%] h- first-letter: bg-component border border-body rounded-md shadow-md">
                    ${
                        mostrarBotao ? `
                            <div itemid="${funcionario['NIF']}" class="editar space-y-2 p-2 rounded-md text-sm hover:bg-primary/20 transition-colors">
                                <div class="flex items-center gap-2">
                                <img src="../../img/icon/eye.svg" alt="Visualizar" class="w-5 h-5" />
                                    <a>
                                        Editar
                                    </a>
                                </div>
                            </div>
                            <div itemid="${funcionario['NIF']}" class="inativar space-y-2 p-2 rounded-md text-sm hover:bg-primary/20 transition-colors">
                                <div class="flex items-center gap-2">
                                    <img src="../../img/icon/user-minus.svg" alt="Inativar" class="w-5 h-5" />
                                    <a>
                                        Inativar
                                    </a>
                                </div>
                            </div>
                        ` : ''
                    }
                </div>
            </button>
        </div>`;

        exibe.appendChild(div);
    }

    reloadBotoesLinhas();
    recarregarLinhas();
};

// Recuperar os botões das linhas da tabela
function reloadBotoesLinhas() {
    const inativarButtons = document.querySelectorAll('.inativar');
    const editarrButtons = document.querySelectorAll('.editar');

    addEventoLinhasBotoes(inativarButtons, editarrButtons);
}

// Aplicando os eventos aos botões das linhas da tabela
function addEventoLinhasBotoes(inativarButtons, editarrButtons) {
    inativarButtons.forEach((btn) => {

        btn.addEventListener('click', function() {

            desativarUsuario(this.getAttribute('itemid'));
        });
    });

    editarrButtons.forEach((btn) => {

        btn.addEventListener('click', function() {

            localStorage.setItem('nif', this.getAttribute('itemid'));

            FormularioEditarUsuario(this.getAttribute('itemid'));
        });
    });
}

function recarregarLinhas() {
    const btnAcionadores = document.querySelectorAll('.btn-trigger');

    btnAcionadores.forEach((btn) => {

        // Abrir o menu específico do botão clicado, na linha
        btn.addEventListener('click', () => {
            
            if (btn.querySelector('.option-dropdown').classList.contains('hidden')) {
                // Se tiver a classe hidden, significa que o usuário quer mostrar o menu
                esconderTudo();

                btn.querySelector('.option-dropdown').classList.toggle('hidden');
                btn.parentElement.parentElement.classList.toggle('selected-row');
            } else {
                // Se não tiver a classe hidden, significa que o usuário quer esconder o menu    
                esconderTudo();
            }
        });
    });
}

// Função para fechar todos os dropdown
function esconderTudo() {
    if (document.querySelector('.option-dropdown')) {
        
        document.querySelectorAll('.option-dropdown').forEach((el) => {
            
            if (!el.classList.contains('hidden')) {

                let row = el.parentElement.parentElement.parentElement;

                el.classList.add('hidden');
                row.classList.remove('selected-row');
            }   
        });
    }
}

function exibirErro(erro) {
    //Selecionando a div que vai ter os funcionário
    const exibicao = document.querySelector('#exibicao');

    // Removendo um possível elemento na div de exibição
    exibicao.innerHTML = '';

    // Criando um elemnto para mostrar o erro na tela
    const titulo = document.createElement('h1');

    // Adicionando texto e estilo
    titulo.classList = 'w-full text-center'
    titulo.textContent = 'NENHUM FUNCIONÁRIO ENCONTRADO...';
    titulo.style.color = 'red';

    exibicao.appendChild(titulo);
}

export default exibir
export { esconderTudo, exibirErro }