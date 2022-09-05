const Sequelize = require("sequelize");
const db = require("../db");

const State = db.define("state", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  stateName: {
    type: Sequelize.STRING,
  },
  color: {
    type: Sequelize.STRING,
  },
  state: {
    type: Sequelize.STRING,
  },
  oneBedMed: {
    type: Sequelize.DECIMAL,
  },
  twoBedMed: {
    type: Sequelize.DECIMAL,
  },
  threeBedMed: {
    type: Sequelize.DECIMAL,
  },
  fourBedMed: {
    type: Sequelize.DECIMAL,
  },
  fiveBedMed: {
    type: Sequelize.DECIMAL,
  },
  aHBedMed: {
    type: Sequelize.DECIMAL,
  },
  coopMed: {
    type: Sequelize.DECIMAL,
  },
  singleHMed: {
    type: Sequelize.STRING,
  },
  features: {
    type: Sequelize.JSON,
  },
});

module.exports = State;
