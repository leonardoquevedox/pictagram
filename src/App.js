/**
 * @license MIT
 * @version 1.1.0
 * @author Leonardo Quevedo
 * @description User controller.
 */

import React from 'react'
import { connect } from 'react-redux'
import { F7App, View } from 'framework7-react'

// ---- Web pages
import Landing from './pages/web/Landing'
import SelectRole from './pages/web/SelectRole'
import CreateUser from './pages/web/CreateUser'
import CreateDriver from './pages/web/CreateDriver'
import SignupFeedback from './pages/web/SignupFeedback'

// ---- Mobile pages
import Login from './pages/mobile/user/Login'
import TabsContainer from './components/TabsContainer'
import CreateRide from './pages/mobile/user/CreateRide'
import SetRideItems from './pages/mobile/user/SetRideItems'
import SetRideDestination from './pages/mobile/user/SetRideDestination'
import NotFound from './pages/common/NotFound'

import authService from './services/auth'

import {
  checkBluetoothState,
  checkGpsState,
  watchBluetoothStateChanges,
  watchGpsStateChanges
} from './actions/hardware'

const isMobile = window.cordova
const checkAuth = (to, from, resolve) => {
  if (authService.isLoggedIn()) {
    resolve()
  } else {
    window.location.pathname = '/login'
  }
}

const f7params = {
  name: 'Pictagram',
  id: 'com.quitolabs.pictagram',
  routes: [
    // --- Mobile pages
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      beforeEnter: [checkAuth],
      component: TabsContainer
    },
    // --- Web pages
    {
      path: '/landing',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/setup-user',
      name: 'SelectRole',
      component: SelectRole
    },
    {
      path: '/driver-signup',
      name: 'CreateDriver',
      component: CreateDriver
    },
    {
      path: '/user-signup',
      name: 'CreateUser',
      component: CreateUser
    },
    {
      path: '/welcome',
      name: 'SignupFeedback',
      component: SignupFeedback
    },
    {
      path: '/create-ride',
      name: 'CreateRide',
      component: CreateRide
    },
    {
      path: '/ride-items',
      name: 'SetRideItems',
      component: SetRideItems
    },
    {
      path: '/ride-destination',
      name: 'SetRideDestination',
      component: SetRideDestination
    },
    {
      path: '(.*)',
      name: '404',
      component: NotFound
    }
  ]
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    if (isMobile) {
      document.addEventListener('deviceready', () => {
        this.onReadyState()
        this.initializeHardware()
      })
    } else {
      this.onReadyState()
    }
  }

  onReadyState() {
    const isRoot = window.location.pathname === '/'
    const isBrowser = process.env.REACT_APP_PLATFORM === 'browser'
    const { router } = this.$f7.views.main
    const isLoggedIn = authService.isLoggedIn()
    const mobileRouterRoot = isLoggedIn ? 'Home' : 'Login'
    const webRouterRoot = isLoggedIn ? 'Home' : 'Login'
    const rootPage = isBrowser ? webRouterRoot : mobileRouterRoot
    console.log(router)
    if (isRoot) {
      console.log(`Navigating to ${rootPage} page...`)
      router.navigate({ name: rootPage })
    }
  }

  initializeHardware() {
    try {
      this.props.checkBluetoothState()
      this.props.watchBluetoothStateChanges()
      this.props.checkGpsState()
      this.props.watchGpsStateChanges()
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <F7App params={f7params} colorTheme="orange">
        <View main pushState pushStateSeparator="" />
      </F7App>
    )
  }
}

const mapStateToProps = state => ({
  bluetooth: state.hardware.bluetooth,
  gps: state.hardware.gps
})

const mapDispatchToProps = dispatch => ({
  checkBluetoothState: dispatch(checkBluetoothState()),
  watchBluetoothStateChanges: dispatch(watchBluetoothStateChanges()),
  checkGpsState: dispatch(checkGpsState()),
  watchGpsStateChanges: dispatch(watchGpsStateChanges())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
