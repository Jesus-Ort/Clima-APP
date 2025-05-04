const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor Express funcionando');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});