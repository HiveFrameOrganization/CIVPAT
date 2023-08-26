const optionDropdownTriggers = document.querySelectorAll('.option-dropdown-trigger');

function toggleHide() {

    optionDropdownTriggers.forEach((trigger) => {

        trigger.parentElement.querySelector('.option-dropdown').classList.add('hidden')
        trigger.parentElement.parentElement.parentElement.classList.remove('selected-row');
    });
}

window.addEventListener('click', (event) => {

    if (event.target.matches('.option-dropdown-trigger')) {

        const el = event.target.parentElement.querySelector('.option-dropdown');

        toggleHide();

        el.classList.toggle('hidden');

        event.target.parentElement.parentElement.parentElement.classList.toggle('selected-row');
    } else {

        toggleHide();
    }
});
