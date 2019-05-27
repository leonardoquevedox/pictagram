import Login from '../pages/Login'
import ForgotPassword from '../pages/ForgotPassword'
import ForgotPasswordEmailSent from '../pages/ForgotPasswordEmailSent'
import NewPassword from '../pages/NewPassword'
import SynchronizeDevice from '../pages/SynchronizeDevice'
import SelectDevice from '../pages/SelectDevice'
import AddDevice from '../pages/AddDevice'
import ConfirmUserInfo from '../pages/ConfirmUserInfo'
import IntroduceDriverLicense from '../pages/IntroduceDriverLicense'
import TakeDriverLicensePicture from '../pages/TakeDriverLicensePicture'
import ConfirmDriverLicense from '../pages/ConfirmDriverLicense'
import IntroduceVehicleVideo from '../pages/IntroduceVehicleVideo/IntroduceVehicleVideo'
import RecordVehicleVideo from '../pages/RecordVehicleVideo'
import ConfirmVehicleVideo from '../pages/ConfirmVehicleVideo'
import ConfirmVehicleInfo from '../pages/ConfirmVehicleInfo'
import SynchronizationFeedback from '../pages/SynchronizationFeedback'
import RiskForm from '../pages/RiskForm'
import PolicyDetails from '../pages/PolicyDetails'
import Credits from '../pages/Credits'
import Diagnostics from '../pages/Diagnostics'
import Onboarding from '../pages/Onboarding'
import WaitingForDevice from '../pages/WaitingForDevice'
import Utilization from '../pages/Utilization'
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
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/forgot-password-email-sent',
    name: 'ForgotPasswordEmailSent',
    component: ForgotPasswordEmailSent
  },
  {
    path: '/new-password',
    name: 'NewPassword',
    component: NewPassword,
    beforeEnter: checkAuth
  },
  {
    path: '/wait',
    name: 'WaitingForDevice',
    component: WaitingForDevice,
    beforeEnter: checkAuth
  },
  {
    path: '/device-sync',
    name: 'SynchronizeDevice',
    component: SynchronizeDevice,
    beforeEnter: checkAuth
  },
  {
    path: '/device-select',
    name: 'SelectDevice',
    component: SelectDevice,
    beforeEnter: checkAuth
  },
  {
    path: '/device-add',
    name: 'AddDevice',
    component: AddDevice,
    beforeEnter: checkAuth
  },
  {
    path: '/user-confirm',
    name: 'ConfirmUserInfo',
    component: ConfirmUserInfo,
    beforeEnter: checkAuth
  },
  {
    path: '/license-intro',
    name: 'IntroduceDriverLicense',
    component: IntroduceDriverLicense,
    beforeEnter: checkAuth
  },
  {
    path: '/license-picture',
    name: 'TakeDriverLicensePicture',
    component: TakeDriverLicensePicture,
    beforeEnter: checkAuth
  },
  {
    path: '/license-confirm',
    name: 'ConfirmDriverLicense',
    component: ConfirmDriverLicense,
    beforeEnter: checkAuth
  },
  {
    path: '/vehicle-confirm',
    name: 'ConfirmVehicleInfo',
    component: ConfirmVehicleInfo,
    beforeEnter: checkAuth
  },
  {
    path: '/introduce-vehicle-video',
    name: 'IntroduceVehicleVideo',
    component: IntroduceVehicleVideo,
    beforeEnter: checkAuth
  },
  {
    path: '/record-vehicle-video',
    name: 'RecordVehicleVideo',
    component: RecordVehicleVideo,
    beforeEnter: checkAuth
  },
  {
    path: '/confirm-vehicle-video',
    name: 'ConfirmVehicleVideo',
    component: ConfirmVehicleVideo,
    beforeEnter: checkAuth
  },
  {
    path: '/risk-form',
    name: 'RiskForm',
    component: RiskForm,
    beforeEnter: checkAuth
  },
  {
    path: '/feedback',
    name: 'SynchronizationFeedback',
    component: SynchronizationFeedback,
    beforeEnter: checkAuth
  },
  {
    path: '/home',
    name: 'Home',
    component: TabsContainer,
    beforeEnter: checkAuth
  },
  {
    path: '/diagnostics',
    name: 'Diagnostics',
    component: Diagnostics,
    beforeEnter: checkAuth
  },
  {
    path: '/policy-details',
    name: 'PolicyDetails',
    component: PolicyDetails,
    beforeEnter: checkAuth
  },
  {
    path: '/credits',
    name: 'Credits',
    component: Credits,
    beforeEnter: checkAuth
  },
  {
    path: '/utilization',
    name: 'Utilization',
    component: Utilization,
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
