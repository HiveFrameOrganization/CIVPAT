const optionDropdownTriggers = document.querySelectorAll('.option-dropdown-trigger');

// Função para fechar todos os dropdown
function hiddenAll() {
    
    document.querySelectorAll('.option-dropdown').forEach((el) => {

        const row = el.parentElement.parentElement.parentElement;

        el.classList.add('hidden');
        row.classList.remove('selected-row');
    });
}

// Abrir o dropdown específico do botão clicado
optionDropdownTriggers.forEach((trigger) => {

    trigger.addEventListener('click', () => {
        
        const optionDropdown = trigger.parentElement.querySelector('.option-dropdown');

        const row = optionDropdown.parentElement.parentElement.parentElement;

        optionDropdown.classList.toggle('hidden');
        row.classList.toggle('selected-row');
        
    });
});

// Fechar todos ao clicar fora do botão
window.addEventListener('click', (event) => {

    if (!event.target.matches('.option-dropdown-trigger')) {

        hiddenAll();
    }
});
