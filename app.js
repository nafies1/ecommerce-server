if (process.env.NODE_ENV !== 'production' || process.env.NODE_ENV === 'test') require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes')
const errorHandler =  require('./middlewares/errorHandler')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', routes)

app.use('*', (req, res) => {
  res.status(404).json('Route not found')
})

app.use(errorHandler)

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT || 3000, () => {
    console.log('Running on port', process.env.PORT || 3000)
  })
}

module.exports = app