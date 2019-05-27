import axios from 'axios'

import visaLogo from '../assets/img/visa_logo_3.gif'
import mastercardLogo from '../assets/img/mastercard_logo_3.gif'

const base64ToFile = (base64, filename) => {
  let byteString = ''
  if (base64.split(',')[0].indexOf('base64') >= 0) byteString = atob(base64.split(',')[1])
  else byteString = unescape(base64.split(',')[1])
  const mimeString = base64
    .split(',')[0]
    .split(':')[1]
    .split(';')[0]

  // write the bytes of the string to a typed array
  const u8arr = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++) {
    u8arr[i] = byteString.charCodeAt(i)
  }
  return new File([u8arr], filename, { type: mimeString })
}

const blobToFile = (blob, filename) => new File([blob], filename)

const cardNumberRegex = {
  electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
  maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
  dankort: /^(5019)\d+$/,
  interpayment: /^(636)\d+$/,
  unionpay: /^(62|88)\d+$/,
  visa: /^4[0-9]{6,}$/,
  mastercard: /^5[1-5][0-9]{5,}|222[1-9][0-9]{3,}|22[3-9][0-9]{4,}|2[3-6][0-9]{5,}|27[01][0-9]{4,}|2720[0-9]{3,}$/,
  amex: /^3[47][0-9]{5,}$/,
  diners: /^3(?:0[0-5]|[68][0-9])[0-9]{4,}$/,
  discover: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
  jcb: /^(?:2131|1800|35[0-9]{3})[0-9]{3,}$/
}

const detectCardType = number => Object.keys(cardNumberRegex).find(key => cardNumberRegex[key].test(number))


const cardInfos = {
  visa: { logo: visaLogo, paymentMethodId: '2' },
  mastercard: { logo: mastercardLogo, paymentMethodId: '3' }
}

const generateCardInfo = number => {
  if (number) {
    const cardType = detectCardType(number.replace(/\s/gi, ''))
    return cardInfos[cardType]
  }
}

const convertCurrency = value => `${value}`.replace('.', ',')

const consultCep = cep =>
  axios.get(`https://viacep.com.br/ws/${cep}/json`)
    .then(response => response.data)
    .catch(err => {})

export default { base64ToFile, blobToFile, detectCardType, generateCardInfo, convertCurrency, consultCep }
