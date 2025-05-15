import { createNavigator } from "./navigator.js";
import { createCOI } from "./COI.js";
import{homepage}from"./homepage.js";
import{createPages}from"./pages.js";
import {autocomprate} from "./autoComprate.js";
import{createform}from "./formIns.js";
import{generateMiddleware}from"./middleware.js";

let loginButton = document.querySelector("#loginButton");
const loginNavbar= document.querySelector("#loginButtonHome");



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
          let emailutente=utente.email;
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