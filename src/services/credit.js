import axios from 'axios'
import config from '../config'
import authService from './auth'

const addCredit = quantity =>
  axios.post(`${config.baseUrl}/credits/add`, { quantity }, {
    headers: {
      Authorization: authService.getAuthorizationHeader()
    }
  })

const read = () =>
  axios.get(`${config.baseUrl}/credits`, {
    headers: {
      Authorization: authService.getAuthorizationHeader()
    }
  })

export default { addCredit, read }
