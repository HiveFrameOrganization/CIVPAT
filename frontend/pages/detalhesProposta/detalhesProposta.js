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

function cpfMask(){
  var cnpj = document.querySelector('#cnpj');
  
  if (cnpj.value.length == 2 || cnpj.value.length == 6){
    cnpj.value += '.'
  } else if (cnpj.value.length == 10){
    cnpj.value += '/'
  } else if (cnpj.value.length == 15){
    cnpj.value += '-'
  } 
}

function sgsetMask(){
  var sgset = document.querySelector('#numeroSGSET');

  if (sgset.value.length == 3){
    sgset.value += '-'
  } else if (sgset.value.length == 6){
    sgset.value += '/'
  }
}

window.addEventListener('load', () => {
  setTimeout(exibeCpf, 100)
  setTimeout(exibeSgset, 100)
  setTimeout(exibeValor, 200)
  
})

function exibeCpf(){
  var cnpj = document.querySelector('#cnpj').value;
  if (cnpj != ''){
    cnpj = [cnpj.slice(0, 2), '.', cnpj.slice(2)].join('');
    cnpj = [cnpj.slice(0, 6), '.', cnpj.slice(6)].join('');
    cnpj = [cnpj.slice(0, 10), '/', cnpj.slice(10)].join('');
    cnpj = [cnpj.slice(0, 15), '-', cnpj.slice(15)].join('');

    document.getElementById('cnpj').value = cnpj;
  }
}

function exibeSgset(){
  var sgset = document.querySelector('#numeroSGSET').value;
  if (sgset != ''){
    sgset = [sgset.slice(0, 3), '-', sgset.slice(3)].join('');
    sgset = [sgset.slice(0, 6), '/', sgset.slice(6)].join('');

    document.getElementById('numeroSGSET').value = sgset;
  }
}

function exibeValor(){
  var valor = document.querySelector('#valorTotalProdutos').value;

  valor = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(valor);

  document.querySelector('#valorTotalProdutos').value = valor;
}


