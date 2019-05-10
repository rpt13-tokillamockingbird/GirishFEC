// var db = require("../db");
var faker = require('faker');

const seedData = function() {

  const sent = faker.lorem.sentence();
  console.log(sent);
  console.log(faker.lorem.sentences());
};

seedData();

module.exports.seedData = seedData;