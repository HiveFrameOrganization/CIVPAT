import { back } from '../Rotas/rotas.js'

const div = document.getElementById('tabelaFollow');
let idProposta = localStorage.getItem('idProposta');

// Acessa o backend para pegar os follow ups
fetch(back + `/followUp/pegarFollowUp.php?idProposta=${idProposta}`, {method: 'GET'})
.then(response => {
    if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status} ${response.statusText}`);
    }
    return response.json();
})
.then(data => {
    // Loop para criar os ps
    if (data.mensagem) {
        console.log(data.mensagem);
        console.log(data.status);
    } else {
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
            sombra.classList.add('bg-[#1A3661]', 'w-64', 'h-[248px]', 'rounded-lg', 'z-10', 'relative');
            info.classList.add('bg-primary', 'w-64', 'h-60', 'rounded-lg', 'z-20', 'relative', 'ml-2');
            dataedicao.classList.add('rounded-t-lg', 'w-full', 'bg-[#285292]', 'px-3', 'py-2', 'flex', 'justify-between');
            data.classList.add('text-[#fff]');
            edicao.classList.add('fas', 'fa-edit', 'text-[#fff]', 'pt-[2px]', 'cursor-pointer');
            texto.classList.add('flex', 'flex-col', 'px-3', 'py-2');
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
    }
})
.catch(error => {
    console.error('Error:', error);
});