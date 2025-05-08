

const bodyParser = require('body-parser');
const express = require("express");
const http = require('http');
const path = require('path');
const app = express();
const serverDB = require("./serverDB.js");

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






app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use("/", express.static(path.join(__dirname, "public")));
  const server = http.createServer(app);
  const port = 80;
  server.listen(port, () => {
    console.log("- server running on port: " + port);
  });
  app.get("/car/getall",(req,res) => {

    let auto=serverDB.getall().then(results => {
      console.log("Risultati della query:", results);
//res.json({dati:auto})
      //console.log(" effettuato con successo:", results);
  })
  .catch(error => {
      console.error("Errore durante il login:", error);
      res.status(500).json({
          result: false,
          error: "Errore durante il login"
      });
  });
   // console.log(auto);
         res.json({dati:automobili})
 });
 
app.post("/car/getone", (req, res) => {
  console.log("sono dentro la getone")
  const indice = req.body.index;
  
 console.info(req.body);
    res.json({result: automobili[indice]});
 
});

app.post("/car/register", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body);
  console.log("Username:", username, "   Email:", email, "   Password:", password);
  serverDB.register(username, email, password)
      .then(results => {
          console.log("Risultati della query:", results);
          res.json({
              result: results.affectedRows > 0
          });
          console.log("Registrazione effettuata con successo:", results);
      })
      .catch(error => {
          console.error("Errore durante la registrazione:", error);
          res.status(500).json({
              result: false,
              error: "Errore durante la registrazione"
          });
      });
});

app.post("/car/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log("Username:", username, "   Password:", password);
  serverDB.login(username, password)
      .then(results => {
          console.log("Risultati della query:", results);
          res.json({
              result: results.length > 0
          });
          console.log("Login effettuato con successo:", results);
      })
      .catch(error => {
          console.error("Errore durante il login:", error);
          res.status(500).json({
              result: false,
              error: "Errore durante il login"
          });
      });
});

app.post("/car/insert", (req, res) => {
    const titolo = req.body.titolo;
    const descrizione = req.body.descrizione;
    const prezzo = req.body.prezzo;
    const marce = req.body.marce;
    const potenza = req.body.potenza;
    const km = req.body.km;
    const luogoVendita = req.body.luogoVendita;
    const carburante = req.body.carburante;
    const Rapporto_Tara_Potenza = req.body.Rapporto_Tara_Potenza;
    const marca = req.body.marca;
    const modello = req.body.titolo;
    const contatto= req.body.contatto;
    console.log("Dati dell'auto:", req.body);
   // prezzo=prezzo.replaceAll(" ","");
    serverDB.insert(titolo, descrizione, prezzo.trim(), marce, potenza, km, luogoVendita, carburante, Rapporto_Tara_Potenza, marca, modello,contatto)
        .then(results => {
            console.log("Risultati della query:", results);
            res.json({
                result: results.affectedRows > 0
            });
            console.log("Auto inserita con successo:", results);
        })
        .catch(error => {
            console.error("Errore durante l'inserimento dell'auto:", error);
            res.status(500).json({
                result: false,
                error: "Errore durante l'inserimento dell'auto"
            });
        });
});
serverDB.createTable();