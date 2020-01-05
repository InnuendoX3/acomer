const express = require('express');
const RestaurantsService = require('../services/restaurants');




function restaurantsApi(app) {
   

   console.log('Entra en la funcion del Modulo del API')
   const router = express.Router();
   const restaurantsService = new RestaurantsService();

   app.use('/restaurants', router);
   

   router.get('/', async function (req, res) {
      //res.send('<h1>Ruta GET de restautantes</h1>');

      try {
         const restaurants = await restaurantsService.getRestaurants();
         res.status(200).json({
            data: restaurants,
            message: 'Restaurantes enviados'
         });
      } catch (err) {
         console.log(err);
      }


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

}

console.log('Entra en API Module')

module.exports = restaurantsApi;