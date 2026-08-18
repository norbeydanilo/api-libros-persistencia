const express = require('express');
const app = express();

app.use(express.json());

// Rutas
const libroRoutes = require('./routes/libroRoutes');
app.use('/libros', libroRoutes);

// Para agregar más entidades en el futuro:
// const otraRoutes = require('./routes/otraRoutes');
// app.use('/otra', otraRoutes);

module.exports = app;