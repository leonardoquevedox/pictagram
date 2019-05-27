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

import userReducers from './user'
import virtualKeyboard from './virtualKeyboard'

const logger = createLogger()

const appReducer = combineReducers({
  user: userReducers,
  keyboard: virtualKeyboard
})

const persistConfig = {
  key: INSTANT_LOCAL_STORAGE,
  storage,
  transforms: [
    createBlacklistFilter('vehicle', ['video']),
    createBlacklistFilter('user', ['currentPicture'])
  ]
}

const persistedReducer = persistReducer(persistConfig, appReducer)
const store = createStore(persistedReducer, applyMiddleware(thunk, logger))
const persistor = persistStore(store)

export default { appReducer, store, persistor }
