const Sequelize = require("sequelize");
const db = require("../db");

const County = db.define("county", {
    county:{
        type: Sequelize.STRING,
    },
    color:{
        type: Sequelize.STRING,
    },
    oneBedMed:{
        type: Sequelize.DECIMAL,
    },
    twoBedMed:{
        type: Sequelize.DECIMAL,
    },
    threeBedMed:{
        type: Sequelize.DECIMAL,
    },
    fourBedMed:{
        type: Sequelize.DECIMAL,
    },
    fiveBedMed:{
        type: Sequelize.DECIMAL,
    },
    aHBedMed:{
        type: Sequelize.DECIMAL,
    },
    coopMed:{
        type: Sequelize.DECIMAL,
    },
    singleHMed:{
        type: Sequelize.DECIMAL,
    },
    features:{
        type: Sequelize.JSON,
    },
    fips: {
        type: Sequelize.STRING,
    }
});

module.exports = County;