if (process.env.NODE_ENV !== 'production' || process.env.NODE_ENV === 'test') require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes')
const errorHandler =  require('./middlewares/errorHandler')
const swaggerUi = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')
const HOST_APP = 'localhost:3000'
// const keyfileGen = require('../helpers/keyfileGenerator')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const swaggerDefinition = {
  info: {
    title: 'E-Commerce REST API',
    version: '1.1.0'
  },
  host: HOST_APP,
  basePath: '/'
}

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js']
}

const swaggerSpec = swaggerJSDoc(options)

app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get('/', (req, res) => {
  // keyfileGen used to generate keyfile.json (key for access google cloud storage, for upload image)
  // Because keyfile.json is a credential key, it should not be commited. So, for deployment to heroku,
  // this method is used for trial. Instead, You can use buildpack for gcs. Please checkout
  // https://github.com/nafies1/heroku-google-application-credentials-buildpack.
  
  // keyfileGen()
  res.send('Welcome to e-commerce server. For further information, please contact Us at nafies1')
})

app.use('/api/v1', routes)

app.use('*', (req, res) => {
  res.status(404).json('Endpoint not found')
})

app.use(errorHandler)

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT || 3000, () => {
    console.log('Running on port', process.env.PORT || 3000)
  })
}

module.exports = app