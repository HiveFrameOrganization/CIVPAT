const modal = document.querySelector('.caixa');
modal.addEventListener('click', function(e) {
  if (e.target == this) fechaModal();
});

function fechaModal(){
    let modal = document.querySelector('.caixa');

    cad.classList.remove('flex');
    cad.classList.add('hidden');
    modal.classList.remove('flex');
    modal.classList.add('hidden');
}

const modalEdit = document.querySelector('.editar');
modalEdit.addEventListener('click', function(e) {
  if (e.target == this) fechaModalEdit();
});

function fechaModalEdit(){
    let modal = document.querySelector('.editar');

    modal.classList.remove('flex');
    modal.classList.add('hidden');
}
