export const createPages=(parentElement, middleware,emailutente)=>{
  let i;

    return{
        build:(val)=>{
            
            i=val;
        },
        render:()=>{

        let html=parentElement.innerHTML;
        //console.info(document.getElementById("car="+i));
        if(document.getElementById("errore"+i)!==null&&document.getElementById("errore"+i)!==undefined&&document.getElementById("ok"+i)!==null&&document.getElementById("ok"+i)!==undefined){
          document.getElementById("errore"+i).innerHTML="";
          document.getElementById("ok"+i).innerHTML="";
        }
        if(document.getElementById("car="+i)==null){
       //   console.log("faccio questo");
        html+=`<div id="car=`+i+`" class="page hidden">
        <div class="container text-center">
            <!-----------header----------------->
            <div class="row">
              <div class="col">
               <a href="#pagina1"><button id="bottoneRitornoHome${i}" class="btn btn-dark">HOME</button></a>
              </div>
              <div class="col">
                <div id="titleCar`+i+`" class="testoBianco">Titolo di prova</div>
              </div>
              <div class="col">
                
              </div>
         </div>
         <hr>
         <!--------------------------------------------------->
         <!-----------immagine e dettagli----------------->
         <div class="row">
            <div class="col">
             <div id="imagesCar`+i+`" class="testoBianco">qui ci sarà limmagine</div>
            </div>
            <div class="col">
              <div id="detailsCar`+i+`" class="testoBianco">qui i dettagli elencati </div>
            </div>
            
         </div>
       <hr>
       <!--------------------------------------------------->
        <!-----------descrizione macchina----------------->
        <div class="row">
            <div class="col">
             <div id="description`+i+`" class="testoBianco">qui ci la descrizione</div>
            </div>
            
            
          </div>
        <hr>
       <!--------------------------------------------------->
        <!-----------dettagli finali ----------------->
        <div class="row">
            <div class="col">
             <div id="price`+i+`" class="testoBianco">prezzo</div>
            </div>
            <div class="col" id="divMail" >
              <form id="emailForm`+i+`">
                 <h2 class="mt-4 testoBianco">Invia un messaggio</h2>
                  
                    <div class="mb-3">
                      <label class="form-label">Destinatario</label>
                      <input type="email" class="form-control" id="to`+i+`" disabled >
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Oggetto</label>
                      <input type="text" class="form-control" id="subject`+i+`" >
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Messaggio</label>
                      <input type="text" class="form-control" id="message`+i+`">
                    </div>
                    <button type="button" id="submit`+i+`" class="btn btn-success">Invia Email</button>
                     <div class="mb-3">
                      <label class="form-label errore" id="errore`+i+`"></label>
                      <label class="form-label ok" id="ok`+i+`"></label>
                    </div>
                </form>
            </div>
            
               </div>
               </div>`;
               parentElement.innerHTML=html;
              // console.log(html);
        }
               const submitButton = document.getElementById("submit"+i);
               if (submitButton) {
                 submitButton.onclick = () => {
                  let errore=document.getElementById("errore"+i);
                  let ok=document.getElementById("ok"+i);
                 // console.log("submitButton clicked");
                  //dovra essere preso dall utente
                  if(emailutente==null){
                    ok.innerHTML="";
                    errore.innerHTML="Per inviare la mail devi essere loggato!"
                    // alert("Per inviare la mail devi essere loggato!");
                     return;
                  }
                  //console.log(document.getElementById("titleCar"+i).innerHTML);
                   let titolo=document.getElementById("titleCar"+i).innerHTML;
                   titolo=titolo.replace("<h1 class=\" testoBianco\">","");
                   titolo=titolo.replace("</h1>","");
                   console.log(titolo);
                   let message="Buongiorno, ha ricevuto un nuovo messaggio per il suo annuncio : "+ titolo+"\nIl messaggio è il seguente: \n";
                   let to = document.getElementById("to"+i).value;
                   let subject = document.getElementById("subject"+i).value;
                    message += document.getElementById("message"+i).value;
                   document.getElementById("subject"+i).value="";
                   document.getElementById("message"+i).value="";
                   message += "\n\n\n Questa mail è stasta inviata da autocinetum non risponerere a questa mail ma a quella del cliente.\n Sei stato contatattato da: "+emailutente ; 
                   if (!to || !subject || !message) {
                    ok.innerHTML="";
                    errore.innerHTML="Tutti i campi sono obbligatori!"
                     //alert("Tutti i campi sono obbligatori!");
                     return;
                   }
                  if(!to){
                    alert("ERRORE");
                     return;
                  }
                    ok.innerHTML="Email inviata con successo";
                    errore.innerHTML=""
                  middleware.sendEmail(to, subject, message);
                 };
               }

            }

        }
    }