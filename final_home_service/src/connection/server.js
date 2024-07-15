const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'home_service',
    multipleStatements: true
});
db.connect(function(err) {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to database successfully');
});

module.exports = db;

// Registration endpoint
app.post('/reg', (req, res) => {
  const { email, password, rpassword, mobile, fname, lname } = req.body;

  const sql = `INSERT INTO users (email, password, mobile, fname, lname) VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [email, password, mobile, fname, lname], (err, result) => {
      if (err) {
          console.error('Error inserting data:', err);
          res.status(500).json({ status: 'Error', message: 'Database error' });
          return;
      }
      res.json({ status: 'Success', message: 'User registered successfully', id: result.insertId });
  });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [username, password], (err, result) => {
      if (err) {
          console.error('Error querying data:', err);
          res.status(500).json({ status: 'Error', message: 'Database error' });
          return;
      }

      if (result.length > 0) {
          res.json({ status: 'Success', message: 'Login successful', user: result[0] });
      } else {
          res.status(401).json({ status: 'Error', message: 'Invalid username or password' });
      }
  });
});

// Get team members endpoint
app.get('/getteam', (req, res) => {
  const sql = 'SELECT * FROM team';
  db.query(sql, (err, result) => {
      if (err) {
          console.error('Error querying team data:', err);
          res.status(500).json({ status: 'Error', message: 'Database error' });
          return;
      }
      res.json(result);
  });
});

// Handles any requests that don't match the above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:3001`);
});
