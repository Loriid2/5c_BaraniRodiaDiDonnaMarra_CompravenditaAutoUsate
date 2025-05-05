const fs = require('fs');
const { register } = require('module');
const mysql = require('mysql2');
const conf = JSON.parse(fs.readFileSync("./conf.json")).dbInfo;
conf.ssl = {
    ca: fs.readFileSync(__dirname + '/ca.pem')
}
const connection = mysql.createConnection(conf);

const executeQuery = (sql) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, function (err, result) {
            if (err) {
                console.error(err);
                reject(err);
            }
            console.log('done');
            resolve(result);
        });
    });
};
const serverDB = {
    createTable: function () {
        return executeQuery(`
        CREATE TABLE IF NOT EXISTS AutoDettagli (
                id_auto INT PRIMARY KEY AUTO_INCREMENT,
                immagini VARCHAR(255),
                titolo VARCHAR(255) NOT NULL,
                descrizione TEXT,
                prezzo DECIMAL(10, 2) NOT NULL,
                marce INT,
                potenza VARCHAR(50),
                km INT,
                luogoVendita VARCHAR(255),
                carburante VARCHAR(50),
                Rapporto_Tara_Potenza VARCHAR(50),
                marca VARCHAR(255),
                modello VARCHAR(255),
                contatto VARCHAR(255),
                abstract TEXT
        );
        `);
    },
    login: function (username, password) {
        return executeQuery(`SELECT * FROM credenziali WHERE nome = '${username}' AND password = '${password}'`);
    },
    register: function (username, email ,password) {
        return executeQuery(`INSERT INTO credenziali (nome, email, password) VALUES ('${username}', '${email}', '${password}')`);
    },
    
};

module.exports = serverDB;