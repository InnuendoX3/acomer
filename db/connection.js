require('dotenv').config();
// Database
const mysql = require('mysql');

/* 
Conection lost: the server closed the connection.
Happens betweern 12 - 2am?
https://stackoverflow.com/questions/20210522/nodejs-mysql-error-connection-lost-the-server-closed-the-connection
*/

const mysqlConnection = mysql.createConnection({
   host: process.env.JHOST,
   port: process.env.JPORT,
   user: process.env.JUSER,
   password: process.env.JPASSWORD,
   database: process.env.JDATABASE,
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