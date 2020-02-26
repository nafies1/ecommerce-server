'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Transaction extends Model {}
  Transaction.init({
    UserId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize
  })

  Transaction.associate = function(models) {
    // associations can be defined here
    Transaction.belongsTo(models.User)
    Transaction.belongsToMany(models.Product, {through: 'ProductTransaction'})
  }
  return Transaction;
};