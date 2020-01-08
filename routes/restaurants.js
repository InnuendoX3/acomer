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
            // console.log(datos)
            res.render('../views/restaurants', datos);
         }
      });
   });

   // Render form for create a restaurant
   router.get('/new', async function (req, res) {
      res.render('../views/restaurants/new.ejs');
   });

   // SINGLE Render a single restarant
   router.get('/:id', async function (req, res) {
      const reqId = req.params.id;
      let quer = `SELECT * FROM restaurants WHERE restaurantID = ${reqId};SELECT * FROM comments;`
      restaurantsDB.query(quer, (err, rows) => {
         if (err) {
            console.log(err)
         } else {
            let datos = {
               dataResta: rows[0],
               dataComments: rows[1],
               message: 'Restaurant retrieved'
            }
            // console.log(datos);
            // Datos contains two different data: because multipleStatements
            res.render('../views/restaurants/single.ejs', datos);
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
      let quer = `SELECT * FROM restaurants WHERE restaurantID = ${reqId}`
      restaurantsDB.query(quer, (err, rows) => {
         if (err) {
            console.log(err)
         } else {
            let datos = {
               data: rows,
               message: 'Restaurant retrieved'
            }
            console.log(datos)
            res.render('../views/restaurants/edit.ejs', datos);
         }
      });
   });


   // UPDATE: Save in DB changes of a single restaurant
   router.post('/edit/:id', (req, res) => {
      const reqId = req.params.id;

      let name = req.body.name;
      let address = req.body.address;
      let rating = req.body.rating;

      let quer = `UPDATE restaurants SET 
         name = "${name}", 
         address = "${address}", 
         rating = "${rating}"  
         WHERE restaurantID = "${reqId}"`;

      restaurantsDB.query(quer, (err, rows) => {
         if (err) {
            console.log(err);
         } else {
            res.redirect('/restaurants');
         }
      });
   });

   // DELETE Restaurant
   router.get('/delete/:id', (req, res) => {
      const reqId = req.params.id;

      let quer = `DELETE FROM restaurants WHERE restaurantID = "${reqId}"`

      restaurantsDB.query(quer, (err, rows) => {
         if (err) {
            console.log(err);
         } else {
            res.redirect('/restaurants');
         }
      });
   });

   // Rate restaurant
   router.post('/rate/:id', (req, res) => {
      const reqId = req.params.id;

      let points = req.body.points;
      let comment = req.body.comment;

      let quer = `INSERT INTO comments (points, comment, restaurantID) VALUES ("${points}", "${comment}", "${reqId}")`;

      restaurantsDB.query(quer, (err, rows) => {
         if (err) {
            console.log(err);
         } else {
            res.redirect(`/restaurants/${reqId}`);
         }
      });
   });

}

console.log('Entra en API Module')

module.exports = restaurantsApi;