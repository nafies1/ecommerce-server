const router = require('express').Router()
const authRoute = require('./auth')
const productRoute = require('./product')
const cartRoute = require('./cart')
const Cart = require('../controllers/CartController')
const authentication = require('../middlewares/authentication')

router.use('/product', productRoute)
router.use('/auth', authRoute)
router.use('/cart', cartRoute)

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *    tags : 
 *      - Users
 *    name : Register
 *    summary : register a user
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
 *      '201':
 *        description : success create user
 *      '500':
 *        description : Internal server error
 */
router.post('/checkout', authentication, Cart.checkout)

module.exports = router