/**
 * @license MIT
 * @version 1.1.0
 * @author Trinca
 * @description User controller.
 */

import 'react-app-polyfill/ie9'
import 'babel-polyfill'


import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Framework7React from 'framework7-react'
import Framework7 from 'framework7'
import { PersistGate } from 'redux-persist/integration/react'

import reducers from './reducers'
import App from './App'

import 'framework7/css/framework7.bundle.min.css'
import './theme/app.scss'

const { store, persistor } = reducers

Framework7.use(Framework7React)

ReactDOM.render(
  <PersistGate loading={null} persistor={persistor}>
    <Provider store={store}>
      <App />
    </Provider>
  </PersistGate>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister()
