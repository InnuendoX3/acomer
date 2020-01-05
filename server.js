const express =  require('express');
const app = express();
const port = 3001;

const indexRouter = require('./routes/index');
// const restaurantsRouter = require('./routes/restaurants'); // Borrar ?
const restaurantsApi = require('./routes/restaurants.js'); // API routes


// Database
const mysql = require('mysql');
const mysqlConnection = mysql.createConnection({
   host: 'localhost',
   port: '10003',
   user: 'root',
   password: 'root',
   database: 'acomer'
});

mysqlConnection.connect((err) => {
   if (err) {
      console.log('Error connecting to DB: ' + err);
      return;
   }
   console.log('Connection established');
})

mysqlConnection.query('SELECT * FROM restaurants', (err, rows) => {
   if (err) {
      console.log(err)
   } else {
      console.log(rows)
   }
})

// Middlewares
app.use(express.json());

// Routes
app.use('/', indexRouter);
// app.use('/restaurants', restaurantsRouter); 
restaurantsApi(app); // Capa de rutas

app.listen(port, () => {
   console.log(`Listening on port ${port}`);
})