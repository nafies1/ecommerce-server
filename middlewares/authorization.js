module.exports = (req, res, next) => {
  if (req.admin) next()
  else next({
      msg: 'You are not authorized to modify product data. Only verified admin can modify product data',
      status: 'not_authorized'
  })
}
