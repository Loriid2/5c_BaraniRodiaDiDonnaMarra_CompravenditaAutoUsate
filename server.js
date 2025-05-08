

const bodyParser = require('body-parser');
const express = require("express");
const http = require('http');
const path = require('path');
const app = express();
const fs= require("fs");
const multer = require("multer");
const serverDB = require("./serverDB.js");


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
      for(let i=0;i<results.length;i++){
        let auto=results[i]
      
        results[i].immagini=auto.immagini.split(",");

      };
     // let img=(results["immagini"]).split(",")
      //results.immagini=img;
      let auto=results;
      res.json({dati:auto})
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
    //     res.json({dati:automobili})
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
    const abstract=req.body.abstract;
    const immagini=req.body.immagini;
    console.log("Dati dell'auto:", req.body);
   // prezzo=prezzo.replaceAll(" ","");
    serverDB.insert(titolo, descrizione, prezzo.trim(), marce, potenza, km, luogoVendita, carburante, Rapporto_Tara_Potenza, marca, modello,contatto,abstract,immagini)
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