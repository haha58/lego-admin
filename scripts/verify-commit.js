const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const process = require('process')
const msg = fs.readFileSync(path.resolve('.git/COMMIT_EDITMSG'), 'utf-8').trim()

const commitRE = /^(fix|update):.{1,50}/

if (!commitRE.test(msg)) {
  console.log()
  console.error(
    `    ${chalk.bgRed.white(' ERROR ')} ${chalk.red(`Invalid commit message format.`)}\n\n` +
      chalk.red(`    Proper commit message format as below. Example:\n\n`) +
      `    ${chalk.green(`fix:  修改文案字体大小`)}\n\n`
  )
  process.exit(1)
}