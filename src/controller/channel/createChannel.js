const { ErrorRes, SuccessRes } = require('../../res-model/index')
const {
  createChannelFailInfo,
  createChannelDbErrorFailInfo,
} = require('../../res-model/failInfo/index')
const {createChannelService}=require('../../service/channel')
/**
 * 创建渠道
 * @param {object} data 渠道数据
 */
async function createChannel(data = {}) {
  const { workId, name } = data
  if (!workId || !name) return new ErrorRes(createChannelFailInfo, '标题和作品 id 不能为空')

  let result
  try {
      result = await createChannelService(data)
  } catch (ex) {
      console.error('创建渠道错误', ex)
      return new ErrorRes(createChannelDbErrorFailInfo)
  }

  if (result == null) return new ErrorRes(createChannelFailInfo)
  return new SuccessRes(result)
}

module.exports = createChannel
