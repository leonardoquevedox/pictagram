/**
 * @license MIT
 * @version 1.1.0
 * @author Trinca
 * @description Environment configuration.
 */

const dev = {
  baseUrl: 'https://argo-instant-api-dev.azurewebsites.net',
  clientUrl: 'https://argo-instant-dev.azurewebsites.net'
}

const local = {
  ...dev,
  baseUrl: 'http://localhost:3001'
}

const prod = {
  baseUrl: 'https://azup-br-instant-web.azurewebsites.net',
  clientUrl: 'https://azup-br-instant-app.azurewebsites.net'
}

const envs = {
  local,
  dev,
  prod
}

const config = envs[process.env.REACT_APP_STAGE || process.env.npm_config_stage || 'dev']

export default {
  ...config
  // Add common config values here
}
