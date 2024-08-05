const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const multer = require('multer');

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
    const { name, email, password, phone } = req.body;

    // Basic validation
    if (!name || !email || !password || !phone) {
        return res.json({ status: 'Error', message: 'Please fill all fields' });
    }

    // Check if user already exists
    db.query('SELECT * FROM admin_t WHERE a_email = ?', [email], (err, results) => {
        if (err) {
            console.error('Error checking existing user:', err);
            return res.json({ status: 'Error', message: 'An error occurred' });
        }
        if (results.length > 0) {
            return res.json({ status: 'Error', message: 'Email already exists' });
        }

        // Insert new user into the database
        db.query('INSERT INTO admin_t (a_name, a_email, a_password, a_mobile) VALUES (?, ?, ?, ?)', [name, email, password, phone], (err, results) => {
            if (err) {
                console.error('Error inserting new user:', err);
                return res.json({ status: 'Error', message: 'An error occurred' });
            }
            res.json({ status: 'Success', message: 'Registration successful' });
        });
    });
});


// Login route
app.post('/adminlog', (req, res) => {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
        return res.json({ status: 'Error', message: 'Please fill all fields' });
    }

    // Query to check user credentials
    db.query('SELECT * FROM admin_t WHERE a_email = ? AND a_password = ?', [username, password], (err, results) => {
        if (err) {
            console.error('Error checking user credentials:', err);
            return res.json({ status: 'Error', message: 'An error occurred' });
        }
        if (results.length > 0) {
            // Login successful
            const user = results[0];
            res.json({ status: 'Success', user });
        } else {
            // Invalid credentials
            res.json({ status: 'Error', message: 'Invalid username or password' });
        }
    });
});

// Route to hande when not logged in
app.get('/getservicenotlogin', (req, res) => {
    const sql = 'SELECT * FROM services';  // Update this query to match your table
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

// Route to handle Category Modifications

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Change this to the folder where you want to save files
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to avoid file name conflicts
    }
  });
  const upload = multer({ storage: storage });

// Add category route
app.post('/category', upload.single('files'), (req, res) => {
    const { name } = req.body;
    const file = req.file ? req.file.filename : 'default.jpg';
    db.query('INSERT INTO category (c_name, c_img) VALUES (?, ?)', [name, file], (err, results) => {
        if (err) {
            console.error('Error adding category:', err);
            return res.json({ status: 'Error', message: 'An error occurred' });
        }
        res.json({ status: 'Success', message: 'Category added successfully' });
    });
});

// Get categories route
app.get('/getcategory', (req, res) => {
    db.query('SELECT * FROM category', (err, results) => {
        if (err) {
            console.error('Error retrieving categories:', err);
            return res.json({ status: 'Error', message: 'An error occurred' });
        }
        res.json(results);
    });
});

// Delete category route
app.post('/delcategory', (req, res) => {
    const { cid } = req.body;
    db.query('DELETE FROM category WHERE c_id = ?', [cid], (err, results) => {
        if (err) {
            console.error('Error deleting category:', err);
            return res.json({ status: 'Error', message: 'An error occurred' });
        }
        if (results.affectedRows > 0) {
            res.json({ status: 'Success', message: 'Category deleted successfully' });
        } else {
            res.json({ status: 'Error', message: 'Category not found' });
        }
    });
});

// Route to handle Service Modifications

// Add service route
app.post('/service', upload.single('files'), (req, res) => {
    const { name } = req.body;
    const file = req.file ? req.file.filename : 'default.jpg';
    db.query('INSERT INTO service (s_name, s_img) VALUES (?, ?)', [name, file], (err, results) => {
        if (err) {
            console.error('Error adding service:', err);
            return res.json({ status: 'Error', message: 'An error occurred' });
        }
        res.json({ status: 'Success', message: 'Service added successfully' });
    });
});

// Create new service
app.post('/services', upload.array('files'), (req, res) => {
    const { cid, name, price, desc } = req.body;
    const files = req.files;
  
    // Insert service details into the database
    const sql = 'INSERT INTO services (c_id, s_name, s_price, s_decs) VALUES (?, ?, ?, ?)';
    db.query(sql, [cid, name, price, desc], (err, result) => {
      if (err) throw err;
  
      // Handle file uploads
      files.forEach(file => {
        const filePath = path.join('uploads', file.filename);
        // Save file info to a file info table if needed
      });
  
      res.json({ status: 'Success', message: 'Service added successfully' });
    });
  });

// Get services route
app.get('/getservice', (req, res) => {
    db.query('SELECT * FROM service', (err, results) => {
        if (err) {
            console.error('Error retrieving services:', err);
            return res.json({ status: 'Error', message: 'An error occurred' });
        }
        res.json(results);
    });
});

// Update service status
app.post('/servicestatus', (req, res) => {
    const { sid } = req.body;
    // Toggle status between 0 and 1
    const sql = 'UPDATE services SET status = IF(status = 1, 0, 1) WHERE s_id = ?';
    db.query(sql, [sid], (err, result) => {
      if (err) throw err;
      res.json({ status: 'Success', message: 'Service status updated successfully' });
    });
  });

// Delete service route
app.post('/delservice', (req, res) => {
    const { sid } = req.body;
    db.query('DELETE FROM service WHERE s_id = ?', [sid], (err, results) => {
        if (err) {
            console.error('Error deleting service:', err);
            return res.json({ status: 'Error', message: 'An error occurred' });
        }
        if (results.affectedRows > 0) {
            res.json({ status: 'Success', message: 'Service deleted successfully' });
        } else {
            res.json({ status: 'Error', message: 'Service not found' });
        }
    });
});
// Serve static files from the "uploads" directory
app.use('/images', express.static('uploads'));

// Country Routes

// Get all countries
app.get('/getcountry', (req, res) => {
    db.query('SELECT * FROM country', (err, results) => {
        if (err) {
            console.error('Error retrieving countries:', err);
            return res.json({ status: 'Error', message: 'An error occurred' });
        }
        res.json(results);
    });
});

// Get a single country
app.get('/editcountry/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM country WHERE con_id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error retrieving country:', err);
            return res.json({ status: 'Error', message: 'An error occurred' });
        }
        res.json(results);
    });
});

// Update country
app.post('/updatecountry', (req, res) => {
    const { con_id, con_name } = req.body;
    db.query('UPDATE country SET con_name = ? WHERE con_id = ?', [con_name, con_id], (err, results) => {
        if (err) {
            console.error('Error updating country:', err);
            return res.json({ status: 'Error', message: 'An error occurred' });
        }
        res.json({ status: 'Success', message: 'Country updated successfully' });
    });
});

// Get all states
app.get('/getState', (req, res) => {
    const sql = `
      SELECT s.sta_id, s.con_id, s.sta_name, c.con_name
      FROM state s
      JOIN country c ON s.con_id = c.con_id
    `;
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching states:', err);
        res.status(500).json({ status: 'Error', message: 'Error fetching states' });
        return;
      }
      res.json(results);
    });
  });
  
  // Add a new state
  app.post('/state', (req, res) => {
    const { con_id, name } = req.body;
    const sql = 'INSERT INTO state (con_id, sta_name) VALUES (?, ?)';
    db.query(sql, [con_id, name], (err, results) => {
      if (err) {
        console.error('Error adding state:', err);
        res.status(500).json({ status: 'Error', message: 'Error adding state' });
        return;
      }
      res.json({ status: 'Success', message: 'State added successfully', id: results.insertId });
    });
  });
  
  // Delete a state
  app.post('/delstate', (req, res) => {
    const { staid } = req.body;
    const sql = 'DELETE FROM state WHERE sta_id = ?';
    db.query(sql, [staid], (err, results) => {
      if (err) {
        console.error('Error deleting state:', err);
        res.status(500).json({ status: 'Error', message: 'Error deleting state' });
        return;
      }
      res.json({ status: 'Success', message: 'State deleted successfully' });
    });
  });

  // Get all cities
app.get('/getCity', (req, res) => {
    db.query('SELECT city.city_id, city.city_name, state.sta_name, country.con_name FROM city INNER JOIN state ON city.sta_id = state.sta_id INNER JOIN country ON city.con_id = country.con_id', (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
  
  // Get single city by ID
  app.get('/editcity/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM city WHERE city_id = ?', [id], (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
  
  // Add a new city
  app.post('/city', (req, res) => {
    const { con_id, sta_id, city_name } = req.body;
    const sql = 'INSERT INTO city (con_id, sta_id, city_name) VALUES (?, ?, ?)';
    db.query(sql, [con_id, sta_id, city_name], (err, results) => {
      if (err) throw err;
      res.json({ status: 'Success', message: 'City added successfully', id: results.insertId });
    });
  });
  
  // Update an existing city
  app.post('/updatecity', upload.none(), (req, res) => {
    const { con_id, sta_id, city_id, city_name } = req.body;
    const sql = 'UPDATE city SET con_id = ?, sta_id = ?, city_name = ? WHERE city_id = ?';
    db.query(sql, [con_id, sta_id, city_name, city_id], (err, results) => {
      if (err) throw err;
      res.json({ status: 'Success', message: 'City updated successfully' });
    });
  });
  
  // Delete a city
  app.post('/delcity', (req, res) => {
    const { cityid } = req.body;
    const sql = 'DELETE FROM city WHERE city_id = ?';
    db.query(sql, [cityid], (err, results) => {
      if (err) throw err;
      res.json({ status: 'Success', message: 'City deleted successfully' });
    });
  });

  app.get('/getproductdata', (req, res) => {
    res.json(products);
  });
  
  // Route to add or update product
  app.post('/product', upload.single('files'), (req, res) => {
    const { name, price, desc, qty } = req.body;
    const file = req.file;
  
    if (!name || !price || !qty || !desc) {
      return res.json({ status: 'Error', message: 'Please provide all required fields.' });
    }
  
    const newProduct = {
      p_id: products.length + 1,
      p_name: name,
      p_price: price,
      p_image: file ? file.filename : null,
      p_desc: desc,
      qty: qty
    };
  
    products.push(newProduct);
    res.json({ status: 'Success', message: 'Product added successfully!' });
  });
  
  // Route to delete product
  app.post('/delproduct', (req, res) => {
    const { pid } = req.body;
    products = products.filter(product => product.p_id !== parseInt(pid));
  
    res.json({ status: 'Success', message: 'Product deleted successfully!' });
  });

// Start the server on port 4001
app.listen(4001, () => {
    console.log('Server started on port 4001');
});
