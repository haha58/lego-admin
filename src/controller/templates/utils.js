/**
 * 隐藏手机号
 * @param {string} number 手机号
 */
function hidePhoneNumber(number = '') {
  const n = number.toString()

  if (!n) return n

  const reg = /^1[3456789]\d{9}$/ // 手机号正则
  if (reg.test(n) === false) return n

  return n.slice(0, 3) + '****' + n.slice(-4) // eslint-disable-line
}

/**
 * 格式化公共的模板数据，隐藏一些信息
 * @param {object|Array} template 模板数据
 */
function formatTemplate(template = {}) {
  if (Array.isArray(template)) {
      // 传入了 list
      return template.map(t => formatTemplate(t))
  }

  // 传入了单个 template
  const result = template

  // 用户名若是手机号，则隐藏手机号
  result.author = hidePhoneNumber(result.author)
  if (result.user) {
      const user = result.user.dataValues
      user.userName = hidePhoneNumber(user.userName)
  }

  return result
}

module.exports = {formatTemplate,hidePhoneNumber}