const router = require("express").Router();
const {
  models: { HistoricData },
} = require("../db");
module.exports = router

router.get('/:id', async (req, res, next) => {
    try {
      let id = req.params.id
      const states = await HistoricData.findOne({where: {name: id}})
      res.json(states)
    } catch (err) {
      next(err)
    }
  })