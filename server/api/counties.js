const router = require('express').Router()
const { models: { County }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const counties = await County.findAll()
    res.json(counties)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    let id = req.params.id
    const states = await County.findOne({where: {county: id}})
    res.json(states)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const updateOrder = await County.findOne({where: {fips: req.body.fips}});
    updateOrder.update({color : req.body.color});
    res.send(updateOrder);
  } catch (err) {
    next(err);
  }
});