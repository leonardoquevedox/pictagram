import axios from 'axios'
import config from '../config'

const consultPlate = plate =>
  axios.get(`${config.baseUrl}/plate-info/${plate}`)

const quote = params =>
  axios.post(`${config.baseUrl}/quote`, params)

const checkout = params =>
  axios.post(`${config.baseUrl}/argo-checkout`, params)

export default { consultPlate, quote, checkout }
