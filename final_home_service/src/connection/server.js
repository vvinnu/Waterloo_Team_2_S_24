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

// Get services for logged-in users
app.get('/getservice', (req, res) => {
  const { u_id } = req.body;
  const sql = `
      SELECT 
          s.*,
          (SELECT si_image FROM serviceimage WHERE s_id = s.s_id LIMIT 1) AS img
      FROM services s
      ORDER BY s.s_id DESC
  `;

  db.query(sql, (err, result) => {
      if (err) {
          console.error('Error querying service data:', err);
          res.status(500).json({ status: 'Error', message: 'Database error' });
          return;
      }
      res.json(result);
  });
});

// Get services for non-logged-in users
app.get('/getservicenotlogin', (req, res) => {
  const sql = `
      SELECT 
          s.*,
          (SELECT si_image FROM serviceimage WHERE s_id = s.s_id LIMIT 1) AS img
      FROM services s
      ORDER BY s.s_id DESC
  `;

  db.query(sql, (err, result) => {
      if (err) {
          console.error('Error querying service data:', err);
          res.status(500).json({ status: 'Error', message: 'Database error' });
          return;
      }
      res.json(result);
  });
});


app.get('/servicedetail/:id', function (req, res) {
  const id = req.params.id;
  const value = [];
  
  const serviceSql = `SELECT * from services where s_id = ?`;
  db.query(serviceSql, [id], (err, result) => {
    if (err) {
      console.error('Error querying service data:', err);
      res.status(500).json({ status: 'error', message: 'Database error' });
      return;
    }
    
    if (result.length > 0) {
      result.forEach((service) => {
        value.push({ s_name: service.s_name, s_price: service.s_price, s_decs: service.s_decs, si_image: [] });
      });

      const imageSql = `SELECT si_image FROM serviceimage WHERE s_id = ?`;
      db.query(imageSql, [id], (err, imageResult) => {
        if (err) {
          console.error('Error querying service image data:', err);
          res.status(500).json({ status: 'error', message: 'Database error' });
          return;
        }
        
        const images = imageResult.map((img) => ({ image: img.si_image }));
        value[0].si_image = images;
        res.json(value);
      });
    } else {
      res.status(404).json({ status: 'error', message: 'Service not found' });
    }
  });
});

// Get products for logged-in users
app.post('/getproduct', (req, res) => {
  const userId = req.body.u_id;
  const query = 'SELECT * FROM product WHERE p_id IN (SELECT p_id FROM wishlist WHERE u_id = ?)';
  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

// Get products for not logged-in users
app.get('/getproductnotuser', (req, res) => {
  const query = 'SELECT * FROM product';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

// Add product to wishlist
app.post('/prowishlist', (req, res) => {
  const { pid, u_id } = req.body;
  const query = 'INSERT INTO wishlist (p_id, u_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE p_id = VALUES(p_id)';
  connection.query(query, [pid, u_id], (err, results) => {
    if (err) {
      console.error('Error adding product to wishlist:', err);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      return;
    }
    res.json({ status: 'success', message: 'Product added to wishlist' });
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
