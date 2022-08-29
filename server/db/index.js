//this is the access point for all things database related!

const { ReactWrapper } = require('enzyme')
const db = require('./db')
const axios = require("axios");

const User = require('./models/User')
const Home = require('./models/Home')
const State = require('./models/State')
const County = require('./models/County')
const Zip = require('./models/Zip')
const HistoricData = require('./models/HistoricData')
//associations could go here!

Zip.belongsTo(County);
County.hasMany(Zip);

County.belongsTo(State);
State.hasMany(County)

Home.belongsTo(Zip)
Zip.hasMany(Home)

User.belongsTo(Home)
Home.hasMany(User)

module.exports = {
  db,
  models: {
    User,
    Home,
    State,
    County,
    Zip,
    HistoricData
  },
}
