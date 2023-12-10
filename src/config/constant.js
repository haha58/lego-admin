module.exports = {
  // jwt 秘钥
  JWT_SECRET: 'admin_for-json#web$token',

  // jwt 默认验证所有的，如果是空数组，则会验证所有的。path：全部忽略即可，需要登录验证的，用自己封装的 loginCheck
  JWT_IGNORE_PATH: [/\//],
}
