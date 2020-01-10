const express = require('express');
const router = express.Router();
const restarurantsDB = require('../db/connection');


router.get('/register', (req, res) => {
   res.render('credentials/register')
})


router.get('/login', (req, res) => {
   res.render('credentials/login')
})

module.exports = router;