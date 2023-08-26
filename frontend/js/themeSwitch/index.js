// Icons
const sunIcon = document.querySelector('#sun-icon');
const moonIcon = document.querySelector('#moon-icon');

// Variáveis de TEMA
const userTheme = localStorage.getItem('theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Icon Toggle
function iconToggle() {

    sunIcon.classList.toggle('hidden');
    moonIcon.classList.toggle('hidden');
};

// Initial Theme Check
function themeCheck() {

    if (userTheme == 'dark' || (!userTheme && systemTheme)) {

        document.documentElement.setAttribute('data-theme', 'dark');
        moonIcon.classList.add('hidden');
        return;
    }

    document.documentElement.setAttribute('data-theme', 'light');

    sunIcon.classList.add('hidden');
};

// Manual Theme Switch
function themeSwitch() {

    if (document.documentElement.getAttribute('data-theme') == 'dark') {

        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        iconToggle();
        return;
    };

    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    iconToggle();
};

// Theme switch btn
sunIcon.addEventListener('click', () => {

    themeSwitch();
});

moonIcon.addEventListener('click', () => {

    themeSwitch();
});

// Initial theme check
themeCheck();
