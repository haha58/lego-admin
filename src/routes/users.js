const router = require('koa-router')()
const genValidator = require('../middlewares/genValidator')
const {phoneNumberSchema} = require('../utils/validator/users')
const sendVeriCode = require('../controller/users/sendVeriCode')
// 路由前缀
router.prefix('/api/users')

// 生成短信验证码
router.post('/genVeriCode', genValidator(phoneNumberSchema), async ctx => {
    const { phoneNumber, isRemoteTest } = ctx.request.body

    // 尝试发送验证码
    const res = await sendVeriCode(phoneNumber, isRemoteTest)

    ctx.body = res
})

module.exports = router