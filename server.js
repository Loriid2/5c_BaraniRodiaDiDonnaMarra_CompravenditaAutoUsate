

const bodyParser = require('body-parser');
const express = require("express");
const http = require('http');
const path = require('path');
const app = express();
const fs= require("fs");
const multer = require("multer");
const serverDB = require("./serverDB.js");
const { resolve } = require('url');
const mail=require("./invioEmail.js")();

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
      callback(null, path.join(__dirname, "public/asset/immages"));
  },
  filename: function (req, file, callback) {
      callback(null, file.originalname);
  }
});
const upload = multer({ storage: storage }).array('file', 3); 

app.post('/car/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error("Errore upload:", err);
      return res.status(500).json({ result: false, error: "Errore upload" });
    }

    if (!req.files || req.files.length !== 3) {
      return res.status(400).json({ result: false, error: "Devono essere caricati 3 file" });
    }

    const filenames = req.files.map(f => f.filename); // ["foto1.jpg", "foto2.png", "foto3.jpg"]
    console.log("File caricati:", filenames);

    res.json({ result: true, files: filenames });
  });
});

let automobili;
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
     // console.log("Risultati della query:", results);
      
      for(let i=0;i<results.length;i++){
        let auto=results[i]
      
        results[i].immagini=auto.immagini.split(",");

      };
     // let img=(results["immagini"]).split(",")
      //results.immagini=img;
      let auto=results;
      automobili=results;

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
 //console.log(automobili);
    res.json({result: automobili[indice]});
 
});
app.post("/car/sel",(req, res) => {
  //console.log(req);
  let user=req.body.utente;
  serverDB.getForUser(user).then(results=>{

    for(let i=0;i<results.length;i++){
      let auto=results[i]
    
      results[i].immagini=auto.immagini.split(",");
  
    };
   
    let auto=results;
    automobili=results;
  //console.log(auto);
    res.json({dati:auto})

  });

})
app.post("/car/register", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body);
  console.log("Username:", username, "   Email:", email, "   Password:", password);
  serverDB.register(username, email, password)
      .then(results => {
       //   console.log("Risultati della query:", results);
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
        //  console.log("Risultati della query:", results);
          res.json({
              result: results
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
    
    const titolo = String(req.body.titolo).trim();
    const descrizione = String(req.body.descrizione).trim();
    const prezzo = String(req.body.prezzo).trim();
    const marce = String(req.body.marce).trim();
    const potenza = String(req.body.potenza).trim();
    const km = String(req.body.km).trim();
    const luogoVendita = String(req.body.luogoVendita).trim();
    const carburante = String(req.body.carburante).trim();
    const Rapporto_Tara_Potenza = String(req.body.Rapporto_Tara_Potenza).trim();
    const marca = String(req.body.marca).trim();
    const modello = String(req.body.titolo).trim();
    const contatto= String(req.body.contatto).trim();
    const abstract = String(req.body.abstract).trim();
    const immagini=String(req.body.immagini).trim();
    console.log("Dati dell'auto:", req.body);
   // prezzo=prezzo.replaceAll(" ","");
    serverDB.insert(titolo, descrizione, prezzo, marce, potenza, km, luogoVendita, carburante, Rapporto_Tara_Potenza, marca, modello,contatto,abstract,immagini)
        .then(results => {
          //  console.log("Risultati della query:", results);
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

app.post('/send-email', async (req, res) => {
    const { to, subject, message } = req.body;

    if (!to || !subject || !message) {
      return res.status(400).send({ error: 'Parametri mancanti' });
    }

    try {
      const info = await mail.sendEmail(to, subject, message);
      res.send({ success: true, messageId: info.messageId });
    } catch (error) {
      res.status(500).send({ error: 'Errore durante l\'invio', details: error.message });
    }
  });

//mail.sendEmail("massivecm11@gmail.com","prova","prova di invio email");
serverDB.createTable();