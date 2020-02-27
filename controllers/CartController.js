const { Product, User, Transaction, ProductTransaction } = require('../models')

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
        console.log('ini products', products)
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
} // The end of Product Controller

module.exports = ProductController