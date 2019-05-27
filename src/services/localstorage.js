import { INSTANT_LOCAL_STORAGE } from '../config/consts'

const REDUX_PERSIST_KEY = `persist:${INSTANT_LOCAL_STORAGE}`

const getState = () => JSON.parse(localStorage.getItem(REDUX_PERSIST_KEY) || '{}')

const setState = state => localStorage.setItem(REDUX_PERSIST_KEY, JSON.stringify(state || {}))

export default { getState, setState }
