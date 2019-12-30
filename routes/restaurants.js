const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
   res.send('<h1>Ruta GET de restautantes</h1>');
});

router.post('/', (req, res) => {
   res.send('Ruta POST de restaurantes');
});

module.exports = router;