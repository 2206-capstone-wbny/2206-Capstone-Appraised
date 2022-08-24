//this is the access point for all things database related!

const { ReactWrapper } = require('enzyme')
const db = require('./db')

const User = require('./models/User')
const Home = require('./models/Home')

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Home
  },
}
