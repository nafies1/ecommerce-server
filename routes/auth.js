const router = require('express').Router()
const User = require('../controllers/UserController')

router.post('/register' ,User.register)
router.post('/login', User.login)
// router.post('/googleSign', User.googleSign)
// router.get('/verification/:token', User.verifyAccount)

module.exports = router