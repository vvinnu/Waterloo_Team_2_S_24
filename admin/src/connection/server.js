const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 4001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

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

// Route to handle admin registration
app.post('/adminreg', (req, res) => {
    const { a_name, a_email, a_password, a_mobile } = req.body;
    
    // Check if all fields are provided
    if (!a_name || !a_email || !a_password || !a_mobile) {
        return res.status(400).json({ status: 'Error', message: 'Please fill all fields' });
    }

    // SQL query to insert admin data into 'admin' table
    const sql = 'INSERT INTO admin (a_name, a_email, a_password, a_mobile) VALUES (?, ?, ?, ?)';
    db.query(sql, [a_name, a_email, a_password, a_mobile], (err, result) => {
        if (err) {
            console.error('Error executing SQL query: ' + err.stack);
            return res.status(500).json({ status: 'Error', message: 'Failed to register admin' });
        }
        // Respond with success message
        res.status(201).json({ status: 'Success', message: 'Admin registered successfully', id: result.insertId });
    });
});

// Start the server on port 4001
app.listen(4001, () => {
    console.log('Server started on port 4001');
});
