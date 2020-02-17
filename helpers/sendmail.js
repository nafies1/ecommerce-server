module.exports = (objectData) => {
  const nodemailer = require('nodemailer')
  const { email, subject, message } = objectData

  const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true, // use SSL
      auth: {
          user: 'password@nafies.tech',
          pass: process.env.PASS
      }
  })

  const mailOptions = {
      from: 'password@nafies.tech',
      to: email,
      subject,
      html: message
  }
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) reject(err)
      else resolve(info)
      // console.log('Email sent: ' + info.response);
    })
  })
}
