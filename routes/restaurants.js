const express = require('express');
const restaurantsDB = require('../db/connection');


function restaurantsApi(app) {

   const router = express.Router();

   app.use('/restaurants', router);

   // Show all restaurants
   router.get('/', function (req, res) {
      restaurantsDB.query('SELECT * FROM restaurants', (err, rows) => {
         if (err) {
            console.log(err)
         } else {
            let datos = {
               data: rows,
               message: 'Restaurantes enviados'
            }
            console.log(datos)
            res.render('../views/restaurants', datos);
         }
      });
   });

   // Render form for create a restaurant
   router.get('/new', async function (req, res) {
      res.render('../views/restaurants/new.ejs');
   });

   router.get('/:id', async function (req, res) {
      const reqId = req.params.id;
      let quer = `SELECT * FROM restaurants WHERE id = ${reqId}`
      restaurantsDB.query(quer, (err, rows) => {
         if (err) {
            console.log(err)
         } else {
            console.log(rows)
            res.status(200).json({
               data: rows,
               message: 'Restaurantes enviados'
            });
         }
      });
   });

   // Save new restaurant on DB
   router.post('/', (req, res) => {
      // let id = req.body.id;
      let name = req.body.name;
      let address = req.body.address;
      let rating = req.body.rating;

      let quer = `INSERT INTO restaurants (name, address, rating) VALUES ("${name}", "${address}", "${rating}")`;

      restaurantsDB.query(quer, (err, rows) => {
         if (err) {
            console.log(err);
         } else {
            res.redirect('/restaurants');
         }
      });

   });

   // Render form with Restaurant info for update
   router.get('/edit/:id', async function (req, res) {
      const reqId = req.params.id;
      let quer = `SELECT * FROM restaurants WHERE id = ${reqId}`
      restaurantsDB.query(quer, (err, rows) => {
         if (err) {
            console.log(err)
         } else {
            let datos = {
               data: rows,
               message: 'Restaurante retrieved'
            }
            console.log(datos)
            res.render('../views/restaurants/edit.ejs', datos);
         }
      });
   });


   // Save in DB changes of a single restaurant
   router.post('/edit/:id', (req, res) => {
      const reqId = req.params.id;

      let name = req.body.name;
      let address = req.body.address;
      let rating = req.body.rating;

      let quer = `UPDATE restaurants SET 
         name = "${name}", 
         address = "${address}", 
         rating = "${rating}"  
         WHERE id = "${reqId}"`;

      restaurantsDB.query(quer, (err, rows) => {
         if (err) {
            console.log(err);
         } else {
            res.redirect('/restaurants');
         }
      });
   });

   router.get('/delete/:id', (req, res) => {
      const reqId = req.params.id;

      let quer = `DELETE FROM restaurants WHERE id = "${reqId}"`

      restaurantsDB.query(quer, (err, rows) => {
         if (err) {
            console.log(err);
         } else {
            res.redirect('/restaurants');
         }
      });

   });

}

console.log('Entra en API Module')

module.exports = restaurantsApi;