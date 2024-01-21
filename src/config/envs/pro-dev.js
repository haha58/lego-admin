const devConfig=require('./dev')

Object.assign(devConfig.redisConfig,{
  host:'editor-redis'
})
Object.assign(devConfig.mysqlConfig,{
  host: 'editor-mysql'
})
Object.assign(devConfig.mongodbConfig,{
  host: 'editor-mongo',
})

module.exports=devConfig