// Icons
const sunIcon = document.querySelector('#sun-icon');
const moonIcon = document.querySelector('#moon-icon');

let icons = sunIcon && moonIcon ? true : false

// Variáveis de TEMA
const userTheme = localStorage.getItem('theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Icon Toggle
function iconToggle() {

    if (icons) {

        sunIcon.classList.toggle('hidden');
        moonIcon.classList.toggle('hidden');
    }
}

// Initial Theme Check
function themeCheck() {

    if (userTheme == 'dark' || (!userTheme && systemTheme)) {

        document.documentElement.setAttribute('data-theme', 'dark');
        icons && moonIcon.classList.add('hidden');
        icons && sunIcon.classList.remove('hidden');
        return;
    }

    document.documentElement.setAttribute('data-theme', 'light');

    icons && sunIcon.classList.add('hidden');
    icons && moonIcon.classList.remove('hidden');
}

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
}

if (icons) {

    // Theme switch btn
    sunIcon.addEventListener('click', () => {

        themeSwitch();
    });

    moonIcon.addEventListener('click', () => {

        themeSwitch();
    });
}

// Initial theme check
themeCheck();
