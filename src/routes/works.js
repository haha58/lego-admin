const router = require('koa-router')()
const genValidator = require('../middlewares/genValidator')
const loginCheck = require('../middlewares/loginCheck')
const { workInfoSchema } = require('../utils/validator/works')
const { createWorks, findOneWork, updateWorks, copyWorks, 
    deleteWork, putBackWork,transferWorks,findMyWorks,
    publishWork } = require('../controller/works')
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

// 修改作品信息
router.patch('/:id', loginCheck, async ctx => {
    const { id } = ctx.params
    const { username } = ctx.userInfo

    const res = await updateWorks(id, username, ctx.request.body)
    ctx.body = res
})

// 复制作品（通过模板创建作品，也是复制）
router.post('/copy/:id', loginCheck, async ctx => {
    const { id } = ctx.params
    const { username } = ctx.userInfo

    const res = await copyWorks(id, username)
    ctx.body = res
})

// 删除作品
router.delete('/:id', loginCheck, async ctx => {
    const { id } = ctx.params
    const { username } = ctx.userInfo

    const res = await deleteWork(id, username)
    ctx.body = res
})

// 恢复删除
router.post('/put-back/:id', loginCheck, async ctx => {
    const { id } = ctx.params
    const { username } = ctx.userInfo

    const res = await putBackWork(id, username)
    ctx.body = res
})

// 转赠作品
router.post('/transfer/:id/:receiver', loginCheck, async ctx => {
    const { id, receiver } = ctx.params
    const { username } = ctx.userInfo

    const res = await transferWorks(id, username, receiver)
    ctx.body = res
})

// 获取自己的作品或模板
router.get('/', loginCheck, async ctx => {
    const { username } = ctx.userInfo
    const { title, status, isTemplate = 0, pageIndex, pageSize } = ctx.query
    const res = await findMyWorks(username, { title, status, isTemplate }, { pageIndex, pageSize })
    ctx.body = res
})

// 发布作品
router.post('/publish/:id', loginCheck, async ctx => {
    const { id } = ctx.params
    const { username } = ctx.userInfo
    const res = await publishWork(id, username)
    ctx.body = res
})

// 发布为模板
router.post('/publish-template/:id', loginCheck, async ctx => {
    const { id } = ctx.params
    const { username } = ctx.userInfo
    const res = await publishWork(id, username, 1)
    ctx.body = res
})

module.exports = router