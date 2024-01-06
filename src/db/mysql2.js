// src\db\mysql2.js

const mysql = require('mysql2/promise')
const { mysqlConfig } = require('../config/index')

// mysql2 连接测试
async function testMysqlConn() {
  try {
    const connection = await mysql.createConnection(mysqlConfig)
    const [rows] = await connection.execute('select now();')
    return rows
  } catch (error) {
    console.log("testMysqlConn error",error)
  }
}

// 可直接执行 node src/db/mysql2.js 进行测试
 (async () => {
  try {
    const rows = await testMysqlConn()
    console.log('🚀🚀 ~ rows', rows);
  } catch (error) {
    console.log('error',error)
  }
})()

module.exports = testMysqlConn
