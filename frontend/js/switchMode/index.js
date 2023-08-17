function switchMode() {
    /**
     * Trocar o TEMA do site: Escuro/Claro
     */

    if (trigger.classList.contains('light-mode')) {

        trigger.src = '../../img/icon/moon.svg';
        trigger.classList.replace('light-mode', 'dark-mode');
        document.querySelector('html').setAttribute('data-theme', 'dark');
    } else {

        trigger.src = '../../img/icon/sun.svg';
        trigger.classList.replace('dark-mode', 'light-mode');
        document.querySelector('html').setAttribute('data-theme', 'light');
    }
}

// Elemento disparador do evento
const trigger = document.querySelector('#switch-mode');

// Recebe o tema de preferência do usuário
const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

// Troca o ícone de acordo com o TEMA
if (isDarkTheme) {

    trigger.src = '../../img/icon/moon.svg';
    trigger.classList.add('dark-mode');

    document.querySelector('html').setAttribute('data-theme', 'dark');
} else {

    trigger.src = '../../img/icon/sun.svg';
    trigger.classList.add('light-mode');
    document.querySelector('html').setAttribute('data-theme', 'light');
}

trigger.addEventListener('click', () => {

    switchMode();
})
