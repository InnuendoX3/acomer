if (process.env.NODE_ENV !== 'production') {
   require('dotenv').config();
}

const express =  require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const port = 3001;

const indexRouter = require('./routes/index');
/* const credentialsRouter = require('./routes/credentials') */
// const restaurantsRouter = require('./routes/restaurants'); // Borrar ?
const restaurantsApi = require('./routes/restaurants.js'); // API routes

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));


// Middlewares
app.use(express.json());

// Routes
app.use('/', indexRouter);
/* app.use('/', credentialsRouter) */
restaurantsApi(app); // Capa de rutas



/*************** User routes ***************/


// const router = express.Router();
const restaurantsDB = require('./db/connection');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

app.use(flash());
app.use(session({
   secret: process.env.SESSION_SECRET,
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session()); 

const initializePassport = require('./passport-config');
initializePassport(
   passport,
   email => {
      let quer = `SELECT * FROM users WHERE email = ${email};`;
      restaurantsDB.query(quer, (err, rows) => {
         if (err) {
            console.log(err);
            console.log('Error tratando de encontrar user by email');
         } else {
            let user = {
               id: rows[0].name
               // Mas cosas ?
            }
            console.log(rows);
            console.log(user);
         }
      })
   }
);


app.get('/register', (req, res) => {
   res.render('credentials/register')
})

app.post('/register', async (req, res) => {
   let name = req.body.name;
   let email = req.body.email;
   let password = req.body.password;

   try {
      const hashedPassword = await bcrypt.hash(password, 10)
      let quer = `INSERT INTO users (name, email, password) VALUES ("${name}","${email}","${hashedPassword}")`;

      restaurantsDB.query(quer, (err, rows) => {
         if (err) {
            console.log(err);
         } else {
            res.redirect('/login');
         }
      })
   } catch {
      res.redirect('/register');
   }
})


app.get('/login', (req, res) => {
   res.render('credentials/login')
})

app.post('/login', passport.authenticate('local', {
   successRedirect: '/restaurants',
   failureRedirect: '/login',
   failureFlash: true
}))





/********************* Hasta aqui ************/

app.listen(process.env.PORT || port, () => {
   console.log(`Listening on port ${port}`);
})