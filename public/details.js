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
            <div class="col testoBianco">
              `+"KM: "+`
            </div>
            <div class="col testoBianco">
              `+info.km+`
            </div>
            <div class="col testoBianco">
               `+"Marce: "+`
            </div>
            <div class="col testoBianco">
               `+info.marce+`
            </div>
            </div>
            <div class="row">
            <div class="col testoBianco">
               `+"Potenza: "+`
            </div>
            <div class="col testoBianco">
               `+info.potenza+"KW"+`
            </div>
            <div class="col testoBianco">
               `+"Carburante: "+`
            </div>
             <div class="col testoBianco">
               `+info.carburante+`
            </div>
            </div>
            <div class="row">
            <div class="col testoBianco">
               `+"Rapporto Tara/potenza: "+`
            </div>
             <div class="col testoBianco">
               `+info.rapportoTP+`
            </div>
            <div class="col testoBianco">
               `+"Marca: "+`
            </div>
            <div class="col testoBianco">
               `+info.marca+`
            </div>
            </div>
            <div class="row">
            <div class="col testoBianco">
               `+"Modello: "+`
            </div>
            <div class="col testoBianco">
               `+info.modello+`
            </div>
            <div class="col testoBianco">
               `+"Luogo di vendita : "+`
            </div>
            <div class="col testoBianco">
               `+info.luogoVendita+`
            </div>
            </div>
            </div>`;
    parentElement.innerHTML=html;

    }
    }
}