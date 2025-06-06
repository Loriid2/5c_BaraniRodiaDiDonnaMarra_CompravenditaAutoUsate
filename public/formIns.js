

export const createform = (parentElement) => {
  let callback;

  return {
    build: () => {


    },
    setCallBack(f) {
      callback = f;
    },
    render: () => {
      fetch("/car/getMarche")
        .then(response => response.json())
        .then(json => {
          //console.log(json);
          const marche = json.responce;

          let html = "";
          html += `
          
          <div class="mb-3">

            <label for="nomeMarca" class="form-label">Marca</label>
            <select id="nomeMarca" class="form-select" aria-label="Default select example">
            <option selected>Seleziona una marca</option>`
          for (let i = 0; i < marche.length; i++) {

            html += `<option value="` + (marche[i].Nome) + `">` + (marche[i].Nome) + `</option>`;
          }


          html += `
          </select>
          </div>
          <div class="mb-3">
            <label for="nomeModello" class="form-label">Nome Macchina</label>
            <label for="nomeModello" class="form-label">Modello</label>
            <select id="nomeModello" class="form-select" aria-label="Default select example">
            <option selected>Seleziona un modello</option>
            </select>
            <!--<input type="text" class="form-control" id="nomeModello" placeholder="Inserire Nome Modello">-->
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

         ` ;
          fetch("/car/getProvince")
            .then(response => response.json())
            .then(json => {
              //console.log(json);
              const province = json.responce;
             // console.log(province);
              html += `
                     <div class="mb-3">
            <label for="luogoVendita" class="form-label">Luogo Vendita</label>
            
                         <select id="luogoVendita" class="form-select" aria-label="Default select example">
            <option selected>Seleziona una provincia</option>`;
              for (let i = 0; i < province.length; i++) {

                html += `<option value="` + (province[i].Provincia) + `">` + (province[i].Provincia) + `</option>`;
              }


              html += `
          </select>
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
            <div class="mb-3">
            <label for="descrizione" class="form-label">Foto</label>
            <input id="file1" name="file" class="form-control " type="file" ></input>
            <input id="file2" name="file" class="form-control " type="file" ></input>
            <input id="file3" name="file" class="form-control " type="file" ></input>
          </div>
          <a href="#pagina1"><button type="button" id="invioForm" class="btn btn-primary">Invio</button><a>
        `;
              parentElement.innerHTML = html;



              const modelloSelect = document.querySelector("#nomeModello");
              const marcaSelect = document.querySelector("#nomeMarca");

              marcaSelect.onchange = function () {
                const marcaSelezionata = marcaSelect.value;

                if (marcaSelezionata === "Seleziona una marca") {
                  modelloSelect.innerHTML = `<option selected>Seleziona un modello</option>`;
                  return;
                }

                fetch("/car/getModello", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({ marca: marcaSelezionata })
                })
                  .then(response => response.json())
                  .then(json => {
                    const modelli = json.responce;
                    modelloSelect.innerHTML = `<option selected>Seleziona un modello</option>`;
                    console.log(modelli);
                    for (let i = 0; i < modelli.length; i++) {
                      modelloSelect.innerHTML += `<option value="${modelli[i].nome_Modello}">${modelli[i].nome_Modello}</option>`;
                    }
                  })
                  .catch(err => {
                    console.error("Errore nel recupero dei modelli:", err);
                  });
              };








              const invioFormButton = document.querySelector("#invioForm");
              //  console.log(invioFormButton);

              invioFormButton.onclick = () => {
                //  console.log("dentro");
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
                const contatto = document.querySelector("#contatto").value;
                const abstract = document.querySelector("#abstract").value;
                const inputFile1 = document.getElementById("file1");
                const inputFile2 = document.getElementById("file2");
                const inputFile3 = document.getElementById("file3");
                const file1 = inputFile1.files[0];
                const file2 = inputFile2.files[0];
                const file3 = inputFile3.files[0];

                if (!file1 || !file2 || !file3) {
                  console.error("Tutti e 3 i file devono essere selezionati!");
                } else {
                  const formData = new FormData();
                  formData.append("file", file1);
                  formData.append("file", file2);
                  formData.append("file", file3);

                  fetch("/car/upload", {
                    method: "POST",
                    body: formData
                  })
                    .then(response => response.json())
                    .then(json => {
                      const img = json.files.join(",");


                      fetch("/car/insert", {
                        method: 'POST',
                        headers: {
                          "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                          titolo: nomeModello,
                          marca: nomeMarca,
                          km: numerokm,
                          Rapporto_Tara_Potenza: rapportoTP,
                          potenza: potenza,
                          luogoVendita: luogoVendita,
                          marce: marce,
                          prezzo: prezzo,
                          carburante: carburante,
                          descrizione: descrizione,
                          contatto: contatto,
                          abstract: abstract,
                          immagini: img
                        })
                      })
                        .then(response => response.json())
                        .then(json => {
                          if (json.result) {
                            alert("Auto inserita con successo!");
                            callback();
                          } else {
                            alert("Errore durante l'inserimento dell'auto.");
                          }
                        });

                    })
                    .catch(err => {
                      console.error("Errore durante l'upload:", err);
                    });
                }

              }


            })
        })

    }
  }
}