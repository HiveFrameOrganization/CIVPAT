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
