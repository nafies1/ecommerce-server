const router = require('express').Router()
const Product = require('../controllers/ProductController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const files = require('../middlewares/files')

router.post('/upload',
  files.multer.single('file'),
  files.sendUploadToGCS,
  (req, res) => {
    res.status(200).json({
      message: 'Your file is successfully uploaded',
      link: req.file.cloudStoragePublicUrl
    })
  })

router.get('/', Product.getAllProduct)
router.get('/:id', Product.getOneProduct)
router.patch('/:id', Product.updateStock)

router.use(authentication, authorization)

router.post('/', Product.addProduct)
router.put('/:id', Product.updateProduct)
router.delete('/:id', Product.deleteProduct)

module.exports = router