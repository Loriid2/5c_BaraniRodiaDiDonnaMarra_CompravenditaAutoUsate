import { createNavigator } from "./navigator.js";
import { createCOI } from "./COI.js";
import { prewiew } from "./preview.js";
import{homepage}from"./homepage.js";
import{createPages}from"./pages.js";

//import { login } from "../serverDB.js";





const navigator = createNavigator(document.querySelector("#container"));


const home=homepage(document.getElementById("homePage"));


const loginButton = document.querySelector("#loginButton");
const invioRegisterButton = document.querySelector("#invioRegister");
//da metterci il cambio di visibilità
const loginNavbar= document.querySelector("#login");
const registerNavbar= document.querySelector("#registrati");

//bottone per l'aggiunta dell'auto tramite form
const openFormButton = document.querySelector("#aggiungiMacchina");

const COI=createCOI();

let automobili;

openFormButton.onclick=()=>{
  let html=`
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
    const formContainer = document.querySelector("#formInserimento");
    formContainer.innerHTML = html;
    const invioFormButton = document.querySelector("#invioForm");
    console.log(invioFormButton);
    
    invioFormButton.onclick=()=>{
      //console.log("dentro");
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
      console.log(nomeModello,nomeMarca,numerokm,rapportoTP,potenza,luogoVendita,marce,prezzo,carburante,descrizione,contatto);
        fetch("/car/insert", {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ titolo: nomeModello, marca: nomeMarca, km: numerokm, Rapporto_Tara_Potenza: rapportoTP, potenza: potenza, luogoVendita: luogoVendita, marce: marce, prezzo: prezzo, carburante: carburante, descrizione: descrizione,contatto: contatto})
        })
          .then(response => response.json())
          .then(json => {
            if (json.result) {
              console.log(json);
              alert("Auto inserita con successo!"); // funzionante
              /* da aggiungere qui la parte dove viene aggiunta alla home la macchina appena inserita su db (creando metodo)*/
              navigator.update(document.querySelector("#container"));
              home.render(); 
            } else {
              alert("Errore durante l'inserimento dell'auto.");
            }
          }); 
    }
  }







invioRegisterButton.onclick=()=>{
  const username = document.querySelector("#username");
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  console.log("Username:", username, "   Email:", email, "   Password:", password);
}




loginButton.onclick=()=>{
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
    fetch("/car/login", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    })
      .then(response => response.json())
      .then(json => {
        if (json.result) {
          console.log(loginNavbar,registerNavbar);
          loginNavbar.classList.add("hidden");
          registerNavbar.classList.add("hidden");
          navigator.update(document.querySelector("#container"));
          home.render(); 
        } else {
          alert("Login errato. controllare le credenziali.");
        }
      });
}



function CarOfInterest(index, pagina) {
    if (pagina === "" || pagina === null) {
      return;
    }
  
    fetch("/car/getone", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ index: index })
    })
      .then(response => response.json())
      .then(json => {
        let dizionario = json.result;
        const coi = createPages(document.querySelector("#container"));
        coi.build(index);
        coi.render();
        navigator.update(document.querySelector("#container"));
        COI.build(dizionario, index);
        COI.render();
  
        
       // history.replaceState(null, "", window.location.pathname);
      });
  }
  

fetch("/car/getall")
            .then(response => response.json())
            .then(json => {
               //console.log(json.dati);
               automobili=json.dati;
               home.build(automobili);
               home.setCallBack(CarOfInterest);
               home.render();

            });


const hash = window.location.hash;
if (hash.startsWith("#car=")) {
    const index = parseInt(hash.replace("#car=", ""));
    if (!isNaN(index)) {
        CarOfInterest(index,hash);
    }
}
          

let lastHash = window.location.hash;

setInterval(() => {
  const currentHash = window.location.hash;

  if (currentHash !== lastHash) {
    lastHash = currentHash;

    if (currentHash.startsWith("#car=")) {
      const index = parseInt(currentHash.replace("#car=", ""));
      if (!isNaN(index)) {
        CarOfInterest(index, currentHash); // aggiorna pagina dettaglio
      }
    } else if (currentHash === "#pagina1" || currentHash === "#home") {
      home.render(); // torna alla homepage
    }
  }
}, 200); // controlla ogni 200ms

