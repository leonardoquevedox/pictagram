import Login from '../pages/Login'
import PictureFilter from '../pages/PictureFilter'
import PictureTaking from '../pages/PictureTaking'
import Profile from '../pages/Profile'
import Onboarding from '../pages/Onboarding'
import TabsContainer from '../components/TabsContainer'

import authService from '../services/auth'
import redirect from '../services/redirect'

const checkAuth = (to, from, resolve, reject) => {
  if (authService.isLoggedIn()) {
    resolve()
  } else {
    window.location.pathname = '/login'
  }
}

const routes = [
  {
    path: '/onboarding',
    name: 'Onboarding',
    component: Onboarding
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/license-intro',
    name: 'PictureFilter',
    component: PictureFilter,
    beforeEnter: checkAuth
  },
  {
    path: '/license-picture',
    name: 'PictureTaking',
    component: PictureTaking,
    beforeEnter: checkAuth
  },
  {
    path: '/license-confirm',
    name: 'Profile',
    component: Profile,
    beforeEnter: checkAuth
  },
  {
    path: '/home',
    name: 'Home',
    component: TabsContainer,
    beforeEnter: checkAuth
  }
]

const rootPageName = redirect.getRootPage()
const rootPage = routes.filter(page => page.name === rootPageName)[0]
routes.push(
  /* Root page */
  {
    path: '/',
    name: 'Main',
    component: rootPage.component
  }
)

export default routes
