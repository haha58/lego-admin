const router = require('koa-router')()
const genValidator = require('../middlewares/genValidator')
const {phoneNumberSchema,phoneNumberVeriCodeSchema} = require('../utils/validator/users')
const {sendVeriCode,loginByPhoneNumber} = require('../controller/users/index')

// 路由前缀
router.prefix('/api/users')

// 生成短信验证码
router.post('/genVeriCode', genValidator(phoneNumberSchema), async ctx => {
    const { phoneNumber, isRemoteTest } = ctx.request.body

    // 尝试发送验证码
    const res = await sendVeriCode(phoneNumber, isRemoteTest)

    ctx.body = res
})

// 使用手机号登录
router.post('/loginByPhoneNumber', genValidator(phoneNumberVeriCodeSchema), async ctx => {
    const { phoneNumber, veriCode } = ctx.request.body
    const res = await loginByPhoneNumber(phoneNumber, veriCode)
    ctx.body = res
})

module.exports = router