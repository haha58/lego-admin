const seq = require('./index')
const process = require('node:process');
// 测试连接, 直接运行 node src/db/seq/conn-test.js
seq.authenticate()
  .then(() => {
    console.log('🚀🚀 ~ ok');
  })
  .catch(() => {
    console.log('🚀🚀 ~ fail',);
  })
  .finally(() => {
    console.log('🚀🚀 ~ finally',);
    process.exit()
  })

