// EXIBIR ALERTA SE ESTA PERTO DA DATA FINAL
export default function avisoData(res){
    
    if(res.dataUltimoProduto == null){
        console.log('nenhum produto cadastrado!')
    }else if(res.statusProposta == 'Em Análise' || res.statusProposta == 'Aceito'){

        let alertaData = document.querySelector('#alertaData')
        let date = new Date()
        date = date.toLocaleDateString()
        
        // SALVANDO DATAS EM OBEJETOS PARA SEREM CONSUMIDAS E SAPARADAS FUTURAMENTE
        const dataAtual={
            dia: date[0].toString() + date[1].toString(),
            mes: date[3].toString() + date[4].toString(),
            ano: date[8].toString() + date[9].toString()
        }
        const dataFinal={
            dia: res.dataUltimoProduto[8].toString() + res.dataUltimoProduto[9].toString(),
            mes: res.dataUltimoProduto[5].toString() + res.dataUltimoProduto[6].toString(),
            ano: res.dataUltimoProduto[2].toString() + res.dataUltimoProduto[3].toString()
        }
        
        // VERIFICA SE ESTA NO MESMO ANO
        if(dataAtual.ano == dataFinal.ano){
    
            // VERIFICA SE ESTA NO MESMO MES
            if(dataAtual.mes == dataFinal.mes){
                
                // VERIFICA SE FALTAM MENOS DE 10 DIAS PARA O FINAL DA PROPOSTA
                if(dataFinal.dia - dataAtual.dia <= 10 && Math.sign(dataFinal.dia - dataAtual.dia) != -1){
                    // AVISO QUE ESTA PROXIMO HA DATA FINAL
                    alertaData.innerHTML ='faltam '+ (dataFinal.dia - dataAtual.dia) +' dia(s) para o final da proposta'
                    alertaData.classList.add('text-color-orange')
                    alertaData.classList.add('bg-color-orange/20')
                }else{
                    alertaData.innerHTML ='proposta atrasada em '+ (dataAtual.dia - dataFinal.dia) +' dia(s)'
                    alertaData.classList.add('text-btn-red')
                    alertaData.classList.add('bg-btn-red/20')
                }
            }else{
                
                // SALVA QUANTIDADE DE DIAS DO MES
                let mesAtual = new Date(dataAtual.ano, dataAtual.mes, 0)
                mesAtual = mesAtual.getDate()
                
                // calcula dias que faltam para o final do mes com base no dia atual
                let diasRestantesMes = mesAtual - dataAtual.dia
                
                if(diasRestantesMes < 10){
                    console.log('MENOS de 10 dia(s) para o fim do mes!')
                    
                    // VERIFICA SE FALTAM MENOS DE 10 DIAS PARA O FINAL DA PROPOSTA
                    if(diasRestantesMes + parseInt(dataFinal.dia) <= 10){
                        alertaData.innerHTML ='faltam '+ (diasRestantesMes + parseInt(dataFinal.dia)) +' dia(s) para o final da proposta'
                        alertaData.classList.add('text-color-orange')
                        alertaData.classList.add('bg-color-orange/20')
                    }
                }
            }
        
        }
    }else{
        console.log('Proposta concluida ou declinada')
    }
}