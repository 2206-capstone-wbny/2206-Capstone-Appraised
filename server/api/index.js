const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'));
router.use('/homes', require('./homes'));
router.use('/states', require('./states'))
router.use('/zipcodes', require('./zipcodes'))
router.use('/counties', require('./counties'))
router.use('/historic', require('./historic'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
