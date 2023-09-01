// Exibir o dropdown ao Clicar na foto de perfil

const profileTrigger = document.querySelector('#profile-trigger');
const profileDropdown = document.querySelector('#profile-dropdown');

window.addEventListener('click', (event) => {

    if (!event.target.matches('#sidebar') && !event.target.matches('.sidebar-btn')) {

        sidebar.classList.contains('left-0') && sidebar.classList.replace('left-0', '-left-full');

        fade.classList.add('hide');
    }

    if (event.target.matches('#profile-trigger')) {

        profileDropdown.classList.toggle('hidden');

        return;
    }

    profileDropdown.classList.add('hidden');

});

profileDropdown.addEventListener('click', (event) => {

    event.stopPropagation();
})

// ------------------------------------------------------------------

// Exibir e esconder a Sidebar

const sidebar = document.querySelector('#sidebar');
const sidebarBtn = document.querySelectorAll('.sidebar-btn');
const fade = document.querySelector('#fade');

sidebarBtn.forEach((btn) => {

    btn.addEventListener('click', () => {

        sidebar.classList.contains('-left-full') ? sidebar.classList.replace('-left-full', 'left-0') : sidebar.classList.replace('left-0', '-left-full');

        fade.classList.toggle('hide');
    });
});

sidebar.addEventListener('click', (event) => {

    event.stopPropagation();
});

// ------------------------------------------------------------------


// FUNÇAO DE MUDAR A ABA QUE SERA RENDERIZADA
let mudarAba = document.querySelectorAll('.mudarAba')
let nomeAba = document.querySelector('.nomeAba')
let abaInfo = document.querySelector('.abaInfo')
let abaPdf = document.querySelector('.abaPdf')

function funMudarAba(pag){
    // renderiza e esconde elementos dependendo de qual é clicado
    if(pag == 0){
        abaInfo.classList.add('hidden')
        abaPdf.classList.remove('hidden')
    }else{
        abaInfo.classList.remove('hidden')
        abaPdf.classList.add('hidden')
    }

    // adiciona estilizaçao no elemento selecionado
    mudarAba[pag].classList.add('text-primary')
    mudarAba[pag].classList.add('border-b-2')

    // remove as estilizaçoes de selecionado
    for (let i = 0; i < mudarAba.length; i++) {
        if (i != pag) {
            mudarAba[i].classList.remove('text-primary')
            mudarAba[i].classList.remove('border-b-2')
        }
    }
}