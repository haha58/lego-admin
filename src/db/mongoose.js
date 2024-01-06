const mongoose = require('mongoose')
const { mongodbConfig } = require('../config/index')

const { host, port, database, user, password } = mongodbConfig

// 拼接连接字符串
let url = `mongodb://${host}:${port}` // dev 环境

if (user && password) {
  url = `mongodb://${user}:${password}@${host}:${port}` // prd 环境
}


// 开始连接（ 使用用户名和密码时，需要 `?authSource=admin` ）
mongoose.connect(`${url}/${database}?authSource=admin`)

// 连接对象
const db = mongoose.connection

db.on('error', err => {
  console.error('mongoose connect error', err)
})

// 用以测试数据库连接是否成功
db.once('open', () => {
  console.log('🚀🚀 mongoose connect success');
})

module.exports = mongoose
