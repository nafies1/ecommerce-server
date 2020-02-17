const { User } = require('../models')

module.exports = (tokenData, id) => {
  return User.update({
    verifToken: tokenData
  }, {
    where: { id }
  })
}