const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'winter123',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);
// Query database
db.query('SELECT * FROM employees', function (err, results) {
    console.log(results);
}); 


//  Create a employee
app.post('/api/new-employees', ({ body }, res) => {
  const sql = `INSERT INTO employees (employees_name)
    VALUES (?)`;
  const params = [body.employess_name];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success 🥳',
      data: body
    });
  });
});

// Read 
app.get('/api/employess', (req, res) => {
    const sql = `SELECT id, employees_name AS title FROM employees`;
    
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
         return;
      }
      res.json({
        message: 'success 🥳',
        data: rows
      });
    });
});

// Delete employee
app.delete('/api/employees/:id', (req, res) => {
    const sql = `DELETE FROM employees WHERE id = ?`;
    const params = [req.params.id];
    
    db.query(sql, params, (err, result) => {
      if (err) {
        res.statusMessage(400).json({ error: res.message });
      } else if (!result.affectedRows) {
        res.json({
        message: 'employee not found'
        });
      } else {
        res.json({
          message: 'deleted',
          changes: result.affectedRows,
          id: req.params.id
        });
      }
    });
});

//  Update employee list
app.put('/api/employees/:id', (req, res) => {
  const sql = `UPDATE reviews SET employees = ? WHERE id = ?`;
  const params = [req.body.employees, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'employee name not found 🚫❗️'
      });
    } else {
      res.json({
        message: 'success 🥳',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});

// response for other request not found
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
