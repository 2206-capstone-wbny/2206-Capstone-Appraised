const Sequelize = require("sequelize");
const db = require("../db");
const axios = require("axios");

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
    type: Sequelize.INTEGER,
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
});

module.exports = Home;
