// 解密
const { jwtVerify } = require('../utils/jwt')
// 执行失败的数据模型
const { ErrorRes } = require('../res-model/index')
// 错误信息集合
const { loginCheckFailInfo } = require('../res-model/failInfo')

/**
 * 登录校验
 * @param {Object} ctx ctx
 * @param {function} next next
 */
module.exports = async function loginCheck(ctx, next) {
  // 失败信息
  const errRes = new ErrorRes(loginCheckFailInfo)

  // 获取 token
  const token = ctx.header.authorization
  if (!token) {
    ctx.body = errRes
    return
  }

  let flag = true
  try {
    const userInfo = await jwtVerify(token)
    delete userInfo.password // 屏蔽密码

    // 验证成功，获取 userInfo
    ctx.userInfo = userInfo
  } catch (ex) {
    flag = false
    ctx.body = errRes
  }

  if (flag) {
    // 继续下一步
    await next()
  }
}
