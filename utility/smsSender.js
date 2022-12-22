let Kavenegar = require('kavenegar');
let smsSender = Kavenegar.KavenegarApi({
  apikey: process.env.SMS_API_KEY
});


const activationSms = async (inputData) => {
  return new Promise((resolve, reject) => {
    smsSender.VerifyLookup({
      receptor: inputData.userPhoneNumber,
      token10: inputData.fullName,
      token: 'باتشکر',
      template: 'activation'
    }, (response, status) => {
      resolve({response, status})
    });
  })
}


module.exports = {activationSms}

