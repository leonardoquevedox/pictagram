const path = require('path')

const exec = require('child_process').execSync
const rootPath = path.resolve(__dirname, '../../')

const execute = async () => {
  console.log('>  Starting deployment process...')
  console.log('>  Installing npm modules...')
  console.log('>  This may take a while, maybe grab a cup of coffee...')
  await exec('npm install --only=prod', { cwd: rootPath })
  // console.log('>  Migrating database...')
  // await exec('npx sequelize db:migrate', { cwd: rootPath, stdio: 'inherit' })
  console.log('>  Server deployment finished successfully!')
}

execute()
