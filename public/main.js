import { createNavigator } from "./navigator.js";
import { createCOI } from "./COI.js";
import{homepage}from"./homepage.js";
import{createPages}from"./pages.js";
import {autocomprate} from "./autoComprate.js";
import{createform}from "./formIns.js";
import{generateMiddleware}from"./middleware.js";

const middleware=generateMiddleware();

const Comprate=autocomprate(document.querySelector("#autocomprate"));
const form=createform(document.querySelector("#formInserimento"));
const navigator = createNavigator(document.querySelector("#container"));
const home=homepage(document.getElementById("homePage"));
const loginButton = document.querySelector("#loginButton");
const invioRegisterButton = document.querySelector("#invioRegister"); 
const loginNavbar= document.querySelector("#loginButtonHome");
const registerNavbar= document.querySelector("#registerButtonHome");
const areaPersonaleNavbar = document.querySelector("#areaPersonaleButtonHome");
const openFormButton = document.querySelector("#aggiungiMacchina");

const COI=createCOI();


let automobili;
let emailutente;
openFormButton.onclick=()=>{
    form.build();
    form.setCallBack(aggiorna);
    form.render();

  }

function aggiorna(){
    
    fetch("/car/getall")
            .then(response => response.json())
            .then(json => {
               //console.log(json.dati);
               automobili=json.dati;
               home.render();
            });

}

invioRegisterButton.onclick=()=>{
  const username = document.querySelector("#usernameReg");
  const email = document.querySelector("#emailReg");
  const password = document.querySelector("#passwordReg");
  fetch("/car/register", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username: username.value, email: email.value, password: password.value })
  })
    .then(response => response.json())
    .then(json => {

      if (json.result) {
        document.getElementById("errreg").innerHTML="";
        document.getElementById("okreg").innerHTML="Registrazione avvenuta con successo. Effettua il login.";
        //alert("Registrazione avvenuta con successo. Effettua il login.");
      } else {
        document.getElementById("errreg").innerHTML="Registrazione fallita. Controlla i dati inseriti.";
        //alert("Registrazione fallita. Controlla i dati inseriti.");
        document.getElementById("okreg").innerHTML="";
      }
    });
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
          let utente=json.result[0];
         
          console.log(json);
          emailutente=utente.email;
          loginNavbar.classList.add("hidden");
          registerNavbar.classList.add("hidden");
          areaPersonaleNavbar.classList.remove("hidden");
          areaPersonaleNavbar.classList.add("visible");
         
            if(utente==null){
                console.log("help");
            }else{
                console.log(utente);

            Comprate.build({contatto:utente.email,});
            Comprate.render();
            Comprate.setCallBack(CarOfInterest);
            home.render()
            }

          navigator.update(document.querySelector("#container"));
          home.render();
        } else {
          document.getElementById("errlog").innerHTML="Login errato. controllare le credenziali."
          //alert("Login errato. controllare le credenziali.");
        }
      
      });
}

function CarOfInterest(index, pagina) {
    if (pagina === "" || pagina === null) {
      return;
    }
   console.info("indice: "+index+"\n pagina: "+pagina);
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
        console.log(dizionario);
        const coir = createPages(document.querySelector("#container"), middleware,emailutente);
        coir.build(index);
        coir.render();
        navigator.update(document.querySelector("#container"));
        COI.build(dizionario, index);
        COI.render();
      });
  }
  
fetch("/car/getall")
            .then(response => response.json())
            .then(json => {
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
