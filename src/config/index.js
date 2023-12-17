const {resolve}=require('path')
const { isPrd, isPrdDev } = require('../utils/env')

// 获取各个环境的不同配置文件
let fileName = 'dev.js'
if (isPrdDev) fileName = 'pro-dev.js'
// if (isPrd) fileName = 'prd.js'

const config = require(`./envs/${fileName}`)

module.exports = config
