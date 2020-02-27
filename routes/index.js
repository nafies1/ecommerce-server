const router = require('express').Router()
const authRoute = require('./auth')
const productRoute = require('./product')
const cartRoute = require('./cart')
const Cart = require('../controllers/CartController')
const authentication = require('../middlewares/authentication')
// const keyfileGen = require('../helpers/keyfileGenerator')

router.get('/', (req, res) => {
  // keyfileGen used to generate keyfile.json (key for access google cloud storage, for upload image)
  // Because keyfile.json is a credential key, it should not be commited. So, for deployment to heroku,
  // this method is used for trial. Instead, You can use buildpack for gcs. Please checkout
  // https://github.com/nafies1/heroku-google-application-credentials-buildpack.
  
  // keyfileGen()
  res.send('Welcome to e-commerce server. For further information, please contact Us at nafies1')
})

router.use('/product', productRoute)
router.use('/auth', authRoute)
router.use('/cart', cartRoute)
router.post('/checkout', authentication, Cart.checkout)

module.exports = router