module.exports = (msgData) => {
  const { status, token } = msgData
  let message
  if (status === 'verif') {
    const verifUrl = `http://localhost:3000/auth/verification/${token}`
    message = `
    <div style="text-align: justify;">Your registration is success. Please clik link below to verify your account</div>
    <div style="text-align: justify;">&nbsp;</div>
    <div style="text-align: justify;"><a title="Account Verification" href="${verifUrl}" target="_blank" rel="noopener">Verify your account here</a></div>
    <div style="text-align: justify;">&nbsp;&nbsp;</div>
    <div style="text-align: justify;">or copy following url into your browser.</div>
    <div style="text-align: justify;">&nbsp;</div>
    <div style="text-align: justify;"><a title="Account Verification" href="${verifUrl}" target="_blank" rel="noopener">${verifUrl}</a></div>
    <div style="text-align: justify;">&nbsp;</div>
    <div style="text-align: justify;">Regards,</div>
    <div style="text-align: justify;">Nafies Tech</div>
    `
  }

  return message
}