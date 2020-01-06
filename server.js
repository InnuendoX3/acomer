const express =  require('express');
const app = express();
const port = 3001;

const indexRouter = require('./routes/index');
// const restaurantsRouter = require('./routes/restaurants'); // Borrar ?
const restaurantsApi = require('./routes/restaurants.js'); // API routes

// Middlewares
app.use(express.json());

// Routes
app.use('/', indexRouter);
// app.use('/restaurants', restaurantsRouter); 
restaurantsApi(app); // Capa de rutas

app.listen(port, () => {
   console.log(`Listening on port ${port}`);
})