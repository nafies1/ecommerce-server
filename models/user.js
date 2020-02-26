'use strict';

const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
const emailValidator = require('../helpers/emailValidationAPI')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model {}
  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Password cannot be empty or null"
        },
        len: {
          args: [6],
          msg: "Password is too short. Minimum password length is 6"
        },
      }
    },
    isVerified: DataTypes.BOOLEAN,
    verifToken: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    resetToken: DataTypes.STRING
  }, {
    sequelize
  })

  User.addHook('beforeCreate', (user, options) => {
     return emailValidator(user.email) 
      .then(data => {
        if (!data.ValidAddress) {
          throw {
            msg: 'email is not valid. please use a valid email', 
            status: 'bad_request',
            joke: 'Are You a robot ? or input Dummy email ?'
          }
        } else {
          const hash = bcrypt.hashSync(user.password, salt)
          user.password = hash
        }
      })
      .catch(err => {
        throw err
      })
  })

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Transaction)
  }
  return User;
};