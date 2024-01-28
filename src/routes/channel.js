const router = require('koa-router')()

// 中间件
const loginCheck = require('../middlewares/loginCheck')
const genValidator = require('../middlewares/genValidator')
const channelSchema = require('../utils/validator/channel')

// controller
const { createChannel } = require('../controller/channel/index')

// 路由前缀
router.prefix('/api/channel')

// 创建渠道
router.post('/', loginCheck, genValidator(channelSchema), async ctx => {
    const res = await createChannel(ctx.request.body)
    ctx.body = res
})

module.exports = router
