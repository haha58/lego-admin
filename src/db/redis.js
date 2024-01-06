const redis = require('redis')
const { redisConfig } = require('../config/index')

// 创建客户端
const { port, host, password } = redisConfig


const redisClient = redis.createClient(port, host)
redisClient.on('error', err => {
  console.error('redis connect error', err)
})
redisClient.auth(password, function(error) {
  if (error) {
    console.error('Redis Authentication Failed:', error);
  } else {
    console.log('Redis Authenticated');
  }
});

// 运行 node src/db/redis.js 进行测试连接
redisClient.on('connect', () => {
  console.log('redis connect success')
  redisClient.set('foo', 'bar', redis.print) // => "Reply: OK"
  redisClient.get('foo', redis.print) // => "Reply: bar"
  // redisClient.quit()
})

module.exports = redisClient
