import { createCOI } from "./COI.js";
export const prewiew = (parentElement) => {
    

    let info;
    let dizionario;
    let COI;
    let i;
    let callback;
    return {
      build:(diz,cont)=>{
        //console.log("prew i " + diz);
        //console.log(diz);
        COI=createCOI();
        i=cont;
        dizionario=diz
        info={
            images:diz.immagini,
            marce:diz.marce,
            potenza:diz.potenza,
            km:diz.km ,
            luogoVendita:diz.luogoVendita,
            carburante:diz.carburante,
            rapportoTP:diz.Rapporto_Tara_Potenza,
            marca:diz.marca,
            modello:diz.modello,
            titolo:diz.titolo,
            descrizione:diz.abstract,
            prezzo:diz.prezzo,
            id:diz.id_auto
        }
        
      },
      setCallBack:(cb)=>{
        callback=cb;
      },
      render:()=>{
        
            let html=`
            <div class="card" style="width: 18rem;">
  <img src="asset/immages/`+info.images[0]+`" class="card-img-top" alt="immagine"> 
  <div class="card-body">
    <h5 class="card-title">`+info.titolo+`</h5>
    <hr>
    <div class="row">
              <div class="col">
               <b>km: </b><br>`+info.km+`
              </div>
              <div class="col">
                 <b>Rapporto TP:</b> `+info.rapportoTP+`
              </div>
              </div>
              <div class="row">
              <div class="col">
               <b>Potenza: </b><br>`+info.potenza+`
              </div>
              <div class="col">
                <b> Luogo Vendita: </b>`+info.luogoVendita+`
              </div>
              </div>
    <hr>
    <p>`+info.descrizione+`</p>
    <hr>
    <div class="row">
              <div class="col">
               <a href="#car=${info.id}" class="btn btn-primary" id="dett${i}">Dettagli</a>
              </div>
              <div class="col">
                 <b>`+info.prezzo+`</b>
              </div>
              </div>
    
   
  </div>
</div>`;

parentElement.innerHTML=html;


const bott= document.getElementById("dett"+i);
bott.onclick=()=>{
callback(i,"car="+i);
}
            
   


    }
    }
}