var mysql = require('mysql');


const dbConnection =  mysql.createConnection({
  user: "root",
  password: "root",
  database: "review"
});

const getProductDetail = function(id) {
  return new Promise ((resolve, reject) => {
    dbConnection.query(`select Id, RATING, TITLE, DETAIL, CREATE_DATE, AUTHOR, SOURCE from review_detail where Id = ${id}`, (err, res) => {
      if(err){
        reject(err);
      } else {
        resolve(res);
      }
    }); }
  );
}


// dbConnection.connect();

module.exports = { dbConnection,
                   getProductDetail};

