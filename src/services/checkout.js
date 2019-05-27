import axios from 'axios'
import config from '../config'
import authService from './auth'

const create = params =>
  axios.post(`${config.baseUrl}/checkout`, params, {
    headers: {
      Authorization: authService.getAuthorizationHeader()
    }
  })

  const read = () =>
    axios.get(`${config.baseUrl}/checkout`, {
      headers: {
        Authorization: authService.getAuthorizationHeader()
      }
    })

export default { create, read }
