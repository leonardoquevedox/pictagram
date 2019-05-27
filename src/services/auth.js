import axios from 'axios'

import config from '../config'

import localStorageService from './localstorage'

import { USER_TOKEN } from '../config/consts'

const isLoggedIn = () => {
  const token = localStorage.getItem(USER_TOKEN)
  return !!token
}

const login = params => axios.post(`${config.baseUrl}/login`, params)

const getLoggedInUser = () => {
  const state = localStorageService.getState()
  if (state.user) {
    const userState = JSON.parse(state.user)
    return userState.profile || {}
  }
  return {}
}

const getUserToken = () => localStorage.getItem(USER_TOKEN)

const setUserToken = token => localStorage.setItem(USER_TOKEN, token)

const getAuthorizationHeader = () => `Bearer ${localStorage.getItem(USER_TOKEN)}`

const logout = () => localStorage.removeItem(USER_TOKEN)

export default {
  login,
  isLoggedIn,
  getLoggedInUser,
  getUserToken,
  logout,
  setUserToken,
  getAuthorizationHeader
}
