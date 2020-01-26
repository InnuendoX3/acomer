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

let users = [];

// Middlewares
app.use(express.json());

// Routes
app.use('/', indexRouter);
restaurantsApi(app); // Capa de rutas



/*************** User routes ***************/


// const router = express.Router();
const restaurantsDB = require('./db/connection');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

app.use(flash());
app.use(session({
   secret: process.env.SESSION_SECRET,
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

const initializePassport = require('./passport-config');
initializePassport(
   passport,
   email => users.find(user => user.email === email),
   id => users.find(user => user.id === id)
);

function loadUsers() {

   let query = "SELECT * FROM `users`";

   restaurantsDB.query(query, (err, rows) => {
      if (err) {
         res.redirect('/');
      }
      users = [];
      rows.forEach(user => {
         let newUser = {
            id: user.idusers,
            name: user.name,
            email: user.email,
            password: user.password
         }
         users.push(newUser);
         console.log(newUser);
      });
      console.log('Users on array: ' + users);
   });
}
loadUsers()


app.get('/register', checkNotAuthenticated, (req, res) => {
   res.render('credentials/register')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
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
            loadUsers();
            res.redirect('/login');
         }
      })
   } catch {
      res.redirect('/register');
   }
})


app.get('/login', checkNotAuthenticated, (req, res) => {
   res.render('credentials/login')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
   successRedirect: '/restaurants',
   failureRedirect: '/login',
   failureFlash: true
}))


/********************* Hasta aqui ************/

app.delete('/logout', (req, res) => {
   req.logOut();
   res.redirect('/login');
});

function checkAuthenticated(req, res, next) {
   if (req.isAuthenticated()) {
       return next();
   }
   res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
   if (req.isAuthenticated()) {
       return res.redirect('/');
   }
   next();
}

app.listen(process.env.PORT || port, () => {
   console.log(`Listening on port ${port}`);
})