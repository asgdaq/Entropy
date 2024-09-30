const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./Question.db');

db.serialize(() => {
  // Creează tabela
  db.run("CREATE TABLE IF NOT EXISTS QES (RANDOM_NR INTEGER UNIQUE, NAME TEXT)");

  // Adaugă date în tabel (exemplu)
  const stmt = db.prepare("INSERT OR IGNORE INTO QES (RANDOM_NR, NAME) VALUES (?, ?)");
  stmt.run(1111, "Întrebare 1");

  stmt.finalize();
});

db.close();
