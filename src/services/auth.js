import axios from 'axios'

import config from '../config'

import { USER_TOKEN } from '../config/consts'

const isLoggedIn = () => {
  const token = localStorage.getItem(USER_TOKEN)
  return !!token
}

const login = params => axios.post(`${config.baseUrl}/user/login`, params)

const getUserToken = () => localStorage.getItem(USER_TOKEN)

const setUserToken = token => localStorage.setItem(USER_TOKEN, token)

const getAuthorizationHeader = () => `Bearer ${localStorage.getItem(USER_TOKEN)}`

export default {
  login,
  isLoggedIn,
  getUserToken,
  setUserToken,
  getAuthorizationHeader
}
