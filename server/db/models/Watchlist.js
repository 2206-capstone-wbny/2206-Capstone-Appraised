const Sequelize = require("sequelize");
const db = require("../db");

const Watchlist = db.define("Watchlist", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});

module.exports = Watchlist;
