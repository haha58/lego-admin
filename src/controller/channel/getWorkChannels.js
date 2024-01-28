const { findChannelsService } = require('../../service/channel')
const { findChannelListFailInfo } = require('../../res-model/failInfo/index')
const { ErrorRes, SuccessRes } = require('../../res-model/index')

/**
 * 获取作品的渠道列表
 * @param {string} workId 作品 id
 */
async function getWorkChannels(workId) {
    if (!workId) return new ErrorRes(findChannelListFailInfo, 'id 和名称不能为空')

    const result = await findChannelsService({
        workId,
    })

    return new SuccessRes(result)
}

module.exports = getWorkChannels
