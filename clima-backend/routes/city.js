const express = require('express');
const axios = require('axios');
const router = express.Router();

const UNSPLASH_KEY = process.env.UNSPLASH_KEY;

router.get('/:city', async (req, res) => {
  const city = req.params.city;
  try {
    const response = await axios.get(`https://api.unsplash.com/search/photos`, {
      params: {
        query: city,
        per_page: 1,
        orientation: 'landscape'
      },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_KEY}`
      }
    });
    const image = response.data.results[0];
    res.json({ url: image.urls.regular, description: image.alt_description });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener la ciudad' });
  }
});

module.exports = router;