// src\db\mysql2.js

const mysql = require('mysql2/promise')
const { mysqlConfig } = require('../config/dev')

// mysql2 连接测试
async function testMysqlConn() {
  const connection = await mysql.createConnection(mysqlConfig)
  const [rows] = await connection.execute('select now();')
  return rows
}

// 可直接执行 node src/db/mysql2.js 进行测试
 (async () => {
  const rows = await testMysqlConn()
  console.log('🚀🚀 ~ rows', rows);
})()

module.exports = testMysqlConn
