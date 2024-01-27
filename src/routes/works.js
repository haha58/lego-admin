const router = require('koa-router')()
const genValidator = require('../middlewares/genValidator')
const loginCheck = require('../middlewares/loginCheck')
const { workInfoSchema } = require('../utils/validator/works')
const { createWorks, findOneWork } = require('../controller/works')
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

// 查询单个作品
router.get('/:id', loginCheck, async ctx => {
    const { id } = ctx.params
    const { username } = ctx.userInfo

    const res = await findOneWork(id, username)
    ctx.body = res
})

module.exports = router