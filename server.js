// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('public')); // Servește fișierele statice din directorul 'public'

// Endpoint pentru a obține o întrebare aleatoare
app.get('/random-question', (req, res) => {
  const db = new sqlite3.Database('./Question.db', (err) => {
    if (err) {
      console.error('Error opening database: ' + err.message);
      res.status(500).send('Eroare la deschiderea bazei de date.');
    }
  });

  db.get("SELECT * FROM QES ORDER BY RANDOM() LIMIT 1", (err, row) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(row);
    }
  });

  db.close();
});

// Endpoint pentru ruta rădăcină
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'HTML File.html'));

});
app.get('/info', (req, res) => {
  res.sendFile(path.join(__dirname, 'Info.html'));
});

app.get('/back', (req, res) => {
  res.sendFile(path.join(__dirname, 'HTML File.html'));
});

app.listen(PORT, () => {
  console.log(`Serverul rulează pe http://localhost:${PORT}`);
});
