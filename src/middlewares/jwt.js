const jwtKoa = require('koa-jwt')
const { JWT_SECRET, JWT_IGNORE_PATH } = require('../config/constant')

//后面的中间件只有jwt验证通过才会执行，达到用户验证的效果
module.exports = jwtKoa({
    secret: JWT_SECRET,
    cookie: 'jwt_token', // 使用 cookie 存储 token
}).unless({
    // 定义哪些路由忽略 jwt 验证
    path: JWT_IGNORE_PATH,
})
