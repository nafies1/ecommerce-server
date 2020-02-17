function validateEmail (checkEmail) {
  const CloudmersiveValidateApiClient = require('cloudmersive-validate-api-client')
  const defaultClient = CloudmersiveValidateApiClient.ApiClient.instance

  // Configure API key authorization: Apikey
  const Apikey = defaultClient.authentications['Apikey']
  Apikey.apiKey = process.env.API_KEY_VALIDATE_EMAIL
  const apiInstance = new CloudmersiveValidateApiClient.EmailApi();

  const email = checkEmail; // String | Email address to validate, e.g. \"support@cloudmersive.com\".    The input is a string so be sure to enclose it in double-quotes.

  return new Promise((resolve, reject) => {
    apiInstance.emailFullValidation(email, function(error, data, response) {
      if (error) reject(err)
      else resolve(data)
    })
  })
}

module.exports = validateEmail