const Sequelize = require("sequelize");
const db = require("../db");


const HistoricData = db.define("historicData", {
    name: {
      type: Sequelize.STRING,
    },
      oneBedMed: {
        type: Sequelize.JSON,
      },
      twoBedMed: {
        type: Sequelize.JSON,
      },
      threeBedMed: {
        type: Sequelize.JSON,
      },
      fourBedMed: {
        type: Sequelize.JSON,
      },
      fiveBedMed: {
        type: Sequelize.JSON,
      },
      aHBedMed: {
        type: Sequelize.JSON,
      },
      coopMed: {
        type: Sequelize.JSON,
      },
      singleHMed: {
        type: Sequelize.JSON,
      }
  });
  
  module.exports = HistoricData;

