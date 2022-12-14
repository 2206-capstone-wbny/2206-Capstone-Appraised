const Sequelize = require("sequelize");
const db = require("../db");

const Home = db.define("home", {
  imageURL: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
  },
  state: {
    type: Sequelize.STRING,
  },
  zipcode: {
    type: Sequelize.INTEGER,
  },
  type: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.STRING,
  },
  priceNum:{
    type: Sequelize.DECIMAL
  },
  bathrooms: {
    type: Sequelize.DECIMAL,
  },
  beds: {
    type: Sequelize.INTEGER,
  },
  landSize: {
    type: Sequelize.FLOAT,
  },
  latitude: {
    type: Sequelize.DECIMAL,
  },
  longitude: {
    type: Sequelize.DECIMAL,
  },
  color:{
    type: Sequelize.STRING,
  }
});

module.exports = Home;
