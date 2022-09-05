const router = require('express').Router()
const { models: { Zip }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const zipcodes = await Zip.findAll()
    res.json(zipcodes)
  } catch (err) {
    next(err)
  }
})


router.put('/', async (req, res, next) => {
  try {
    console.log(req.body)
    const updateOrder = await Zip.findOne({where: {zip: req.body.zipcode}});
    updateOrder.update({color : req.body.color});
    res.send(updateOrder);
  } catch (err) {
    next(err);
  }
});