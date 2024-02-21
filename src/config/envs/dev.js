module.exports = {
  // mysql 的配置
  mysqlConfig: {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: "lego-template"
  },
  mongodbConfig: {
    host: '127.0.0.1',
    user: 'admin',
    password: '123456',
    port: '27017',
    database: 'lego-template-detail',
  },
  redisConfig: {
    port: '6379',
    host: '127.0.0.1',
    password: '123456'
  },
  // jwt 过期时间
  jwtExpiresIn: '1d', // 1. 字符串，如 '1h' '2d'； 2. 数字，单位是 s
  // 短信验证码缓存时间，单位 s
  msgVeriCodeTimeout: 2 * 60/*  */,
  // 发布出来的 h5 域名
  h5Origin: 'http://localhost:3001',
  // 配置 COS 实例
  OSSConfig:{
    SecretId: 'AKID18GIF4nLvTuENrDTm8MSROFzXr337LOK',
    SecretKey: 'oUxNbdwACFD4mNn4FMPN7dz83kFPhBav',
  },
  BucketConfig:{
    Bucket:'imooc-dev-1323650952',
    Region:'ap-shanghai'
  },
  OSS_CDNHost:''
}
