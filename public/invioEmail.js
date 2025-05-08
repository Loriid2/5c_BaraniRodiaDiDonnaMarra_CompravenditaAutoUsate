export const invioEmail = () => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'youremail@gmail.com',
      pass: 'yourpassword'
    }
  }); 
  
  let mailOptions = {
    from: 'youremail@gmail.com',
    to: 'myfriend@yahoo.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
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
}
