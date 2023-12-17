// 获取 get 请求
const { get } = require('./server')

test('数据库连接', async () => {

  // 获取数据
  const { data, errno } = await get('/api/db-check')

  const { redisConn, mysqlConn, mongodbConn } = data

  expect(errno).toBe(0)
  // expect(redisConn).toBe('lego editor sever OK - by redis')
  // expect(mysqlConn).toBe(false)
  // expect(mongodbConn).toBe(false)
})
