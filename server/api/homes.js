const router = require('express').Router()
const { models: { Home }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const homes = await Home.findAll({attributes: ['id', 'longitude', 'latitude']})
    res.json(homes)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) =>{
  try{
  let id = req.params.id
  const oneHomes = await Home.findByPk(id)
  res.send(oneHomes)
  }catch(error)
  {
    next(error)
  }
})