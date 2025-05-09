const fs = require('fs');
const conf = JSON.parse(fs.readFileSync("./conf.json"));
const nodemailer = require("nodemailer");
const invioEmail = () => {
  return {
    sendEmail: function (to, subject, message) {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "baranisimone@itis-molinari.eu",
          pass: conf.EMAIL_PASS,
        }
      });
      let mail = to;
      let mailOptions = {
        from: process.env.EMAIL_USER,
        to: mail,
        subject: subject,
        text: message
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log("Errore:", error);
        } else {
          console.log('Email inviata: ' + info.response);
        }
      });

      transporter.verify(function (error, success) {
        if (error) {
          console.log("Errore nella connessione SMTP:", error);
        } else {
          console.log("SMTP pronto per inviare");
        }
      });
    }
  }
}
module.exports = invioEmail;

  /*const express = require('express');
  const path = require('path');
  const mailer = require('./mailer');
  
  const app = express();
  app.use(express.json());
  app.use(express.static(path.join(__dirname, 'public'))); // Serve index.html

  app.post('/send-email', async (req, res) => {
    const { to, subject, message } = req.body;

    if (!to || !subject || !message) {
      return res.status(400).send({ error: 'Parametri mancanti' });
    }

    try {
      const info = await mailer.send(to, subject, message);
      res.send({ success: true, messageId: info.messageId });
    } catch (error) {
      res.status(500).send({ error: 'Errore durante l\'invio', details: error.message });
    }
  });

  const PORT = 80;
  app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
  });

  
  const mail = document.getElementById('bottonMail');


  const form = document.getElementById('emailForm');
  const resultBox = document.getElementBdyId('result');
     /*function toggleForm() {
      const formContainer = document.getElementById('emailForm');
      const contactBtn = document.getElementById('contactBtn');
      formContainer.classList.toggle('hidden');
      formContainer.classList.toggle('visible');

      contactBtn.style.display = 'none';
    }


    form.addEventListener('submit', async (e) => {
    e.preventDefault();

      const data = {
        to: form.to.value,
        subject: form.subject.value,
        message: form.message.value
      };

      resultBox.innerHTML = 'Invio in corso...';

      try {
        const res = await fetch('/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
      });

      const result = await res.json();
      if (res.ok) {
        resultBox.innerHTML = `<div class="alert alert-success">Email inviata con successo!</div>`;
      } else {
        resultBox.innerHTML = `<div class="alert alert-danger">Errore: ${result.error}</div>`;
      }
      } catch (err) {
        resultBox.innerHTML = `<div class="alert alert-danger">Errore di rete: ${err.message}</div>`;
      }
    });*/

