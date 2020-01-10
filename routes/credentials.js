const express = require('express');
const router = express.Router();
const restaurantsDB = require('../db/connection');


router.get('/register', (req, res) => {
   res.render('credentials/register')
})

router.post('/register', (req, res) => {
   let name = req.body.name;
   let email = req.body.email;
   let password = req.body.password;

   let quer = `INSERT INTO users (name, email, password) VALUES ("${name}","${email}","${password}")`

   restaurantsDB.query(quer, (err, rows) => {
      if (err) {
         console.log(err)
      } else {
         res.redirect('/login')
      }
   })
   
})


router.get('/login', (req, res) => {
   res.render('credentials/login')
})

module.exports = router;