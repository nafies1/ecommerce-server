const router = require('express').Router()
const User = require('../controllers/UserController')

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *    tags : 
 *      - Users
 *    name : Register
 *    summary : Add new user
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
 *        description : Success
 *      '500':
 *        description : Internal server error
 */
router.post('/register' ,User.register)

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *    tags : 
 *      - Users
 *    name : Login
 *    summary : User authentication request
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
 *        description : Success
 *      '500':
 *        description : Internal server error
 */
router.post('/login', User.login)

// router.post('/googleSign', User.googleSign)
// router.get('/verification/:token', User.verifyAccount)

module.exports = router