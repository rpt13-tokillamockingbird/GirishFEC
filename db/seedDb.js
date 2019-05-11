var db = require("../db");
var faker = require('faker');

const seedData = function () {

  for (let i = 0; i < 100; i++) {

    const rating = Math.floor(Math.random() * 5 + 1);
    const id = i + 1;
    const title = faker.lorem.sentence();
    const detail = faker.lorem.sentences();
    const create_date = faker.date.recent();
    const author = faker.name.firstName();
    const source = faker.lorem.word();

    const queryStr =
      `insert into review_detail (Id, RATING, TITLE, DETAIL, AUTHOR, SOURCE, CREATE_DATE) VALUES (${id}, ${rating}, "${title}", "${detail}", "${author}", "${source}", current_date)`;
    console.log('Insert ', queryStr);
    //  console.log(`Sample data ${rating} title ${title} detail ${detail} date ${create_date} author ${author}`);
    db.dbConnection.query(queryStr, (err, result) => {
      if (err) {
        console.log('Error ', err);
      } else {
        // console.log('Results ', result);
      }
    }
    );

  }

};

seedData();

module.exports.seedData = seedData;