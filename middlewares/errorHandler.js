module.exports = (err, req, res, next) => {
  if (err.status === 'bad_request') {
    res.status(400).json({
      msg: err.msg
    })
  } 
  else if (err.status === 'not_authorized') {
    res.status(401).json({
      msg: err.msg
    })
  } 
  else if (err.status === 'not_found') {
    res.status(404).json({
      msg: err.msg
    })
  } 
  else if (err.name === 'invalid email/password') {
    res.status(400).json(err)
  }
  else if (err.name === 'JsonWebTokenError') {
    err.msg = 'Token is invalid. Please input a valid token or login to get your token.'
    res.status(400).json(err)
  }  
  else if (err.name === 'SequelizeUniqueConstraintError') {
    let error = {}
    err.errors.forEach(eror => {
      if (eror.message === 'email must be unique') {
        error.msg = 'Email has been registered. Please login or register with another email'
        error.name = 'duplicate_email'
      }
    })
    res.status(400).json({
      msg: error.msg,
      name: error.name
    })
  }
  else if (err.name === 'SequelizeValidationError') {
    let errors = []
    err.errors.forEach(eror => {
      errors.push({ msg: eror.message })
    })
    res.status(400).json({
      errors,
      name: err.name
    })
  }
  else {
    console.log('ini error handler:', err)
    res.status(500).json(err)
  }
}