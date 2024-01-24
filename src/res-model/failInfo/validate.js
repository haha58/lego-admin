// errno: 1100x
module.exports = {
  // ctx.request.body 格式验证失败
  validateFailInfo: {
      errno: 10001,
      message: '输入数据的格式错误',
  },
    // 修改数据出错
    updateFailInfo: {
      errno: 10004,
      message: '修改数据出错，请重试',
  },
}