const express =  require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const port = 3001;

const indexRouter = require('./routes/index');
const credentialsRouter = require('./routes/credentials')
// const restaurantsRouter = require('./routes/restaurants'); // Borrar ?
const restaurantsApi = require('./routes/restaurants.js'); // API routes

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

// Middlewares
app.use(express.json());

// Routes
app.use('/', indexRouter);
app.use('/', credentialsRouter)
// app.use('/restaurants', restaurantsRouter); 
restaurantsApi(app); // Capa de rutas

app.listen(process.env.PORT || port, () => {
   console.log(`Listening on port ${port}`);
})