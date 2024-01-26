const { getVeriCodeFromCache } = require('../../cache/users/veriCode')
const {
    loginVeriCodeIncorrectFailInfo,
    createUserDbErrorFailInfo,
    userFrozenFailInfo,
} = require('../../res-model/failInfo/index')
const { ErrorRes, SuccessRes } = require('../../res-model/index')
const {
    findOneUserService,
    createUserService,
    updateUserInfoService,
} = require('../../server/users')
const doCrypto = require('../../utils/cryp')
const genPassword = require('../../utils/genPassword')
const { jwtSign } = require('../../utils/jwt')

/**
 * 通过手机验证码登录
 * @param {string} phoneNumber 手机号
 * @param {string} veriCode 验证码
 */
async function loginByPhoneNumber(phoneNumber, veriCode) {
    //从缓存中获得验证码
    const veriCodeFromCache = await getVeriCodeFromCache(phoneNumber)
    if (veriCode !== veriCodeFromCache) {
        // 验证码不正确
        return new ErrorRes(loginVeriCodeIncorrectFailInfo)
    }

    // 先查找，找到的就返回
    const userInfo = await findOneUserService({
        phoneNumber,
    })
    if (userInfo) {
        // 用户是否冻结
        if (userInfo.isFrozen) return new ErrorRes(userFrozenFailInfo)

        // 更新最后登录时间，做一些活跃用户的数据统计
        try {
            await updateUserInfoService(userInfo.username, {
                latestLoginAt: new Date(),
            })
        } catch (ex) {
            console.error('更新最后登录时间错误', ex) // 只记录错误，不是主要错误，不影响登录逻辑
        }

        // 返回登录成功信息,根据用户信息对token加密
        return new SuccessRes({
            token: jwtSign(userInfo),
        })
    }

    // 查找不到，表示新用户，则创建，--- 此处随机生成一个密码，预留
    let password = genPassword() // 手机号注册，生成随机的密码
    password = doCrypto(password) // 加密密码

    try {
        const newUser = await createUserService({
            // 要符合 UserModel 的属性规定
            username: phoneNumber, // 用手机号
            password,
            phoneNumber,
            nickName: `默认用户${phoneNumber.slice(-4)}`, // 默认给一个昵称
            latestLoginAt: new Date(),
        })
        // 创建成功
        return new SuccessRes({
            token:'Bearer '+ jwtSign(newUser),
        })
    } catch (ex) {
        console.error('创建用户失败', ex)
        return new ErrorRes(createUserDbErrorFailInfo)
    }
}

module.exports = loginByPhoneNumber
