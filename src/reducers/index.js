/**
 * @license MIT
 * @version 1.1.0
 * @author Leonardo Quevedo
 * @description User controller.
 */

import { combineReducers, createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import uiReducers from './ui'
import userReducers from './user'
import rideReducers from './ride'
import hardwareReducers from './hardware'
import { FRETE_FACIL_LOCAL_STORAGE } from '../config/consts'

const logger = createLogger()

const appReducer = combineReducers({
  ui: uiReducers,
  user: userReducers,
  ride: rideReducers,
  hardware: hardwareReducers
})

const persistConfig = {
  key: FRETE_FACIL_LOCAL_STORAGE,
  storage
}

const persistedReducer = persistReducer(persistConfig, appReducer)
const store = createStore(persistedReducer, applyMiddleware(thunk, logger))
const persistor = persistStore(store)

export default { appReducer, store, persistor }
