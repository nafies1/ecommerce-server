const router = require('express').Router()
const Product = require('../controllers/ProductController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const files = require('../middlewares/files')

/**
 * @swagger
 * /api/v1/product/upload:
 *   post:
 *    tags : 
 *      - Products
 *    name : Upload
 *    summary : Upload image product
 *    produces:
 *       - application/json
 *    parameters:
 *       - name: body
 *         in: body
 *         schema : 
 *           $ref: ""
 *           type: object
 *           properties :
 *             name : 
 *               type : string
 *             email :
 *                type : string
 *             password :
 *                type : string
 *    responses :
 *      '200':
 *        description : Your file is successfully uploaded
 *      '500':
 *        description : Internal server error
 */

router.post('/upload',
  files.multer.single('file'),
  files.sendUploadToGCS,
  (req, res) => {
    res.status(200).json({
      message: 'Your file is successfully uploaded',
      link: req.file.cloudStoragePublicUrl
    })
  })

/**
 * @swagger
 * /api/v1/product:
 *   get:
 *    tags : 
 *      - Products
 *    name : Products
 *    summary : Get All Products
 *    produces:
 *       - application/json
 *    parameters:
 *       - name: body
 *         in: body
 *         schema : 
 *           $ref: ""
 *           type: object
 *           properties :
 *             name : 
 *               type : string
 *             email :
 *                type : string
 *             password :
 *                type : string
 *    responses :
 *      '200':
 *        description : Your file is successfully uploaded
 *      '500':
 *        description : Internal server error
 */

router.get('/', Product.getAllProduct)


/**
 * @swagger
 * /api/v1/product/:id:
 *   get:
 *    tags : 
 *      - Products
 *    name : One Product
 *    summary : Get One Product
 *    produces:
 *       - application/json
 *    parameters:
 *       - name: body
 *         in: body
 *         schema : 
 *           $ref: ""
 *           type: object
 *           properties :
 *             name : 
 *               type : string
 *             email :
 *                type : string
 *             password :
 *                type : string
 *    responses :
 *      '200':
 *        description : Your file is successfully uploaded
 *      '500':
 *        description : Internal server error
 */
router.get('/:id', Product.getOneProduct)

/**
 * @swagger
 * /api/v1/product/:id:
 *   patch:
 *    tags : 
 *      - Products
 *    name : Update Stock
 *    summary : Update Product Stock
 *    produces:
 *       - application/json
 *    parameters:
 *       - name: body
 *         in: body
 *         schema : 
 *           $ref: ""
 *           type: object
 *           properties :
 *             name : 
 *               type : string
 *             email :
 *                type : string
 *             password :
 *                type : string
 *    responses :
 *      '200':
 *        description : Your file is successfully uploaded
 *      '500':
 *        description : Internal server error
 */
router.patch('/:id', Product.updateStock)

router.use(authentication, authorization)

/**
 * @swagger
 * /api/v1/product:
 *   post:
 *    tags : 
 *      - Products
 *    name : Add Product
 *    summary : Add new Product
 *    produces:
 *       - application/json
 *    parameters:
 *       - name: body
 *         in: body
 *         schema : 
 *           $ref: ""
 *           type: object
 *           properties :
 *             name : 
 *               type : string
 *             email :
 *                type : string
 *             password :
 *                type : string
 *    responses :
 *      '200':
 *        description : Your file is successfully uploaded
 *      '500':
 *        description : Internal server error
 */
router.post('/', Product.addProduct)

/**
 * @swagger
 * /api/v1/product/:id:
 *   put:
 *    tags : 
 *      - Products
 *    name : Edit Product
 *    summary : Edit details Product
 *    produces:
 *       - application/json
 *    parameters:
 *       - name: body
 *         in: body
 *         schema : 
 *           $ref: ""
 *           type: object
 *           properties :
 *             name : 
 *               type : string
 *             email :
 *                type : string
 *             password :
 *                type : string
 *    responses :
 *      '200':
 *        description : Your file is successfully uploaded
 *      '500':
 *        description : Internal server error
 */
router.put('/:id', Product.updateProduct)

/**
 * @swagger
 * /api/v1/product/:id:
 *   delete:
 *    tags : 
 *      - Products
 *    name : Delete Product
 *    summary : Delete One Product
 *    produces:
 *       - application/json
 *    parameters:
 *       - name: body
 *         in: body
 *         schema : 
 *           $ref: ""
 *           type: object
 *           properties :
 *             name : 
 *               type : string
 *             email :
 *                type : string
 *             password :
 *                type : string
 *    responses :
 *      '200':
 *        description : Your file is successfully uploaded
 *      '500':
 *        description : Internal server error
 */
router.delete('/:id', Product.deleteProduct)

module.exports = router