const express = require('express');
const router = express.Router();
const restaMock = require('../utils/resta-mocks');

router.get('/', (req, res) => {
   // res.send('<h1>Ruta GET de restautantes</h1>');
   res.send(restaMock);
});

router.get('/:id', (req, res) => {
   // res.send('<h1>Ruta GET de restautantes</h1>');
   const resId = req.params.id
   res.send(restaMock[resId-1]);
});

router.post('/', (req, res) => {
   res.send('Ruta POST de restaurantes');
});

router.put('/', (req, res) => {
   res.send('Ruta PUT de restaurantes');
});

router.delete('/', (req, res) => {
   res.send('Ruta DELETE de restaurantes');
});

module.exports = router;