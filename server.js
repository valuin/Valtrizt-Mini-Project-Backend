// Import required modules
const express = require('express');
const mysql = require('mysql2/promise');
const moment = require('moment');

const PORT = 3000;

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'valvinna2908',
  database: 'expenses'
});

// Create an Express app
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// GET all expenses
app.get('/expenses', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM expenses');
    res.json(rows);
  } catch (error) {
    console.error('Error getting expenses:', error);
    res.status(500).json({ error: 'Error getting expenses' });
  }
});


// GET average expenses
app.get('/expenses/average', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT DATE(date) as date, SUM(amount) as total_amount, ROUND(AVG(amount)) as average_amount FROM expenses GROUP BY DATE(date)');
    res.json(rows);
  } catch (error) {
    console.error('Error getting average expenses:', error);
    res.status(500).json({ error: 'Error getting average expenses' });
  }
});



// POST a new expense
app.post('/expenses', async (req, res) => {
  const { description, amount } = req.body;
  const date = moment().format('YYYY-MM-DD HH:mm:ss'); // Get current date and time in YYYY-MM-DD HH:mm:ss format

  try {
    const [result] = await pool.query('INSERT INTO expenses (description, amount, date) VALUES (?, ?, ?)', [description, amount, date]);
    res.json({ id: result.insertId, description, amount, date });
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({ error: 'Error adding expense' });
  }
});

// PUT (update) an existing expense
app.put('/expenses/:id', async (req, res) => {
  const { id } = req.params;
  const { description, amount } = req.body;
  const date = moment().format('YYYY-MM-DD HH:mm:ss'); // Get current date and time in YYYY-MM-DD HH:mm:ss format

  try {
    const [result] = await pool.query('UPDATE expenses SET description = ?, amount = ?, date = ? WHERE id = ?', [description, amount, date, id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: `Expense with ID ${id} not found` });
    } else {
      res.json({ id, description, amount, date });
    }
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).json({ error: 'Error updating expense' });
  }
});

// DELETE an existing expense
app.delete('/expenses/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM expenses WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: `Expense with ID ${id} not found` });
    } else {
      res.json({ id });
    }
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ error: 'Error deleting expense' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});