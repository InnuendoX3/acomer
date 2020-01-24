// Database
const mysql = require('mysql');
const mysqlConnection = mysql.createConnection({
   host: 'us-cdbr-iron-east-05.cleardb.net',
   port: '3306',
   user: 'b3ce64741dab55',
   password: 'f1994ffc',
   database: 'heroku_95a7c92138877e3',
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