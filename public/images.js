export const immages = (parentElement) => {
    let arrImag=[];
    return {
      build:(diz)=>{
        console.log(diz);
        arrImag=diz.immagini;

      },
      render:()=>{
        
            let html=`<div id="carouselExampleIndicators" class="carousel slide">
            <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">`;

                for(let i=0;i<arrImag.length;i++){
                    html+=` <div class="carousel-item active">
                        <img src="`+"./asset/immages/"+arrImag[i]+`" class="d-block w-75" alt="`+"Immagine carosello"+`">
                        </div>`
                }

            html+=`</div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
            </button>
        </div>`;
        console.log(document.querySelector("#container"));
    parentElement.innerHTML=html;

    }
    }
}