const router = require('express').Router()
const Cart = require('../controllers/CartController')
const authentication = require('../middlewares/authentication')

/**
 * @swagger
 * /api/v1/cart:
 *   get:
 *    tags : 
 *      - Transaction
 *    name : Cart
 *    summary : Show Cart
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
router.get('/', authentication, Cart.getCart)

/**
 * @swagger
 * /api/v1/cart:
 *   post:
 *    tags : 
 *      - Transaction
 *    name : Add Cart
 *    summary : Add Product to Cart
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
router.post('/', authentication, Cart.addToCart)

/**
 * @swagger
 * /api/v1/cart/:id:
 *   put:
 *    tags : 
 *      - Transaction
 *    name : Cart
 *    summary : Update Cart
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
router.put('/:id', Cart.updateCart)

/**
 * @swagger
 * /api/v1/cart/:id:
 *   delete:
 *    tags : 
 *      - Transaction
 *    name : Delete Cart
 *    summary : Delete product from cart
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
router.delete('/:id', Cart.deleteFromCart)

module.exports = router