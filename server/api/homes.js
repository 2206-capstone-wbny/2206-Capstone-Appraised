const router = require('express').Router()
const { models: { Home }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const homes = await Home.findAll()
    res.json(homes)
  } catch (err) {
    next(err)
  }
})