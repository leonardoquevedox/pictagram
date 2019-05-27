const shell = require('shelljs')
const path = require('path')
const inquirer = require('inquirer')

const { exec } = shell
const rootPath = path.resolve(__dirname, '../../')

const promptForStage = () =>
  inquirer.prompt([
    {
      type: 'list',
      name: 'stage',
      message: 'For which stage would you like to build the app?',
      choices: ['dev', 'homolog', 'prod'],
      default: false
    }
  ])

const build = async () => {
  const platform = process.env.REACT_APP_PLATFORM
  let stage = process.env.REACT_APP_STAGE
  if (!stage) stage = (await promptForStage()).stage || 'dev'
  console.log(`△  Building application for ${stage} environment...`)
  await exec(
    `npx cross-env REACT_APP_STAGE=${stage} cross-env REACT_APP_PLATFORM=${platform} react-scripts start`,
    { cwd: rootPath }
  )
  process.exit()
}

build()
