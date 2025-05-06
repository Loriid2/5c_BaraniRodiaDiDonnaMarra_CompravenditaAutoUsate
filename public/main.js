import { createNavigator } from "./navigator.js";
import { createCOI } from "./COI.js";
import { prewiew } from "./preview.js";
import{homepage}from"./homepage.js";
import{createPages}from"./pages.js";
const navigator = createNavigator(document.querySelector("#container"));


const home=homepage(document.getElementById("homePage"));
const loginButton = document.querySelector("#loginButton");

const COI=createCOI();

let automobili;




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
         
          navigator.update(document.querySelector("#container"));
          home.render();
        } else {
          alert("Login failed. Please check your credentials.");
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

