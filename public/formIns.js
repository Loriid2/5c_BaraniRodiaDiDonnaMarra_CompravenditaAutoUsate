

export const createform=(parentElement)=>{
    let callback;
 
     return{
         build:()=>{
             
             
         },
         setCallBack(f){
            callback=f;
         },
         render:()=>{
 
         let html="";
         html+=`
          <form>
          <div class="mb-3">
            <label for="nomeMarca" class="form-label">Marca</label>
            <input type="text" class="form-control" id="nomeMarca" placeholder="Inserire Marca">
          </div>
          <div class="mb-3">
            <label for="nomeModello" class="form-label">Nome Macchina</label>
            <input type="text" class="form-control" id="nomeModello" placeholder="Inserire Nome Modello">
          </div>
          <div class="mb-3">
            <label for="numerokm" class="form-label">Numero Km</label>
            <input type="text" class="form-control" id="numerokm" placeholder="Inserire numero km">
          </div>
          <div class="mb-3">
            <label for="rapportoTP" class="form-label">Rapporto Tara Peso</label>
            <input type="text" class="form-control" id="rapportoTP" placeholder="Inserire Rapporto Tara Peso">
          </div>
          <div class="mb-3">
            <label for="potenza" class="form-label">Potenza</label>
            <input type="text" class="form-control" id="potenza" placeholder="Inserire Potenza">
          </div>
          <div class="mb-3">
            <label for="luogoVendita" class="form-label">Luogo Vendita</label>
            <input type="text" class="form-control" id="luogoVendita" placeholder="Inserire Luogo di Vendita">
          </div>
          <div class="mb-3">
            <label for="marce" class="form-label">Marce</label>
            <input type="text" class="form-control" id="marce" placeholder="Inserire Marce">
          </div>
          <div class="mb-3">
            <label for="prezzoMacchinaForm" class="form-label">Prezzo</label>
            <input type="text" class="form-control" id="prezzoMacchinaForm" placeholder="Inserire Prezzo">
          </div>
          <div class="mb-3">
            <label for="carburante" class="form-label">Carburante</label>
            <input type="text" class="form-control" id="carburante" placeholder="Inserire Tipo di Carburante">
          </div>
          <div class="mb-3">
            <label for="contatto" class="form-label">Contatto</label>
            <input type="text" class="form-control" id="contatto" placeholder="Inserire contatto">
          </div>
          <div class="mb-3">
            <label for="abstract" class="form-label">Abstract</label>
            <input type="text" class="form-control" id="abstract" placeholder="Inserire Riassunto">
          </div>
          <div class="mb-3">
            <label for="descrizione" class="form-label">Descrizione</label>
            <input type="text" class="form-control" id="descrizione" placeholder="Inserire Descrizione">
          </div>
          <button type="submit" id="invioForm" class="btn btn-primary">Invio</button>
        </form>`;
                parentElement.innerHTML=html;
                

                const invioFormButton = document.querySelector("#invioForm");
                console.log(invioFormButton);
                
                invioFormButton.onclick=()=>{
                  console.log("dentro");
                  const nomeModello = document.querySelector("#nomeModello").value;
                  //console.log(nomeModello);
                  const nomeMarca = document.querySelector("#nomeMarca").value;
                  const numerokm = document.querySelector("#numerokm").value;
                  const rapportoTP = document.querySelector("#rapportoTP").value;
                  const potenza = document.querySelector("#potenza").value;
                  const luogoVendita = document.querySelector("#luogoVendita").value;
                  const marce = document.querySelector("#marce").value;
                  const prezzo = document.querySelector("#prezzoMacchinaForm").value;
                  const carburante = document.querySelector("#carburante").value;
                  const descrizione = document.querySelector("#descrizione").value;
                  const contatto= document.querySelector("#contatto").value;
                  const abstract=document.querySelector("#abstract").value;
                  const img="1.jpg";
                  console.log(nomeModello,nomeMarca,numerokm,rapportoTP,potenza,luogoVendita,marce,prezzo,carburante,descrizione,contatto);
                    fetch("/car/insert", {
                      method: 'POST',
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify({ titolo: nomeModello, marca: nomeMarca, km: numerokm, Rapporto_Tara_Potenza: rapportoTP, potenza: potenza, luogoVendita: luogoVendita, marce: marce, prezzo: prezzo, carburante: carburante, descrizione: descrizione,contatto: contatto,abstract: abstract,immagini:img})
                    })
                      .then(response => response.json())
                      .then(json => {
                        if (json.result) {
                          console.log(json);
                          alert("Auto inserita con successo!"); // funzionante
                          /* da aggiungere qui la parte dove viene aggiunta alla home la macchina appena inserita su db (creando metodo)*/
                          callbackPromise()
                          
                        } else {
                          alert("Errore durante l'inserimento dell'auto.");
                        }
                      }); 
                }
 
         }
     }
 }