// Funções para controlar os botões
const navButtons = document.querySelectorAll('.nav-btn');

function removerBotoesSelecionados() {

    navButtons.forEach((button) => {

        button.classList.remove('text-primary');
        button.classList.remove('border-b-2');
        button.classList.remove('border-primary');
    });
}

navButtons.forEach((button) => {

    button.addEventListener('click', () => {

        removerBotoesSelecionados();

        button.classList.add('text-primary');
        button.classList.add('border-b-2');
        button.classList.add('border-primary');
    })
});

// Controlar o Upload de images

const uploadImageBtn = document.querySelector('#upload-image');
const imageInput = document.querySelector('#image-input');

uploadImageBtn.addEventListener('click', function() {

    imageInput.click();
});

imageInput.addEventListener('change', (event) => {

    if (imageInput.files.length <= 0) {

        return;
    }
    
    let leitor = new FileReader();

    leitor.onload = () => {

        uploadImageBtn.parentElement.querySelector('#perfil-image').src = leitor.result;

        document.querySelector('#profile-trigger').src = leitor.result;
    }

    leitor.readAsDataURL(imageInput.files[0]);
});