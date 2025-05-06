const express = require('express');
const cors = require('cors');
require('dotenv').config();
const weatherRoutes = require('./routes/weather');
const cityRoutes = require('./routes/city')
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.use(cors());
app.use('/api/weather', weatherRoutes);
app.use('/api/city', cityRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});