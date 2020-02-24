const router = require('express').Router()
const authRoute = require('./auth')
const productRoute = require('./product')
// const keyfileGen = require('../helpers/keyfileGenerator')

router.get('/', (req, res) => {
  // keyfileGen used to generate keyfile.json (key for access google cloud storage, for upload image)
  // Because keyfile.json is a credential key, it should not be commited. So, for deployment to heroku,
  // this method is used for trial. Instead, You can use buildpack for gcs, please checkout
  // https://github.com/nafies1/heroku-google-application-credentials-buildpack.
  
  // keyfileGen()
  res.send('Welcome to e-commerce server. For further information, please contact Us at nafies1')
})

router.use('/product', productRoute)
router.use('/auth', authRoute)

module.exports = router