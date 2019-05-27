import authService from './auth'

const getMobileRoot = () => {
  const user = authService.getLoggedInUser()
  const { vehicle } = user
  console.log(user)
  if (!user || !user.id) return 'Onboarding'
  if (!user.devices || !user.devices.length > 0) return 'WaitingForDevice'
  // if (user.devices && user.devices.length > 0 && !user.cnhPhoto) return 'ConfirmUserInfo'
  // if (!user.cnhPhoto) return 'IntroduceDriverLicense'
  if (user.cnhPhoto && !vehicle.video) return 'ConfirmVehicleInfo'
  if (user.cnhPhoto && vehicle.video && !user.riskAnalysisId) return 'RiskForm'
  return 'Home'
}

const getRootPage = () => {
  const rootPage = process.env.REACT_APP_PLATFORM === 'browser' ? 'Landing' : getMobileRoot()
  return rootPage
}

export default { getRootPage }
