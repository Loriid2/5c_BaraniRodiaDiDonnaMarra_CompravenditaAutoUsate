import { createNavigator } from "./navigator.js";
import { createCOI } from "./COI.js";
import { prewiew } from "./preview.js";
import{homepage}from"./homepage.js";
const home=homepage(document.getElementById("homePage"));
const navigator = createNavigator(document.querySelector("#container"));


const COI=createCOI();
const prewiewer=prewiew(document.getElementById("prewiews"));
let  automobili = [
    {
        immages: ["1.jpg", "2.png", "3.jpg"],
        titolo: "FIAT PUNTO",
        descrizione: "La Fiat Punto è una vettura compatta prodotta dalla casa automobilistica italiana Fiat, apprezzata per la sua versatilità, economia di esercizio e praticità urbana...",
        prezzo: "2.500",
        marce: "5",
        potenza: "55 KW",
        km: "30.000",
        luogoVendita: "Milano",
        carburante: "GPL",
        Rapporto_Tara_Potenza: "70 KW",
        marca: "FIAT",
        modello: "Punto",
        contatto: "...",
        abstract: "La Fiat Punto, lanciata nel 1993, è una compatta versatile e affidabile..."
    },
    {
        immages: ["audi1.png", "audi2.png", "audi3.png"],
        titolo: "AUDI A3",
        descrizione: "L'Audi A3 è una berlina compatta premium, sinonimo di eleganza, tecnologia e prestazioni. Prodotta dalla casa automobilistica tedesca Audi fin dal 1996, si distingue per la qualità costruttiva superiore, le finiture curate e una guida precisa. Disponibile con una vasta gamma di motorizzazioni benzina, diesel e ibride, la A3 offre comfort e sicurezza ai massimi livelli. Ideale per chi cerca una compatta dinamica ma raffinata.",
        prezzo: "13.500",
        marce: "6",
        potenza: "110 KW",
        km: "75.000",
        luogoVendita: "Torino",
        carburante: "Diesel",
        Rapporto_Tara_Potenza: "85 KW",
        marca: "AUDI",
        modello: "A3",
        contatto: "...",
        abstract: "L'Audi A3, lanciata nel 1996, è una berlina compatta premium nota per qualità, tecnologia e piacere di guida."
    },
    {
        immages: ["golf1.jpg", "golf2.jpg", "golf3.jpg"],
        titolo: "VOLKSWAGEN GOLF",
        descrizione: "La Volkswagen Golf è una delle compatte più iconiche del mercato globale. Prodotta dal 1974, ha saputo rinnovarsi generazione dopo generazione, mantenendo un perfetto equilibrio tra praticità, qualità e piacere di guida. Disponibile in varianti benzina, diesel, ibride ed elettriche, la Golf è adatta a un pubblico molto ampio, grazie alla sua affidabilità e alla vasta rete di assistenza.",
        prezzo: "9.900",
        marce: "6",
        potenza: "90 KW",
        km: "60.000",
        luogoVendita: "Roma",
        carburante: "Benzina",
        Rapporto_Tara_Potenza: "80 KW",
        marca: "VOLKSWAGEN",
        modello: "Golf",
        contatto: "...",
        abstract: "La Volkswagen Golf è sinonimo di affidabilità e versatilità, una delle auto più amate a livello mondiale."
    },
    {
        immages: ["clio1.jpg", "clio2.jpg", "clio3.jpg"],
        titolo: "RENAULT CLIO",
        descrizione: "La Renault Clio è una compatta francese amata per il design moderno, la tecnologia intuitiva e i consumi contenuti. Dal suo debutto nel 1990, la Clio ha saputo conquistare milioni di automobilisti europei, diventando una delle utilitarie più vendute. Particolarmente apprezzata anche per la sua agilità urbana e per l'ottimo rapporto qualità/prezzo.",
        prezzo: "7.200",
        marce: "5",
        potenza: "66 KW",
        km: "45.000",
        luogoVendita: "Napoli",
        carburante: "Diesel",
        Rapporto_Tara_Potenza: "68 KW",
        marca: "RENAULT",
        modello: "Clio",
        contatto: "...",
        abstract: "La Renault Clio offre uno stile moderno, consumi ridotti e tanta praticità, perfetta per l’uso quotidiano."
    },
    
    {
        immages: ["yaris1.jpg", "yaris2.jpg", "yaris3.jpg"],
        titolo: "TOYOTA YARIS",
        descrizione: "La Toyota Yaris è una citycar affidabile e innovativa, molto apprezzata per la qualità costruttiva e i bassi consumi. Lanciata nel 1999, è disponibile in motorizzazioni benzina e ibride, risultando particolarmente economica nell'uso urbano. La Yaris si distingue anche per la sicurezza, con dotazioni all'avanguardia in ogni versione.",
        prezzo: "8.800",
        marce: "5",
        potenza: "74 KW",
        km: "40.000",
        luogoVendita: "Bologna",
        carburante: "Ibrida",
        Rapporto_Tara_Potenza: "72 KW",
        marca: "TOYOTA",
        modello: "Yaris",
        contatto: "...",
        abstract: "La Toyota Yaris è una citycar compatta e sicura, ideale per chi cerca un’auto economica ed ecologica per la città."
    }
];
let diz={};
/*
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
*/
COI.build(document.getElementById("detailsCar"),document.getElementById("imagesCar"),document.getElementById("description"),document.getElementById("titleCar"),document.getElementById("price"),automobili[0]);
COI.render();


//prewiewer.build(diz);
//prewiewer.render();

home.build(automobili);
home.render();
