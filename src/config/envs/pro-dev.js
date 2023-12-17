const devConfig=require('./dev')

Object.assign(devConfig.redisConfig,{
  host:'editor-redis'
})

module.exports=devConfig