const router = require('express').Router()
const { models: { State }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const states = await State.findAll()
    res.json(states)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const updateOrder = await State.findByPk(req.body.id);
    updateOrder.update(req.body.reciept);
    res.send(updateOrder);
  } catch (err) {
    next(err);
  }
});
// router.get('/:id', async (req, res, next) =>{
//   try{
//   let id = req.params.id
//   const oneHomes = await Home.findByPk(id)
//   res.send(oneHomes)
//   }catch(error)
//   {
//     next(error)
//   }
// })