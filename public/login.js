import {autocomprate} from "./autoComprate.js";
export const login = (parentElement) => {
    
let cbv;
let utentemail;
    
    return {
      build:()=>{
        
        
        
      },
      setCallBack:(cb)=>{
      cbv=cb;
      },
      utente:()=>{
        console.log("utente: "+ utentemail)
        if(utentemail===null||utentemail===undefined){
          return 0;
        }else{
          return utentemail;
        }
      },
      render:async()=>{
        
            let html=`
            
         <div class="row">
            <div class="col"> <a href="#pagina1"><button type="button" class="btn btn-primary" id="tornaHome">HOME</button></a></div>
            <div class="col"> </div>
         </div>
         <div class="row">
            <div class="col testoBianco">Username:</div>
            <div class="col"> <input type="text" id="username" class="form-control" placeholder="Username" required></div>
         </div>
         <div class="row">
            <div class="col testoBianco">Password:</div>
            <div class="col"> <input type="password" id="password" class="form-control" placeholder="Password" required></div>
         </div>
         <div class="row">
            <div class="col"></div>
            <div class="col"> <button id="loginButton" class="btn btn-light"><a href="#pagina1">Login</a></button></div>
         </div>
         <div class="row">
          <div class="col ">
            <div class="errore" id="errlog"></div>
            <div class="ok" id="oklog"></div>
            
          </div>
          <div class="col"> </div>
       </div>`;
           

parentElement.innerHTML=html;

/*
const bott= document.getElementById("loginButton");
bott.onclick=()=>{
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
        //console.log(json);
        if (json.result) {
          let utente=json.result;
         utentemail=utente.email;
          //console.log(utente);
         
          let emailutente=utente.email;
          let loginNavbar=document.querySelector("#loginButtonHome");
          let areaPersonaleNavbar =document.querySelector("#areaPersonaleButtonHome");
          let registerNavbar=document.querySelector("#registerButtonHome");
          const Comprate=autocomprate(document.querySelector("#autocomprate"));
          loginNavbar.classList.add("hidden");
          registerNavbar.classList.add("hidden");
          areaPersonaleNavbar.classList.remove("hidden");
          areaPersonaleNavbar.classList.add("visible");
         
            if(utente==null){
               // console.log("help");
            }else{
                //console.log(utente);

            Comprate.build({contatto:utente.email,});
            Comprate.render();
            Comprate.setCallBack(cbv);
            console.log(utentemail);
            //return emailutente;
            resolve(utente);
           // home.render()
            }
          
          //navigator.update(document.querySelector("#container"));
         // home.render();
        } else {
          document.getElementById("errlog").innerHTML="Login errato. controllare le credenziali."
          //alert("Login errato. controllare le credenziali.");
        }
      
      });

}
      */

 return new Promise((resolve, reject) => {
    const bott = document.getElementById("loginButton");

    bott.onclick = () => {
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
            let utente = json.result;
            let emailutente = utente.email;

            
            let loginNavbar = document.querySelector("#loginButtonHome");
            let areaPersonaleNavbar = document.querySelector("#areaPersonaleButtonHome");
            let registerNavbar = document.querySelector("#registerButtonHome");

            loginNavbar.classList.add("hidden");
            registerNavbar.classList.add("hidden");
            areaPersonaleNavbar.classList.remove("hidden");
            areaPersonaleNavbar.classList.add("visible");

            // costruisci interfaccia
            const Comprate = autocomprate(document.querySelector("#autocomprate"));
            Comprate.build({ contatto: utente.email });
            Comprate.render();
            Comprate.setCallBack(cbv);

            resolve(utente.email);  
          } else {
            document.getElementById("errlog").innerHTML = "Login errato. controllare le credenziali.";
            resolve(null);  // login fallito ma gestito
          }
        })
        .catch(err => {
          console.error("Errore durante il login:", err);
          reject(err);  
        });
    };
  });

     }
}
}