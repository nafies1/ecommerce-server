const router = require('express').Router()
const auth = require('./auth')

router.get('/', (req, res) => {
  res.send('Welcome to e-commerce server. For further information, please contact Us at nafies1')
})

router.use('/auth', auth)

module.exports = router