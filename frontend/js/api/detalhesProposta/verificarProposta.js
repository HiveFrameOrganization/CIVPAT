import carregarTecnicos from './carregarTecnicos.js';
import selecionarFunil from './selecionarFunil.js';
import desativaBotoes from './desativaBotoes.js';
import { back } from '../Rotas/rotas.js';
import avisoData from './avisoData.js';


// Fução para fazer a requisição no back-end dos dados
export default async function verificarBancoProposta(id) {
    try {

        // Requisição com parâmetro para buscar a proposta pelo id
        const requisicao = await fetch(back + `/detalhesProposta/detalhesProposta.php?id=${id}`)

        if(!requisicao.ok){
            localStorage.setItem("status", "error");
            localStorage.setItem("mensagem", "Ocorreu um erro ao Verificar Proposta!")
            return;
        }
        const resposta = await requisicao.json();
        
        if(resposta.status === 'error'){
            localStorage.setItem("status", "error");
            localStorage.setItem("mensagem", `${resposta.mensagem}`);
            window.location.href = `${window.location.origin}/frontend/pages/Home/`;
            return;
            
        }

        sessionStorage.setItem('idRepresentante', resposta.idRepresentante);

        // ENVIANDO DADOS DA PROPOSTA PARA VERIFICAR SE PROPOSTA ESTA PERTO DA DATA DE ACABAR OU ATRASADA
        avisoData(resposta);

        // loop para criar variáveis no localstorage que guardam os nifs dos gerentes para a comparação
        // na hora do update
        for (var x = 0; x < resposta['Gerentes'].length; x++) {
            localStorage.setItem(`gerente${x + 1}`, resposta['Gerentes'][x]['NIF']);
        }


        carregarTecnicos();



        //Enviando para o front-end os dados vindos do back end
        const nomeProposta = document.querySelector('#tituloProposta').value = resposta['TituloProposta'];
        const cnpj = document.querySelector('#cnpj').value = resposta['cnpj'];
        const uniCriadora = document.querySelector('#uniCriadora').value = resposta['uniCriadora'];
        const titleUniCriadora = document.querySelector('#uniCriadora').title = resposta['uniCriadora']
        const empresa = document.querySelector('#empresa').value = resposta['empresa'];
        const statusProposta = document.querySelector('#statusProposta').value = resposta['statusProposta'];
        const criadorProposta = document.querySelector('#criadorProposta').value = resposta['criadorProposta'];
        const numeroSGSET = document.querySelector('#numeroSGSET').value = resposta['numeroSGSET'];
        const dataPrimeiroProduto = document.querySelector('#dataPrimeiroProduto').value = resposta['dataPrimeiroProduto'];
        const dataUltimoProduto = document.querySelector('#dataUltimoProduto').value = resposta['dataUltimoProduto'];
        const valorTotalProdutos = document.querySelector('#valorTotalProdutos').value = (resposta['valorTotalProdutos'] == null) ? 0 : resposta['valorTotalProdutos'];
        selecionarFunil(resposta['StatusFunil']);
        // const primeiroGerente = document.querySelector('#primeiroGerente').value = resposta['Gerentes'][0]['Nome']; 
        const nomeContato = document.querySelector('#nomeContato').value = resposta['nomeContato'];
        const emailContato = document.querySelector('#emailContato').value = resposta['emailContato'];
        const numeroContato = document.querySelector('#numeroContato').value = resposta['numeroContato'];
        document.querySelector('#campoResumo').value = resposta['resumo']
        // const segundoGerente = document.querySelector('#segundoGerente').value = resposta['Gerentes'][1]?.['Nome'] || '';

        // verifica se existe numeroSGSET cadastrado para ser mostrado no titulo da pagina
        let TelaNomeProposta = ''
        
        if(resposta['numeroSGSET']) {
            let sgset
            if (resposta['numeroSGSET'] != ''){
                sgset = resposta['numeroSGSET'];

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

                sgset = mask;
            }
            document.querySelector('#nomeProposta').innerHTML = resposta['TituloProposta'] + ' | ' + sgset
        }else{
            document.querySelector('#nomeProposta').innerHTML = resposta['TituloProposta']
        }

        localStorage.setItem('statusProposta', resposta['statusProposta']);
        
        desativaBotoes()

    } catch (error) {
        console.error(error)
    }
}


// mascara do numero de celular
// function maskCelular(cel){
//     let mask = cel.split('')
//     let ret = '('
  
//     for (let i = 0; i < mask.length; i++) {
      
//       if(i == 1){
//         ret += mask[i] + ')'
//       }else{
//         ret += mask[i]
//       }    
//     }

//     console.log(ret)
//     return ret
//   }