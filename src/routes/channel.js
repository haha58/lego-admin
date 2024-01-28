const router = require('koa-router')()

// 中间件
const loginCheck = require('../middlewares/loginCheck')
const genValidator = require('../middlewares/genValidator')
const channelSchema = require('../utils/validator/channel')

// controller
const { createChannel,updateChannelName } = require('../controller/channel/index')

// 路由前缀
router.prefix('/api/channel')

// 创建渠道
router.post('/', loginCheck, genValidator(channelSchema), async ctx => {
    const res = await createChannel(ctx.request.body)
    ctx.body = res
})

// 更新渠道名称
router.patch('/updateName/:id', loginCheck, genValidator(channelSchema), async ctx => {
    const { id } = ctx.params
    const { name } = ctx.request.body
    const res = await updateChannelName(id, name)
    ctx.body = res
})

module.exports = router
