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
  console.log(cargo)

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

// mascara sgset

const numeroSGSET = document.getElementById('numeroSGSET');

numeroSGSET.addEventListener('input', function () {
    const valorDeEntrada = numeroSGSET.value;
    const valorSanitizado = valorDeEntrada.replace(/[^0-9]/g, ''); // Remove todos os caracteres não numéricos
    const valorFormatado = formatarNumeroSGSET(valorSanitizado);
    numeroSGSET.value = valorFormatado;

    if (isValidoNumeroSGSET(valorSanitizado)) {
        localStorage.setItem('sgsetValido', 'válido')
    } else {
      localStorage.setItem('sgsetValido', 'inválido')
    }
});

function isValidoNumeroSGSET(value) {
    // Verifica se o valor tem pelo menos 5 dígitos, incluindo pelo menos 1 número antes da barra.
    return value.length >= 5 && /^\d+\/\d{4}$/.test(value);
}

function formatarNumeroSGSET(value) {
    if (value.length <= 1) {
        return value;
    }

    // Insere a barra (/) antes dos últimos 4 dígitos
    const antesDaBarra = value.slice(0, -4);
    const depoisDaBarra = value.slice(-4);
    return antesDaBarra + '/' + depoisDaBarra;
}

window.addEventListener('load', () => {
  setTimeout(exibeCpf, 1000)
  setTimeout(exibeSgset, 1000)
  setTimeout(exibeValor, 1000)
  setTimeout(titles, 1000)
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
  
    if(sgset != ''){
      let mask = sgset.split('').reverse()
      let text = "";

      for (let i = 0; i < mask.length; i++) {
          if(i == 3){
              text += mask[i] + '/'
          }else{
              text += mask[i]
          }
      }
      
      text = text.split('').reverse()
      mask = ''

      for (let x = 0; x < text.length; x++) {
          mask += text[x]
      }

      document.getElementById('numeroSGSET').value = mask;
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

var selectTempoMaquina = document.querySelector('#tempoMaquina');
var selectTempoPessoa = document.querySelector('#tempoPessoa');
var selectDataInicial = document.querySelector('#dataInicial');
var selectDataFinal = document.querySelector('#dataFinal');
var selectUnidade = document.querySelector('#unidadeCriadora');

selectServicos.addEventListener('change', () => {
  setTimeout(continuaModal(), 200);
})

selectTecnicos.addEventListener('change', () => {
  setTimeout(continuaModal(), 200);
})

selectMaquinas.addEventListener('change', () => {
  setTimeout(continuaModal(), 200);
})

selectProdutos.addEventListener('change', () => {
  setTimeout(continuaModal(), 200);
})

selectTempoMaquina.addEventListener('change', () => {
  setTimeout(salvarModal, 200);
})

selectTempoPessoa.addEventListener('change', () => {
  setTimeout(salvarModal, 200);
})

selectDataFinal.addEventListener('change', () => {
  setTimeout(salvarModal, 200);
})

selectDataInicial.addEventListener('change', () => {
  setTimeout(salvarModal, 200);
})

selectUnidade.addEventListener('change', () => {
  setTimeout(salvarModal, 200);
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
    console.log('funfou')
  } else {
    botaoContinuar.setAttribute('disabled', 'true');
    console.log('nao funfou')
  }
}

// Desabilitar botao de salvar produto quando todos campos nao estiverem salvos
function salvarModal(){

  if(selectTempoPessoa.checkValidity() == false || selectDataFinal.value == '' || selectDataInicial.value == '' || selectUnidade.checkValidity() == false){
    document.querySelector('#salvarProduto').setAttribute('disabled', true)
  }else{
    // console.log('todos os campos preenchidos')
    if(selectMaquinas.value != 1 && selectTempoMaquina.value <= 0){
      console.log('sem horas maquina')
      document.querySelector('#salvarProduto').setAttribute('disabled', true)
    }else{
      document.querySelector('#salvarProduto').removeAttribute('disabled')
    }
  }
}

var horaPes = document.getElementById('tempoPessoa')

horaPes.addEventListener('input', () => {
  if (horaPes.value.length > horaPes.maxLength){
    horaPes.value = horaPes.value.slice(0, horaPes.maxLength);
  }
})

var horaMaq = document.getElementById('tempoMaquina')

horaMaq.addEventListener('input', () => {
  if (horaMaq.value.length > horaMaq.maxLength){
    horaMaq.value = horaMaq.value.slice(0, horaMaq.maxLength);
  }
})

var numeroContato = document.getElementById('numeroContato')

numeroContato.addEventListener('input', () => {
  if (numeroContato.value.length > numeroContato.maxLength){
    numeroContato.value = numeroContato.value.slice(0, numeroContato.maxLength)
  }
})

function titles(){
  const inputs = document.querySelectorAll(".inputProposta");
  const arrayInputs = [];
  
  for (const input of inputs) {
    arrayInputs.push(input);
  }
  
  for (const input of arrayInputs) {
    input.title = input.value;
  }
}
