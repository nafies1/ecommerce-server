const { User, Transaction } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library')
const sendmail = require('../helpers/sendmail')
const messageGenerator = require('../helpers/messageGenerator')
const addVerifToken = require('../helpers/addVerifToken')

class UserController {
  static register (req, res, next) {
    let isAdmin
    if (req.headers.admin_secret === process.env.ADMIN_PASS) isAdmin = true
    else isAdmin = false
    let verifToken
    let user
    const { name, email, password } = req.body
    User.create({
      name,
      email,
      password,
      isAdmin,
      isVerified: false
    })
      .then(data => {
        user = data
        const verifNum = Math.floor(Math.random()*100)
        verifToken = jwt.sign({ id: user.id, verifNum }, process.env.SECRET)
        const message = messageGenerator({ status: 'verif', token: verifToken })
        return sendmail({
          email: user.email,
          subject: 'Register success, verify your email.', 
          message
        })
      })
      .then(info => {
        console.log('Result of sendmail:', info.response)
        // Create table Cart in db, defined in model as Transaction which status is false
        return Transaction.create({
          UserId: user.id,
          status: false
        })
      })
      .then(transaction => {
        console.log('Create transaction succes', transaction)
        return addVerifToken(verifToken, user.id)
      })
      .then(result => {
        if (result[0]) console.log('Add Token into db succes')
        else console.log('Something error')
        const token = jwt.sign({ id: user.id }, process.env.SECRET)
        res.status(201).json({
          msg: 'Register success',
          id: user.id,
          name: user.name,
          email: user.email,
          isVerified: user.isVerified,
          isAdmin: user.isAdmin,
          token
        })
    })
      .catch(err => {
        next(err)
      })
  }

  static login (req, res, next) {
    const { email, password } = req.body
    User.findOne({ where: { email }})
      .then(user => {
        if (user) {
          if (bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ id: user.id }, process.env.SECRET);
            res.status(200).json({
              msg: 'Login success',
              id: user.id,
              name: user.name,
              email: user.email,
              isVerified: user.isVerified,
              isAdmin: user.isAdmin,
              token
            })
          } else {
            next({
              name: 'invalid email/password',
              msg: 'Email / Password is wrong'
            })
          }
          
        } else {
          next({
            name: 'invalid email/password',
            msg: 'Email / Password is wrong'
          })
        }
      })
      .catch(next)
  }

  static googleSign (req, res, next) {
    let payload
    let status = {}
    const client = new OAuth2Client(process.env.CLIENT_ID);
    client.verifyIdToken({
      idToken: req.body.id_token,
      audience: process.env.CLIENT_ID
    })
      .then(ticket=>{
        payload = ticket.getPayload();
        const {email} = payload
        return User.findOne({ where: { email } })
      })
      .then(user=>{
        const { name } = payload
        const { email } = payload
        if (!user) {
          status.ids = 201
          status.msg = "user not found. Create user"
          return User.create({
            name,
            email,
            password: process.env.PASS_GSIGN,
            isVerified: true
          })
        } else{
            status.msg = "user found"
            status.ids = 200
            return user
        }
      })
      .then(user=>{
        const idUser = user.id
        const token = jwt.sign({ id: idUser }, process.env.SECRET);
        res.status(status.ids).json({token, msg: status.msg, id:idUser})
      })
      .catch(err=>{
        next(err)
      })
  }

  static verifyAccount (req, res, next) {
    const decoded = jwt.verify(req.params.token, process.env.SECRET)
    User.findByPk(decoded.id)
      .then(user => {
        if (!user) return next({ msg: 'User not found', status: 'bad_request' })
        if (!req.params.token === user.verifToken) return next({ msg: 'Token is invalid. Please request new token', status: 'bad_request' })
        return User.update({ isVerified: true }, { where: { id: user.id } })
      })
      .then(result => {
        if (result[0]) res.status(200).json({ msg: 'Account verified successfully'})
        else next({ msg: 'Something is wrong when verify account' })
      })
      .catch(next)
  }
}

module.exports = UserController
