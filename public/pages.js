

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
            <div class="col" id="mail">
            <botton id="mail" class="btn btn-primary">Contattaci</botton>
              <form id="emailForm" class="form-inline">
                
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