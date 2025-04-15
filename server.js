/*
chiamata api 
/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?select=*&where=model%3D%22Yaris%22%20and%20fueltype%3D%22Regular%22&limit=20
sito 
https://public.opendatasoft.com/explore/dataset/all-vehicles-model/api/?sort=modifiedon
*/

const bodyParser = require('body-parser');
const express = require("express");
const http = require('http');
const path = require('path');
const app = express();
const database = require("./database");
database.createTables();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist/")));

app.post("/insert", async (req, res) => {
    const annuncio = req.body;
    try {
      await database.insert(annuncio);
      res.json({result: "ok"});
    } catch (e) {
      console.error(e)
      res.status(500).json({result: "ko"});
    }
  })
  app.get('/bookings', async (req, res) => {
      const list = await database.selectAnnuncio();
      res.json(list);
  });
  app.delete('/delete/:id', async (req, res) => {
    await database.delete(req.params.id);
    res.json({result: "ok"});
  })
  const server = http.createServer(app);
  const port = 5600;
  server.listen(port, () => {
    console.log("- server running on port: " + port);
  });
  
  app.get('/types', async (req, res) => {
    const list = await database.selectTypes();
    res.json(list);
  });