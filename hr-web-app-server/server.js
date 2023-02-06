const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();

//Configuring express server
app.use(bodyParser.json());
app.use(cors())

//MySQL details
const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hr-web-app',
  multipleStatements: true
});

// Get all User 
app.get('/users', (req, res) => {
  mysqlConnection.query('SELECT * FROM user_info', (error, rows, fields) => {
    if (!error)
      res.send(rows);
    else
      console.log(error);
  })
});

// Get Single user_id
app.get('/users/:id', (req, res) => {
  mysqlConnection.query('SELECT * FROM user_info WHERE id = ?', [req.params.id], (error, rows, fields) => {
    if (!error)
      res.send(rows);
    else
      console.log(error);
  })
});

mysqlConnection.connect((error) => {
  if (!error)
    console.log('Connection Established Successfully');
  else
    console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
});

//Establish the server connection
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is Running on port ${port}`));
