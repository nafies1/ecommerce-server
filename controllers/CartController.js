const { Product, User, Transaction, ProductTransaction, sequelize } = require('../models')

class ProductController {
  static addToCart (req, res, next) {
    const { TransactionId, ProductId, quantity } = req.body
    ProductTransaction.create({
      TransactionId,
      ProductId,
      quantity
    })
      .then(product=>{
        res.status(201).json({
          msg: "Add product to cart success",
          product
        })
      })
      .catch(err=> {
        next(err)
      })
  }

  static getCart (req, res, next) {
    console.log(req.currentUserId)
    User.findByPk(Number(req.currentUserId), {
      attributes: ['id', 'name', 'email'],
      include: {
        model: Transaction,
        where: {
          status: false
        },
        attributes: ['id', 'status'],
        include: {
          model: Product,
          attributes: {
            exclude: ['description', 'createdAt', 'updatedAt']
          }
        }
      }
    })
      .then(products => {
        // console.log('ini products', products)
        res.status(200).json(products)
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }

  static updateCart (req, res, next) {
    const { ProductId, quantity } = req.body
    const TransactionId = req.params.id
    ProductTransaction.update({
      quantity
    }, {
      where : {
        TransactionId,
        ProductId
      }
    })
      .then(product=>{
        res.status(200).json({
          msg: "Update cart success",
          product
        })
      })
      .catch(err=> {
        next(err)
      })
  }

  static deleteFromCart (req, res, next) {
    const { TransactionId } = req.body
    const ProductId = req.params.id
    ProductTransaction.destroy({
      where : {
        TransactionId,
        ProductId
      }
    })
      .then(product=>{
        res.status(200).json({msg : `Product with id ${ProductId} deleted successfully from cart`})
      })
      .catch(err=>{
          console.log(err)
          next(err)
      })
  }

  static checkout (req, res, next) {

    sequelize.transaction((t) => {
      const { Products, id } = req.body.cart
      const promises = []
      let updatestock
      Products.forEach(product => {
        if(product.ProductTransaction.quantity > product.stock) {
          throw new Error ()
        } else {
          updatestock = product.stock - product.ProductTransaction.quantity
          promises.push(
            Transaction.update({ status: true }, { where: { id }, transaction: t }),
            Product.update({ stock: updatestock }, { where: { id: product.id }, transaction: t })
          )
        }
      })
      return Promise.all(promises)
    })
      .then(result => {
        console.log('Berhasil nih kekny ======================================')
        console.log(result)
        return Transaction.create({
          UserId: req.currentUserId,
          status: false
        })
      })
      .then(transaction => {
        console.log('Create transaction succes', transaction)
        res.status(200).json({
          msg: 'Transaction Success'
        })
      })
      .catch(next)
      }
} // The end of Product Controller

module.exports = ProductController