'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class ProductTransaction extends Model {}
  ProductTransaction.init({
    TransactionId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize
  })

  ProductTransaction.associate = function(models) {
    // associations can be defined here
  };
  return ProductTransaction;
};