// app.js
const express = require('express');
const bodyParser = require('body-parser');
const libraryData = require('./data'); // Impor data dari data.js
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoint untuk menambahkan buku
app.get('/hello', (req, res) => {
    res.json('Hello World');
 })


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});
