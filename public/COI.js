import { immages } from "./images.js";
import { infos } from "./details.js";

export const createCOI=()=>{
    let info;
    let img;
    let description;
    let title;
    let dizionario;
    let prezzo;

    return{
        build:(inf,im,de,ti,pr,diz)=>{
            info=infos(inf);
            img=immages(im);
            description=de;
            title=ti;
            prezzo=pr;
            dizionario=diz
        },
        render:()=>{
            img.build(dizionario);
            img.render();
            
            info.build(dizionario);
            info.render();
            title.innerHTML="<h1>"+dizionario.titolo+"</h1>"
            description.innerHTML="<p>"+dizionario.descrizione+"</p>"
            prezzo.innerHTML="<h1>"+dizionario.prezzo+"€"+"</h1>";

        }
    }
}