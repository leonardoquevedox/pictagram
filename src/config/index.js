/**
 * @license MIT
 * @version 1.1.0
 * @author Leonardo Quevedo
 * @description Environment configuration.
 */

const dev = {
  baseUrl: 'https://fretefacil-dev.herokuapp.com'
}

const local = {
  ...dev,
  baseUrl: 'http://localhost:3001'
}

const prod = {
  baseUrl: 'https://fretefacil-prod.herokuapp.com'
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
