// Exibir o dropdown ao Clicar na foto de perfil

const profileTrigger = document.querySelector('#profile-trigger');
const profileDropdown = document.querySelector('#profile-dropdown');

profileTrigger.addEventListener('click', () => {

    profileDropdown.classList.toggle('hidden');
});

// ------------------------------------------------------------------
