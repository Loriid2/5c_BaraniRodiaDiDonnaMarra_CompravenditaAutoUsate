import { createNavigator } from "./navigator.js";
import { createCOI } from "./COI.js";
import { prewiew } from "./preview.js";
import{homepage}from"./homepage.js";
const home=homepage(document.getElementById("homePage"));
const navigator = createNavigator(document.querySelector("#container"));


const COI=createCOI();
const prewiewer=prewiew(document.getElementById("prewiews"));
let  diz={
    immages:["1.jpg","2.png","3.jpg"],
    titolo: "FIAT PUNTO",
    descrizione:"La Fiat Punto è una vettura compatta prodotta dalla casa automobilistica italiana Fiat, apprezzata per la sua versatilità, economia di esercizio e praticità urbana. Lanciata per la prima volta nel 1993, ha attraversato diverse generazioni, consolidandosi come una delle utilitarie più vendute in Europa. La Punto si distingue per le sue dimensioni contenute, ideali per la guida in città, ma con uno spazio interno sorprendentemente ampio per passeggeri e bagagli, rendendola adatta anche a piccoli viaggi. Il design, firmato da famosi studi italiani, coniuga linee morbide e dettagli moderni, offrendo un’estetica sobria ma gradevole. Sul piano meccanico, è disponibile in diverse motorizzazioni benzina e diesel, note per la loro affidabilità e consumi ridotti. La guida è fluida e intuitiva, con un assetto confortevole che assorbe bene le imperfezioni dell’asfalto. La Fiat Punto si rivolge a un pubblico eterogeneo: dai neopatentati, grazie ai bassi costi di gestione, alle famiglie alla ricerca di una seconda auto funzionale. Sebbene non sia più in produzione, continua a essere molto diffusa nel mercato dell’usato, grazie al suo ottimo rapporto qualità/prezzo e alla ricca disponibilità di pezzi di ricambio. In sintesi, una piccola grande utilitaria italiana. ",
    prezzo: "2.500",
    marce: "5",
    potenza:"55 KW",
    km:"30.000",
    luogoVendita:"Milano",
    carburante:"GPL",
    Rapporto_Tara_Potenza:"70 KW",
    marca:"FIAT",
    modello:"Punto",
    contatto:"...",
    abstract:"La Fiat Punto, lanciata nel 1993, è una compatta versatile e affidabile, ideale per la città grazie alle dimensioni ridotte e agli interni spaziosi. Economica nei consumi, comoda da guidare, è apprezzata da neopatentati e famiglie. Ancora diffusa sul mercato dell’usato per qualità/prezzo."
}

COI.build(document.getElementById("detailsCar"),document.getElementById("imagesCar"),document.getElementById("description"),document.getElementById("titleCar"),document.getElementById("price"),diz);
COI.render();


//prewiewer.build(diz);
//prewiewer.render();

home.build(diz);
home.render();
