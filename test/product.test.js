require('dotenv').config()
const request = require('supertest')
const app = require('../app')
const Sequelize = require('sequelize')
const { User, Product, sequelize } = require('../models')
const { queryInterface } = sequelize
const jwt = require('jsonwebtoken')

describe('Product Routes', () => {
  let tokenAuthorized
  let tokenUnauthorized
  describe('Add Product Test', () => {
    beforeEach((done) => {
      queryInterface.bulkDelete('Products', {})
        .then(_ => {
          console.log('Delete product success=====================');
          return User.create({
            name: 'nafies',
            email: 'nafies.beta2@gmail.com',
            password: 'mantapjiwa',
            isVerified: true,
            isAdmin:true
          })
        })
        .then(user => {
          console.log('Create user success=====================');
          tokenAuthorized = jwt.sign({ id: user.id }, process.env.SECRET)
          return User.create({
            name: 'nafies beta',
            email: 'nafies.beta1@gmail.com',
            password: 'mantapjiwa',
            isVerified: true,
            isAdmin:false
          })
        })
        .then(user => {
          tokenUnauthorized = jwt.sign({ id: user.id }, process.env.SECRET)
          console.log('Token Sukses=============================');
          
          done()
        })
        .catch(err => done(err))
    })
    afterEach((done) => {
      queryInterface.bulkDelete('Products', {})
        .then(response => {
          done()
        }).catch(err => done(err))
    })
    // HOOKS ^^^^^^^^^^
    test('it should return new product object and status 201', (done) => {
      request(app)
        .post('/product')
        .set('token', tokenAuthorized)
        .send({
          name: 'sepatu',
          price: 100000,
          stock: 10,
          description: 'Sepatu lari',
          image: 'https://pbs.twimg.com/profile_images/725275730267926528/dGPyaQZ6_400x400.jpg'
        })
        .end((err, response) => {
          // console.log('ini response',response.body)
          expect(err).toBe(null)
          expect(response.body).toHaveProperty('msg', 'Add product success')
          expect(response.body).toHaveProperty('id', expect.any(Number))
          expect(response.body).toHaveProperty('name', 'sepatu')
          expect(response.body).toHaveProperty('price', 100000)
          expect(response.body).toHaveProperty('stock', 10)
          expect(response.body).toHaveProperty('description', 'Sepatu lari')
          expect(response.body).toHaveProperty('image', 'https://pbs.twimg.com/profile_images/725275730267926528/dGPyaQZ6_400x400.jpg')
          expect(response.status).toBe(201)
          done()
        })
    })

    test('it should return error not authorized and status 401', (done) => {
      request(app)
        .post('/product')
        .set('token', tokenUnauthorized)
        .send({
          name: 'sepatu',
          price: 100000,
          stock: 10,
          description: 'Sepatu lari',
          image: 'https://pbs.twimg.com/profile_images/725275730267926528/dGPyaQZ6_400x400.jpg'
        })
        .end((err, response) => {
          // console.log('ini response',response.body)
          expect(err).toBe(null)
          expect(response.body).toHaveProperty('msg', 'You are not authorized to modify product data. Only verified admin can modify product data')
          expect(response.status).toBe(401)
          done()
        })
    })

    test('it should return error minimum value is 0 and status 400', (done) => {
      request(app)
        .post('/product')
        .set('token', tokenAuthorized)
        .send({
          name: 'sepatu',
          price: -10,
          stock: -10,
          description: 'Sepatu lari',
          image: 'https://pbs.twimg.com/profile_images/725275730267926528/dGPyaQZ6_400x400.jpg'
        })
        .end((err, response) => {
          // console.log('ini response',response.body)
          expect(err).toBe(null)
          expect(response.body.errors[0]).toHaveProperty('msg', 'Minimum stock is 0')
          expect(response.body.errors[1]).toHaveProperty('msg', 'Minimum price is 0')
          expect(response.body).toHaveProperty('name', 'SequelizeValidationError')
          expect(response.status).toBe(400)
          done()
        })
    })

    test('it should return error property is required and status 400', (done) => {
      request(app)
        .post('/product')
        .set('token', tokenAuthorized)
        .send({
          name: '',
          price: null,
          stock: null,
          description: 'Sepatu lari',
          image: 'https://pbs.twimg.com/profile_images/725275730267926528/dGPyaQZ6_400x400.jpg'
        })
        .end((err, response) => {
          // console.log('ini response',response.body)
          expect(err).toBe(null)
          expect(response.body.errors[0]).toHaveProperty('msg', 'Stock is required')
          expect(response.body.errors[1]).toHaveProperty('msg', 'Price is required')
          expect(response.body.errors[2]).toHaveProperty('msg', 'Name is required')
          expect(response.body).toHaveProperty('name', 'SequelizeValidationError')
          expect(response.status).toBe(400)
          done()
        })
    })

  })

  describe('Update Product Test', () => {
    let id
    beforeEach((done) => {
      queryInterface.bulkDelete('Products', {})
        .then(_ => {
          console.log('Delete product success=====================');
          return User.create({
            name: 'nafies',
            email: 'nafies.beta2@gmail.com',
            password: 'mantapjiwa',
            isVerified: true,
            isAdmin:true
          })
        })
        .then(user => {
          console.log('Create user success=====================');
          tokenAuthorized = jwt.sign({ id: user.id }, process.env.SECRET)
          return User.create({
            name: 'nafies beta',
            email: 'nafies.beta1@gmail.com',
            password: 'mantapjiwa',
            isVerified: true,
            isAdmin:false
          })
        })
        .then(user => {
          tokenUnauthorized = jwt.sign({ id: user.id }, process.env.SECRET)
          console.log('Token Sukses=============================');
          return Product.create({
            name: 'sepatu lari',
            price: 200000,
            stock: 11,
            description: 'Sepatu lari',
            image: 'https://pbs.twimg.com/profile_images/725275730267926528/dGPyaQZ6_400x400.jpg'
          })
        })
        .then(product => {
          id = product.id
          console.log('Create product success=======================');
          done()
        })
        .catch(err => done(err))
    })
    afterEach((done) => {
      queryInterface.bulkDelete('Products', {})
        .then(response => {
          done()
        }).catch(err => done(err))
    })
    // HOOKS ^^^^^^^^^^
    test('it should return product object and status 200', (done) => {
      request(app)
        .put(`/product/${id}`)
        .set('token', tokenAuthorized)
        .send({
          name: 'sepatu',
          price: 100000,
          description: 'Sepatu lari',
          image: 'https://pbs.twimg.com/profile_images/725275730267926528/dGPyaQZ6_400x400.jpg'
        })
        .end((err, response) => {
          // console.log('ini response',response.body)
          expect(err).toBe(null)
          expect(response.body).toHaveProperty('msg', `Product with id ${id} updated successfully`)
          expect(response.status).toBe(200)
          done()
        })
    })

    test('it should return error not authorized and status 401', (done) => {
      request(app)
        .put(`/product/${id}`)
        .set('token', tokenUnauthorized)
        .send({
          name: 'sepatu',
          price: 100000,
          description: 'Sepatu lari',
          image: 'https://pbs.twimg.com/profile_images/725275730267926528/dGPyaQZ6_400x400.jpg'
        })
        .end((err, response) => {
          // console.log('ini response',response.body)
          expect(err).toBe(null)
          expect(response.body).toHaveProperty('msg', 'You are not authorized to modify product data. Only verified admin can modify product data')
          expect(response.status).toBe(401)
          done()
        })
    })

    test('it should return error minimum value is 0 and status 400', (done) => {
      request(app)
        .put(`/product/${id}`)
        .set('token', tokenAuthorized)
        .send({
          name: 'sepatu',
          price: -10,
          description: 'Sepatu lari',
          image: 'https://pbs.twimg.com/profile_images/725275730267926528/dGPyaQZ6_400x400.jpg'
        })
        .end((err, response) => {
          // console.log('ini response',response.body)
          expect(err).toBe(null)
          expect(response.body.errors[0]).toHaveProperty('msg', 'Minimum price is 0')
          expect(response.body).toHaveProperty('name', 'SequelizeValidationError')
          expect(response.status).toBe(400)
          done()
        })
    })

    test('it should return error property is required and status 400', (done) => {
      request(app)
        .put(`/product/${id}`)
        .set('token', tokenAuthorized)
        .send({
          name: 'ma',
          price: null,
          description: 'Sepatu lari',
          image: 'https://pbs.twimg.com/profile_images/725275730267926528/dGPyaQZ6_400x400.jpg'
        })
        .end((err, response) => {
          // console.log('ini response',response.body)
          expect(err).toBe(null)
          expect(response.body.errors[0]).toHaveProperty('msg', 'Price is required')
          expect(response.body).toHaveProperty('name', 'SequelizeValidationError')
          expect(response.status).toBe(400)
          done()
        })
    })

  })

  describe('Update Stock Test', () => {
    let id
    beforeEach((done) => {
      queryInterface.bulkDelete('Products', {})
        .then(_ => {
          console.log('Delete product success=====================');
          return User.create({
            name: 'nafies',
            email: 'nafies.beta2@gmail.com',
            password: 'mantapjiwa',
            isVerified: true,
            isAdmin:true
          })
        })
        .then(user => {
          console.log('Create user success=====================');
          tokenAuthorized = jwt.sign({ id: user.id }, process.env.SECRET)
          return User.create({
            name: 'nafies beta',
            email: 'nafies.beta1@gmail.com',
            password: 'mantapjiwa',
            isVerified: true,
            isAdmin:false
          })
        })
        .then(user => {
          tokenUnauthorized = jwt.sign({ id: user.id }, process.env.SECRET)
          console.log('Token Sukses=============================');
          return Product.create({
            name: 'sepatu lari',
            price: 200000,
            stock: 11,
            description: 'Sepatu lari',
            image: 'https://pbs.twimg.com/profile_images/725275730267926528/dGPyaQZ6_400x400.jpg'
          })
        })
        .then(product => {
          id = product.id
          console.log('Create product success=======================');
          done()
        })
        .catch(err => done(err))
    })
    afterEach((done) => {
      queryInterface.bulkDelete('Products', {})
        .then(response => {
          done()
        }).catch(err => done(err))
    })
    // HOOKS ^^^^^^^^^^
    test('it should return product object and status 200', (done) => {
      request(app)
        .patch(`/product/${id}`)
        .set('token', tokenAuthorized)
        .send({
          stock: 2
        })
        .end((err, response) => {
          // console.log('ini response',response.body)
          expect(err).toBe(null)
          expect(response.body).toHaveProperty('msg', `Product Stock with id ${id} updated successfully`)
          expect(response.status).toBe(200)
          done()
        })
    })

    test('it should return error not authorized and status 401', (done) => {
      request(app)
        .put(`/product/${id}`)
        .set('token', tokenUnauthorized)
        .send({
          stock: 2
        })
        .end((err, response) => {
          // console.log('ini response',response.body)
          expect(err).toBe(null)
          expect(response.body).toHaveProperty('msg', 'You are not authorized to modify product data. Only verified admin can modify product data')
          expect(response.status).toBe(401)
          done()
        })
    })

    test('it should return error minimum value is 0 and status 400', (done) => {
      request(app)
        .put(`/product/${id}`)
        .set('token', tokenAuthorized)
        .send({
          stock: -10
        })
        .end((err, response) => {
          // console.log('ini response',response.body)
          expect(err).toBe(null)
          expect(response.body.errors[0]).toHaveProperty('msg', 'Minimum stock is 0')
          expect(response.body).toHaveProperty('name', 'SequelizeValidationError')
          expect(response.status).toBe(400)
          done()
        })
    })

    test('it should return error property is required and status 400', (done) => {
      request(app)
        .put(`/product/${id}`)
        .set('token', tokenAuthorized)
        .send({
          stock: null
        })
        .end((err, response) => {
          // console.log('ini response',response.body)
          expect(err).toBe(null)
          expect(response.body.errors[0]).toHaveProperty('msg', 'Stock is required')
          expect(response.body).toHaveProperty('name', 'SequelizeValidationError')
          expect(response.status).toBe(400)
          done()
        })
    })

  })

  describe('Delete Product Test', () => {
    let id
    beforeEach((done) => {
      queryInterface.bulkDelete('Products', {})
        .then(_ => {
          console.log('Delete product success=====================');
          return User.create({
            name: 'nafies',
            email: 'nafies.beta2@gmail.com',
            password: 'mantapjiwa',
            isVerified: true,
            isAdmin:true
          })
        })
        .then(user => {
          console.log('Create user success=====================');
          tokenAuthorized = jwt.sign({ id: user.id }, process.env.SECRET)
          return User.create({
            name: 'nafies beta',
            email: 'nafies.beta1@gmail.com',
            password: 'mantapjiwa',
            isVerified: true,
            isAdmin:false
          })
        })
        .then(user => {
          tokenUnauthorized = jwt.sign({ id: user.id }, process.env.SECRET)
          console.log('Token Sukses=============================');
          return Product.create({
            name: 'sepatu lari',
            price: 200000,
            stock: 11,
            description: 'Sepatu lari',
            image: 'https://pbs.twimg.com/profile_images/725275730267926528/dGPyaQZ6_400x400.jpg'
          })
        })
        .then(product => {
          id = product.id
          console.log('Create product success=======================');
          done()
        })
        .catch(err => done(err))
    })
    afterEach((done) => {
      queryInterface.bulkDelete('Products', {})
        .then(response => {
          done()
        }).catch(err => done(err))
    })
    // HOOKS ^^^^^^^^^^
    test('it should return msg success object and status 200', (done) => {
      request(app)
        .delete(`/product/${id}`)
        .set('token', tokenAuthorized)
        .end((err, response) => {
          // console.log('ini response',response.body)
          expect(err).toBe(null)
          expect(response.body).toHaveProperty('msg', `Product with id ${id} deleted successfully`)
          expect(response.status).toBe(200)
          done()
        })
    })

    test('it should return error not authorized and status 401', (done) => {
      request(app)
        .delete(`/product/${id}`)
        .set('token', tokenUnauthorized)
        .end((err, response) => {
          // console.log('ini response',response.body)
          expect(err).toBe(null)
          expect(response.body).toHaveProperty('msg', 'You are not authorized to modify product data. Only verified admin can modify product data')
          expect(response.status).toBe(401)
          done()
        })
    })

  })
})