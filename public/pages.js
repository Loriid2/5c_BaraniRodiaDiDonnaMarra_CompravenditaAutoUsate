

export const createPages=(parentElement)=>{
   let i;

    return{
        build:(val)=>{
            
            i=val;
        },
        render:()=>{

        let html=parentElement.innerHTML;
        html+=`<div id="car=`+i+`" class="page hidden">
        <div class="container text-center">
            <!-----------header----------------->
            <div class="row">
              <div class="col">
               <button><a href="#pagina1">HOME</a></button>
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
            <form id="formBottonMail" class="visible">
            <botton id="bottonMail" class="btn btn-primary">Contattaci</botton>
            </form>
              <form id="emailForm" class="hidden">
                 <h2 class="mt-4">Invia un messaggio</h2>
                  <form id="emailForm1">
                    <div class="mb-3">
                      <label for="to" class="form-label">Destinatario</label>
                      <input type="email" class="form-control" id="to" name="to" required>
                    </div>
                    <div class="mb-3">
                      <label for="subject" class="form-label">Oggetto</label>
                      <input type="text" class="form-control" id="subject" name="subject" required>
                    </div>
                    <div class="mb-3">
                      <label for="message" class="form-label">Messaggio</label>
                      <textarea class="form-control" id="message" name="message" rows="5" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-success">Invia Email</button>
                  </form>
          <div id="result" class="mt-3"></div>
                </form>
                <div id="result"></div>
            </div>
            
               </div>
               </div>
               </div>`;
               parentElement.innerHTML=html;
               console.log(html);

        }
    }
}