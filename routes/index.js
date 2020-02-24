const router = require('express').Router()
const authRoute = require('./auth')
const productRoute = require('./product')
const keyfileGen = require('../helpers/keyfileGenerator')

router.get('/', (req, res) => {
  // keyfileGen()
  res.send('Welcome to e-commerce server. For further information, please contact Us at nafies1')
})

router.use('/product', productRoute)
router.use('/auth', authRoute)

module.exports = router