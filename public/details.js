export const infos = (parentElement) => {
    

    let info;

    return {
      build:(diz)=>{
        info={
            marce:diz.marce,
            potenza:diz.potenza,
            km:diz.km ,
            luogoVendita:diz.luogoVendita,
            carburante:diz.carburante,
            rapportoTP:diz.Rapporto_Tara_Potenza,
            marca:diz.marca,
            modello:diz.modello

        }
        
      },
      render:()=>{
        
            let html=`
            <div>
            <div class="row">
            <div class="col">
              `+"KM: "+`
            </div>
            <div class="col">
              `+info.km+`
            </div>
            <div class="col">
               `+"Marce: "+`
            </div>
            <div class="col">
               `+info.marce+`
            </div>
            </div>
            <div class="row">
            <div class="col">
               `+"Potenza: "+`
            </div>
            <div class="col">
               `+info.potenza+"KW"+`
            </div>
            <div class="col">
               `+"Carburante: "+`
            </div>
             <div class="col">
               `+info.carburante+`
            </div>
            </div>
            <div class="row">
            <div class="col">
               `+"Rapporto Tara/potenza: "+`
            </div>
             <div class="col">
               `+info.rapportoTP+`
            </div>
            <div class="col">
               `+"Marca: "+`
            </div>
            <div class="col">
               `+info.marca+`
            </div>
            </div>
            <div class="row">
            <div class="col">
               `+"Modello: "+`
            </div>
            <div class="col">
               `+info.modello+`
            </div>
            <div class="col">
               `+"Luogo di vendita : "+`
            </div>
            <div class="col">
               `+info.luogoVendita+`
            </div>
            </div>
            </div>`;
    parentElement.innerHTML=html;

    }
    }
}