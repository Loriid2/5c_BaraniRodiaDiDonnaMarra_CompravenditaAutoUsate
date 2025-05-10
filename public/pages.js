export const createPages=(parentElement, middleware,emailutente)=>{
  let i;

    return{
        build:(val)=>{
            
            i=val;
        },
        render:()=>{

        let html=parentElement.innerHTML;
        console.info(document.getElementById("car="+i));
        if(document.getElementById("car="+i)==null){
          console.log("faccio questo");
        html+=`<div id="car=`+i+`" class="page hidden">
        <div class="container text-center">
            <!-----------header----------------->
            <div class="row">
              <div class="col">
               <a href="#pagina1"><button class="btn btn-dark">HOME</button></a>
              </div>
              <div class="col">
                <div id="titleCar`+i+`">Titolo di prova</div>
              </div>
              <div class="col">
                
              </div>
         </div>
         <hr>
         <!--------------------------------------------------->
         <!-----------immagine e dettagli----------------->
         <div class="row">
            <div class="col">
             <div id="imagesCar`+i+`">qui ci sarà limmagine</div>
            </div>
            <div class="col">
              <div id="detailsCar`+i+`">qui i dettagli elencati </div>
            </div>
            
         </div>
       <hr>
       <!--------------------------------------------------->
        <!-----------descrizione macchina----------------->
        <div class="row">
            <div class="col">
             <div id="description`+i+`">qui ci la descrizione</div>
            </div>
            
            
          </div>
        <hr>
       <!--------------------------------------------------->
        <!-----------dettagli finali ----------------->
        <div class="row">
            <div class="col">
             <div id="price`+i+`">prezzo</div>
            </div>
            <div class="col" id="divMail" >
              <form id="emailForm`+i+`">
                 <h2 class="mt-4">Invia un messaggio</h2>
                  
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
                  console.log("submitButton clicked");
                  //dovra essere preso dall utente
                  if(emailutente==null){
                     alert("Per inviare la mail devi essere loggato!");
                     return;
                  }
                   const to = document.getElementById("to"+i).value;
                   const subject = document.getElementById("subject"+i).value;
                   let message = document.getElementById("message"+i).value;
                   message += "\n Questa mail è stasta inviata da https://autocinetum.eu non risponerere a questa mail ma a quella del cliente.\n Sei stato contatattato da: "+emailutente ; 
                   if (!to || !subject || !message) {
                     alert("Tutti i campi sono obbligatori!");
                     return;
                   }
                  if(!to){
                    alert("Devi essere loggato!");
                     return;
                  }
                  middleware.sendEmail(to, subject, message);
                 };
               }

            }

        }
    }