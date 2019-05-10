var mysql = require('mysql');


const dbConnection =  mysql.createConnection({
  user: "root",
  password: "root",
  database: "review"
});

dbConnection.connect();

module.exports.dbConnection = dbConnection;