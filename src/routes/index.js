// src\routes\index.js
const router = require('koa-router')()
const packageInfo = require('../../package.json')
// const testMysqlConn = require('../db/mysql2')
const ENV = require('../utils/env')
// const  WorkModel  = require('../models/WorksModel')
const { cacheGet, cacheSet } = require('../utils/cache/index')

// 测试数据库连接
router.get('/api/db-check', async (ctx) => {
  // // 测试 mysql 数据库连接
  // const mysqlRes = await testMysqlConn()

  // // 测试 mongodb 数据库连接
  // let mongodbConn
  // try {
  //   mongodbConn = true
  //   await WorkModel.findOne()
  // } catch (error) {
  //   mongodbConn = false
  // }

  // 测试 Redis 连接
  cacheSet('name', 'lego editor sever OK - by redis')
  const redisTestVal = await cacheGet('name')

  ctx.body = {
    errno: 0,
    data: {
      name: 'lego editor server',
      version: packageInfo.version,
      ENV,
      // mysqlConn: mysqlRes.length > 0,
      // mongodbConn,
      redisConn: redisTestVal,
    }
  }
})

module.exports = router
