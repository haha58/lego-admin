const { ErrorRes, SuccessRes } = require('../../res-model/index')
const {
  updateChannelFailInfo,
  updateChannelDbErrorFailInfo,
} = require('../../res-model/failInfo/index')
const {updateChannelService}=require('../../service/channel')

/**
 * 更新渠道
 * @param {string} id id
 * @param {string} name 名称
 */
async function updateChannelName(id, name) {
  if (!id || !name) return new ErrorRes(updateChannelFailInfo, 'id 和名称不能为空')

  let result
  try {
      result = await updateChannelService({ name }, { id })
  } catch (ex) {
      console.error('更新渠道错误', ex)
      return new ErrorRes(updateChannelDbErrorFailInfo)
  }

  if (result) return new SuccessRes() // 成功
  return new ErrorRes(updateChannelFailInfo)
}

module.exports = updateChannelName