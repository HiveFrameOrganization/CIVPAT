
import { back } from '../Rotas/rotas.js'

const div = document.getElementById('tabelaFollow');
let idProposta = localStorage.getItem('idProposta');

div.innerHTML = `
<div class='w-full flex flex-col justify-center items-center gap-4'>
    <div class='loading-spinner inline-block w-[50px] h-[50px] border-4 border-[#e6e6e64d] rounded-full border-t-[#3976d1] animate-spin'></div>
    <h2 class='font-bold text-color-text text-center'>CARREGANDO...</h2>
</div>`;

// Acessa o backend para pegar os follow ups
fetch(back + `/followUp/pegarFollowUp.php?idProposta=${idProposta}`, {method: 'GET'})
.then(response => {

    if (!response.ok) {

        div.innerHTML = `
            <div class='w-full flex flex-col justify-center items-center gap-4'>
                <img src="../../img/icon/emergency.svg" alt="emergencia">
                <h2 class='font-bold text-color-text text-center'>OPA, UM ERRO ACONTECEU AO BUSCAR OS FOLLOW-UP's</h2>
            </div>
        `;
    }

    return response.json();
})
.then(data => {

    // Caso tenha follow ups, exibir
    if (data && data.length > 0) {

        // Limpando a tabela
        div.innerHTML = "";
        
        data.forEach((followUp) => {

            const card = document.createElement('div');
            const sombra = document.createElement('div');
            const info = document.createElement('div');
            const dataedicao = document.createElement('div');
            const data = document.createElement('p');
            const edicao = document.createElement('i');
            const texto = document.createElement('div');
            const p = document.createElement('p');
            const dataprox = document.createElement('div');
            const prox = document.createElement('h4');

            // adicionando classes aos cards

            card.classList.add('card', 'text-[#fff]');
            sombra.classList.add('bg-[#1A3661]', 'w-64', 'h-60', 'rounded-lg', 'z-10', 'pt-2');
            info.classList.add('bg-primary', 'w-64', 'h-60', 'rounded-lg', 'relative', 'ml-2');
            dataedicao.classList.add('rounded-t-lg', 'w-full', 'bg-[#285292]', 'px-3', 'py-2', 'flex', 'justify-between');
            data.classList.add('text-[#fff]');
            edicao.classList.add('fas', 'fa-edit', 'text-[#fff]', 'pt-[2px]', 'cursor-pointer');
            texto.classList.add('flex', 'flex-col', 'px-3', 'py-2', 'overflow-y-auto', 'h-40');
            p.classList.add('pt-4', 'text-xs', 'text-[#fff]', 'break-words');
            dataprox.classList.add('flex', 'py-4', 'px-4', 'justify-end');
            prox.classList.add('text-[#fff]', 'text-xs', 'absolute', 'bottom-4');
            
            p.id = 'p' + followUp[0];
            data.id = 'data' + followUp[0];
            edicao.id = 'edicao' + followUp[0];
            dataprox.id = 'dataprox' + followUp[0];

            data.textContent = followUp[3].split('-').reverse().join('/');; // Adiciona o texto do p de data (Para poder ser visto na tela)
            p.textContent = followUp[4]; // Adiciona o texto do p de comentário (Para poder ser visto na tela)
            prox.textContent = 'Próximo follow-up: ' + followUp[5].split('-').reverse().join('/');; // Adiciona o texto do h4 de data da próxima follow-up (Para poder ser visto na tela)

            edicao.onclick = () => {
                abreModalEditar(followUp[0])
            }

            function abreModalEditar(id) {
                let modal = document.querySelector('.editar');

                modal.classList.remove('hidden');
                modal.classList.add('flex');

                let datafollow = document.getElementById('dataFollowUpEdit')
                datafollow.value = document.getElementById(`data${id}`).textContent
                datafollow.disabled = true;
                
                document.getElementById(`comentarioEdit`).textContent = document.getElementById(`p${id}`).textContent

                let dataFollowUpProx = document.getElementById('dataFollowUpProxEdit')
                dataFollowUpProx.value = document.getElementById(`dataprox${id}`).textContent.split(": ")[1]
                dataFollowUpProx.disabled = true;

                document.getElementById('idFollowUpModal').textContent = id
            }

            // juntando os elementos

            
            card.appendChild(sombra);
            sombra.appendChild(info);
            info.appendChild(dataedicao);
            dataedicao.appendChild(data);
            dataedicao.appendChild(edicao);
            info.appendChild(texto);
            texto.appendChild(p);
            info.appendChild(dataprox);
            dataprox.appendChild(prox);

            div.appendChild(card); // Adiciona o card à div
        });
    } else {
        div.innerHTML = `
        <div class='w-full flex flex-col justify-center items-center gap-4'>
            <svg width="67" height="68" viewBox="0 0 67 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M33.5004 67.4168C32.6115 67.4168 31.7643 67.2502 30.9587 66.9168C30.1532 66.5835 29.4171 66.1113 28.7504 65.5002L2.00041 38.7502C1.3893 38.0835 0.917074 37.3474 0.58374 36.5418C0.250407 35.7363 0.0837402 34.8891 0.0837402 34.0002C0.0837402 33.1113 0.250407 32.2502 0.58374 31.4168C0.917074 30.5835 1.3893 29.8613 2.00041 29.2502L28.7504 2.50016C29.4171 1.8335 30.1532 1.34739 30.9587 1.04183C31.7643 0.736274 32.6115 0.583496 33.5004 0.583496C34.3893 0.583496 35.2504 0.736274 36.0837 1.04183C36.9171 1.34739 37.6393 1.8335 38.2504 2.50016L65.0004 29.2502C65.6671 29.8613 66.1532 30.5835 66.4587 31.4168C66.7643 32.2502 66.9171 33.1113 66.9171 34.0002C66.9171 34.8891 66.7643 35.7363 66.4587 36.5418C66.1532 37.3474 65.6671 38.0835 65.0004 38.7502L38.2504 65.5002C37.6393 66.1113 36.9171 66.5835 36.0837 66.9168C35.2504 67.2502 34.3893 67.4168 33.5004 67.4168ZM33.5004 60.7502L60.2504 34.0002L33.5004 7.25016L6.75041 34.0002L33.5004 60.7502ZM30.1671 37.3335H36.8337V17.3335H30.1671V37.3335ZM33.5004 47.3335C34.4449 47.3335 35.2365 47.0141 35.8754 46.3752C36.5143 45.7363 36.8337 44.9446 36.8337 44.0002C36.8337 43.0557 36.5143 42.2641 35.8754 41.6252C35.2365 40.9863 34.4449 40.6668 33.5004 40.6668C32.556 40.6668 31.7643 40.9863 31.1254 41.6252C30.4865 42.2641 30.1671 43.0557 30.1671 44.0002C30.1671 44.9446 30.4865 45.7363 31.1254 46.3752C31.7643 47.0141 32.556 47.3335 33.5004 47.3335Z" fill="#f54a4c"/>
            </svg>
            <h2 class='font-bold text-color-text text-center'>NENHUM FOLLOW-UP ENCONTRADO</h2>
        </div>
        `;
    }

})
.catch(error => {
    console.error('Error:', error);
});