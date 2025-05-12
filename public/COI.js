import { immages } from "./images.js";
import { infos } from "./details.js";

export const createCOI=()=>{
    let info;
    let img;
    let description;
    let title;
    let dizionario;
    let prezzo;
    let nomef;
    let i;
    let email;

    return{
        build:(diz,val)=>{
            
            dizionario=diz
            i=val;
        },
        render:()=>{


         //console.info(dizionario);
            info=infos(document.getElementById("detailsCar"+i));
            //console.log(document.getElementById("imagesCar"+i));
            img=immages(document.getElementById("imagesCar"+i));
            description=document.getElementById("description"+i);
            title=document.getElementById("titleCar"+i);
            prezzo=document.getElementById("price"+i);
            email=document.getElementById("to"+i);
            img.build(dizionario);
            img.render();
            
            info.build(dizionario);
            info.render();
            title.innerHTML=`<h1 class=" testoBianco">`+dizionario.titolo+`</h1>`
            description.innerHTML=`<p class=" testoBianco">`+dizionario.descrizione+`</p>`
            prezzo.innerHTML=`<h1 class=" testoBianco">`+dizionario.prezzo+"€"+`</h1>`;
            email.value=dizionario.contatto;

        }
    }
}