var mysql = require('mysql');


const dbConnection =  mysql.createConnection({
  user: "root",
  password: "root",
  database: "review"
});

const getProductDetail = function(id) {
  console.log('In product detail. ', id);
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

const getPriyaDetail = function(id) {
  console.log('In priya detail. ', id);
  return new Promise((resolve, reject) => {
    dbConnection.query(`select coalesce(avg(RATING), 0) productRating, count(*) productNumberOfRating from review_detail where Id = ${id}`, (err, res) =>{
      if(err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

const getProductDetailAll = function() {
  console.log('In product detail all');
  return new Promise ((resolve, reject) => {
    dbConnection.query(`select Id, RATING, TITLE, DETAIL, CREATE_DATE, AUTHOR, SOURCE from review_detail`, (err, res) => {
      if(err) {
        console.log('Error : ',err);
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}


// dbConnection.connect();

module.exports = { dbConnection,
                  getProductDetail,
                  getProductDetailAll,
                  getPriyaDetail};

