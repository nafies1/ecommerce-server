const router = require('express').Router()
const Cart = require('../controllers/CartController')
const authentication = require('../middlewares/authentication')
const { multer, sendUploadToGCS } = require('../middlewares/files')

router.post('/upload', multer.single('file'), sendUploadToGCS, (req, res) => {
  res.status(200).json({
      message: 'Your file is successfully uploaded',
      link: req.file.cloudStoragePublicUrl
    })
  })

router.get('/', authentication, Cart.getCart)
router.post('/', authentication, Cart.addToCart)
router.put('/:id', Cart.updateCart)
router.delete('/:id', Cart.deleteFromCart)

module.exports = router