const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// MySQL connection
const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
});

connection.connect();

// Create table if not exists
connection.query(`CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name VARCHAR(255), primary key(id))`);

// Add a name
const sql = `INSERT INTO people(name) VALUES('Nome ${Math.floor(Math.random() * 100)}')`;
connection.query(sql);

app.get('/', (req, res) => {
  connection.query('SELECT name FROM people', (err, results) => {
    if (err) throw err;

    const names = results.map(row => row.name).join('<br>');
    res.send(`<h1>Full Cycle Rocks!</h1><br>${names}`);
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
