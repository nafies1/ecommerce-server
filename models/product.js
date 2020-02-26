'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Product extends Model {}
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Name is required"
        },
        notEmpty: {
          args: true,
          msg: "Name is required"
        },
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Stock is required"
        },
        min: {
          args: 1,
          msg: "Minimum stock is 0"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Price is required"
        },
        min: {
          args: 1,
          msg: "Minimum price is 0"
        }
      }
    },
    description: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize
  })
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsToMany(models.Transaction, {through: 'ProductTransaction'})
  }

  return Product;
};