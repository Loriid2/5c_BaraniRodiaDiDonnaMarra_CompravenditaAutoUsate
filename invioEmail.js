const fs = require('fs');
const conf = JSON.parse(fs.readFileSync("./conf.json"));
const nodemailer = require("nodemailer");

const invioEmail = () => {
  return {
    sendEmail: function (to, subject, message) {
      return new Promise((resolve, reject) => {
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: "baranisimone@itis-molinari.eu",
            pass: conf.EMAIL_PASS,
          }
        });

        let mailOptions = {
          from: "baranisimone@itis-molinari.eu",
          to,
          subject,
          text: message
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log("Errore:", error);
            return reject(error);
          } else {
            console.log('Email inviata: ' + info.response);
            return resolve(info);
          }
        });
      });
    }
  };
};

module.exports = invioEmail;
