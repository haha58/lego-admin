const router = require('koa-router')()
const genValidator = require('../middlewares/genValidator')
const loginCheck = require('../middlewares/loginCheck')
const {workInfoSchema} =require('../utils/validator/works')
const {createWorks} =require('../controller/works')
// 路由前缀
router.prefix('/api/works')

// 创建空白作品
router.post('/', loginCheck, genValidator(workInfoSchema), async ctx => {
    // 经过了 loginCheck ，用户信息在 ctx.userInfo 中(这也是为什么后端不需要前端返回用户信息)
    const { username } = ctx.userInfo
    const { title, desc, content = {} } = ctx.request.body

    const res = await createWorks(username, { title, desc }, content)
    ctx.body = res
})

module.exports = router