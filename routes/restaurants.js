const express = require('express');
const restaurantsDB = require('../db/connection');


function restaurantsApi(app) {

   const router = express.Router();

   app.use('/restaurants', router);

   // Show all restaurants
   router.get('/', function (req, res) {
      let quer = 'SELECT * FROM restaurants; SELECT restaurantID, round(avg(points),0) as average FROM comments GROUP BY restaurantID;'
      // Takes all restaurants & averagerate fromDB
      restaurantsDB.query(quer , (err, rows) => {
         if (err) {
            console.log(err)
         } else {
            // Set average rate on restaurants rating
            for (const resta of rows[0]) {
               for (const aver of rows[1]) {
                  if(resta.restaurantID == aver.restaurantID) {
                     restaurantsDB.query(`UPDATE restaurants SET 
                        rating = "${aver.average}"  
                        WHERE restaurantID = "${resta.restaurantID}";`, (err, rows) => {
                           if(err) {
                              console.log(err);
                           }
                        })
                  }
               }
            }

            let datos = {
               data: rows[0],
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
      let quer = `SELECT * FROM restaurants WHERE restaurantID = ${reqId}; 
                  SELECT * FROM comments WHERE restaurantID = ${reqId};`
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
      let type = req.body.type;
      let city = req.body.city;
      let address = req.body.address;

      let quer = `INSERT INTO restaurants (name, type, city, address, rating) VALUES ("${name}", "${type}", "${city}", "${address}", 0)`;

      restaurantsDB.query(quer, (err, rows) => {
         if (err) {
            console.log(err);
         } else {
            res.redirect('/restaurants');
         }
      });

   });

   // EDIT: Render form with Restaurant info for update
   router.get('/edit/:id', async function (req, res) {
      const reqId = req.params.id;
      let quer = `SELECT * FROM restaurants WHERE restaurantID = ${reqId}; 
                  SELECT avg(points) AS average FROM comments where restaurantID = ${reqId};`
      restaurantsDB.query(quer, (err, rows) => {
         if (err) {
            console.log(err)
         } else {
            let datos = {
               data: rows[0],
               averageRate: rows[1],
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
      let type = req.body.type;
      let city = req.body.city;
      let address = req.body.address;

      let quer = `UPDATE restaurants SET 
         name = "${name}", 
         address = "${address}", 
         type = "${type}",
         city = "${city}" 
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