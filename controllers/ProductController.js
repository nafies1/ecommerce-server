const { Product } = require('../models')

class ProductController {
  static addProduct (req, res, next) {
    const { name, price, stock, description, image } = req.body
    
    Product.create({
        name,
        price,
        stock,
        description : description || null,
        image: image || 'https://inspektorat.kaltimprov.go.id/assets/images/no-image-icon.png'
    })
      .then(product=>{
          res.status(201).json({
            msg: "Add product success",
            id: product.id,
            name: product.name,
            price: product.price,
            stock: product.stock,
            description: product.description,
            image: product.image
          })
      })
      .catch(err=>{
          next(err)
      })
  }

  static getAllProduct (req, res, next) {
    Product.findAll({})
      .then(products=>{
          res.status(200).json(products)
      })
      .catch(err=>{
          next(err)
      })
  }

  static getOneProduct (req, res, next) {
    Product.findByPk(Number(req.params.id))
      .then(product=>{
          res.status(200).json(product)
      })
      .catch(err=>{
          next(err)
      })
  }

  static updateProduct (req, res, next) {
    const { name, price, stock, description, image } = req.body
    Product.update({
        name,
        price,
        stock,
        description,
        image
    }, {
      where: { id: Number(req.params.id) }
    })
      .then(product=>{
          res.status(200).json({msg : `Product with id ${product.id} updated successfully`})
      })
      .catch(err=>{
          next(err)
      })
  }

  static updateStock (req, res, next) {
    const { stock } = req.body
    Product.update({
      stock
    }, {
      where: { id: Number(req.params.id) }
    })
      .then(product=>{
        res.status(200).json({msg : `Product Stock with id ${product.id} updated successfully`})
      })
      .catch(err=>{
        next(err)
      })
  }

  static deleteProduct (req, res, next) {
    Product.destroy({
      where: { id: Number(req.params.id) }
    })
      .then(product=>{
          res.status(200).json({msg : `Product with id ${product.id} deleted successfully`})
      })
      .catch(err=>{
          console.log(err)
          next(err)
      })
  }
} // The end of Product Controller

module.exports = ProductController