//this is the access point for all things database related!

const { ReactWrapper } = require("enzyme");
const db = require("./db");
const axios = require("axios");

const User = require("./models/User");
const Home = require("./models/Home");
const State = require("./models/State");
const County = require("./models/County");
const Zip = require("./models/Zip");
const HistoricData = require("./models/HistoricData");
//associations could go here!

const manyZip = Zip.belongsTo(County);
County.hasMany(Zip);

const manyCounty = State.hasMany(County);
County.State = County.belongsTo(State);

Home.belongsTo(Zip);
Zip.hasMany(Home);

// User.belongsToMany(Home, { through: "Watchlist" });
// Home.belongsToMany(User, { through: "Watchlist" });

User.hasMany(Home);
Home.hasMany(User);

module.exports = {
  db,
  manyZip,
  manyCounty,
  models: {
    User,
    Home,
    State,
    County,
    Zip,
    HistoricData,
  },
};
