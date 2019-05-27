import authService from './auth'

const getRootPage = () => {
  const user = authService.getLoggedInUser()
  if (!user || !user.id) return 'Onboarding'
  return 'Home'
}

export default { getRootPage }
