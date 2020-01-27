require('dotenv').config();
// Database
const mysql = require('mysql');

const mysqlConnection = mysql.createPool({
   host: process.env.JHOST,
   port: process.env.JPORT,
   user: process.env.JUSER,
   password: process.env.JPASSWORD,
   database: process.env.JDATABASE,
   multipleStatements: 'true'
});

/* mysqlConnection.connect((err) => {
   if (err) throw err;
   console.log('Connection established');
}); */

module.exports = mysqlConnection;