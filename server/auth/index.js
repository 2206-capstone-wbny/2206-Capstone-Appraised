const router = require('express').Router()
const { models: {User }} = require('../db')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body)}); 
  } catch (err) {
    next(err)
  }
})


router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.send({token: await user.generateToken()})
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization))
  } catch (ex) {
    next(ex)
  }
})

router.put('/update', async (req, res, next) => {
  try{
  const name = req.body
  const updateAcc = await User.findOne({
      where: {
        id: name.id,
      },
    })
  res.send(updateAcc.update(name))
  }catch(error){
    next(error)
  }
})


router.delete('/delete', async (req, res, next) => {
  try{
  const id = req.body
  const deleteAccount= await User.findByPk(id.id)
  res.send(await deleteAccount.destroy())
  }catch(error){
    next(error)
  }
})