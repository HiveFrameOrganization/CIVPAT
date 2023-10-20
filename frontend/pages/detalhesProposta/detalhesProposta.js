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

const botaoAceitar = document.getElementById('aceitarProposta');
const botaoDeclinar =  document.getElementById('declinarProposta');

window.addEventListener('load', () => {
  const cargo = localStorage.getItem('cargo');

  if (cargo == 'ger'){
    botaoAceitar.value = 'SOLICITAR ACEITE';
    botaoDeclinar.value = 'SOLICITAR DECLINIO';
  }

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
  setTimeout(exibeCpf, 1000)
  setTimeout(exibeSgset, 1000)
  setTimeout(exibeValor, 1000)
  
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

var selectServicos = document.querySelector('#servico');
var selectTecnicos = document.querySelector('#tecnicos');
var selectMaquinas = document.querySelector('#maquinas');
var selectProdutos = document.querySelector('#produto');

selectServicos.addEventListener('change', () => {
  setTimeout(continuaModal, 200);
})

selectTecnicos.addEventListener('change', () => {
  setTimeout(continuaModal, 200);
})

selectMaquinas.addEventListener('change', () => {
  setTimeout(continuaModal, 200);
})

selectProdutos.addEventListener('change', () => {
  setTimeout(continuaModal, 200);
})

// habilita botão para continuar o cadastro de um produto
function continuaModal(){

  var inputServicos = document.querySelector('#servico').checkValidity();
  var valorProduto = document.querySelector('#produto').value
  var inputProduto = document.querySelector('#produto').checkValidity();
  var inputValor = document.querySelector('#valor').checkValidity();
  var inputTecnicos = document.querySelector('#tecnicos').checkValidity();
  var inputMaquinas = document.querySelector('#maquinas').checkValidity();
  var botaoContinuar = document.getElementById('paraSegundoModal');
  
  if (inputServicos == true && inputProduto == true && inputValor == true && inputTecnicos == true && inputMaquinas == true && valorProduto != 'null'){
    botaoContinuar.disabled = false;
  } else {
    botaoContinuar.setAttribute('disabled', 'true');
  }
}

// esconde a opção de segundo gerente quando a propostra estiver diferente de Em analise
if(localStorage.getItem(statusProposta) != 'Em Análise' && 'Declinado'){
  document.querySelector('#segundoGerente').classList.add('hidden')
  document.getElementById('semGerente').innerText = "Nenhum gerente selecionado"
}
