const express =  require('express');
const app = express();
const port = 3001;

const indexRouter = require('./routes/index');
const restaurantsRouter = require('./routes/restaurants');


app.use('/', indexRouter);
app.use('/restaurants', restaurantsRouter);


app.listen(port, () => {
   console.log(`Listening on port ${port}`);
})