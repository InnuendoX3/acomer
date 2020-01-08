// Database
const mysql = require('mysql');
const mysqlConnection = mysql.createConnection({
   host: 'localhost',
   port: '10003',
   user: 'root',
   password: 'root',
   database: 'acomer',
   multipleStatements: 'true'
});

mysqlConnection.connect((err) => {
   if (err) {
      console.log('Error connecting to DB: ' + err);
      return;
   }
   console.log('Connection established');
});

/* mysqlConnection.query('SELECT * FROM restaurants', (err, rows) => {
   if (err) {
      console.log(err)
   } else {
      console.log(rows)
   }
}); */

module.exports = mysqlConnection;