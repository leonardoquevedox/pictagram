import { INSTANT_LOCAL_STORAGE } from '../config/consts'

const REDUX_PERSIST_KEY = `persist:${INSTANT_LOCAL_STORAGE}`

const getState = () => localStorage.getItem(REDUX_PERSIST_KEY) || {}

const setState = state => localStorage.setItem(REDUX_PERSIST_KEY, state)

export default { getState, setState }
