import { createNavigator } from "./navigator.js";
import { createCOI } from "./COI.js";
import { prewiew } from "./preview.js";
import{homepage}from"./homepage.js";
import{createPages}from"./pages.js";
//import{invioEmail}from"./invioEmail.js";

//import { login } from "../serverDB.js";
import{createform}from "./formIns.js";



const form=createform(document.querySelector("#formInserimento"));

const navigator = createNavigator(document.querySelector("#container"));


const home=homepage(document.getElementById("homePage"));
const divMail=document.getElementById("divMail");
const mail=createPages(document.querySelector("#bottonMail"));
const formContainer = createPages(document.getElementById('formMail'));
const bottone=createPages(document.getElementById('formBottonMail'));

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
    form.build();
    form.setCallBack(aggiorna);
    form.render();
  }

function aggiorna(){
    navigator.update(document.querySelector("#container"));
    home.render(); 
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
               console.log(json.dati);
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

mail.onclick = () => {
  
  formContainer.render();
}