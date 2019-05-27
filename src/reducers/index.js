/**
 * @license MIT
 * @version 1.1.0
 * @author Trinca
 * @description User controller.
 */

import { combineReducers, createStore, applyMiddleware } from 'redux'
import { createBlacklistFilter } from 'redux-persist-transform-filter'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import { INSTANT_LOCAL_STORAGE } from '../config/consts'

import uiReducers from './ui'
import userReducers from './user'
import vehicleReducers from './vehicle'
import insuranceReducers from './insurance'
import deviceReducers from './device'
import hardwareReducers from './hardware'
import virtualKeyboard from './virtualKeyboard'
import integrationReducers from './integration'
import checkoutReducers from './checkout'
import creditReducers from './credit'

const logger = createLogger()

const appReducer = combineReducers({
  ui: uiReducers,
  user: userReducers,
  device: deviceReducers,
  vehicle: vehicleReducers,
  insurance: insuranceReducers,
  hardware: hardwareReducers,
  keyboard: virtualKeyboard,
  integration: integrationReducers,
  checkout: checkoutReducers,
  credit: creditReducers
})

const persistConfig = {
  key: INSTANT_LOCAL_STORAGE,
  storage,
  transforms: [
    createBlacklistFilter('vehicle', ['video']),
    createBlacklistFilter('user', ['cnhPicture'])
  ]
}

const persistedReducer = persistReducer(persistConfig, appReducer)
const store = createStore(persistedReducer, applyMiddleware(thunk, logger))
const persistor = persistStore(store)

export default { appReducer, store, persistor }
