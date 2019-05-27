const shell = require('shelljs')
const path = require('path')
const dotenv = require('dotenv')
const inquirer = require('inquirer')

dotenv.config()

const { exec } = shell

const rootPath = path.resolve(__dirname, '../../../')

const getGitRemoteUrlFor = stage => {
  const GIT_REMOTE = `${stage.toUpperCase()}_REMOTE_URL`
  const remote = process.env[GIT_REMOTE]
  const isWindows = process.platform === 'win32'
  return isWindows ? remote : `'${remote}'` // Prevents bash from resolving "$" as variables
}

const promptForStage = () =>
  inquirer.prompt([
    {
      type: 'list',
      name: 'stage',
      message: 'For which stage would you like to deploy?',
      choices: ['dev', 'homolog', 'prod'],
      default: false
    }
  ])

const build = async () => {
  let stage = process.env.REACT_APP_STAGE
  if (!stage) stage = (await promptForStage()).stage || 'dev'
  const commitMsg = 'update(client): Atualização da aplicação.'
  console.log(`Building app for ${stage} environment...`)
  await exec(`cross-env REACT_APP_PLATFORM=browser REACT_APP_STAGE=${stage} npm run build`, {
    cwd: rootPath
  })
  // Use this for commit based deploys
  console.log(`Generating commit...`)
  await exec('git add .', { cwd: rootPath })
  await exec(`git commit -m "${commitMsg}"`, { cwd: rootPath })
  await exec(`git push -f ${getGitRemoteUrlFor(stage)} master`, { cwd: rootPath })
  console.log(`build deployed successfully!`)
  process.exit()
}

build()
