const { updateChannelService } = require('../../service/channel')
const {
    updateChannelFailInfo,
    updateChannelDbErrorFailInfo,
} = require('../../res-model/failInfo/index')
const { ErrorRes, SuccessRes } = require('../../res-model/index')

/**
 * 删除渠道
 * @param {string} id id
 */
async function deleteChannel(id) {
    if (!id) return new ErrorRes(updateChannelFailInfo, 'id 不能为空')

    let result
    try {
        result = await updateChannelService(
            {
                status: 0, // 假删除，实际更新 status
            },
            {
                id,
            }
        )
    } catch (ex) {
        console.error('删除渠道错误', ex)
        return new ErrorRes(updateChannelDbErrorFailInfo)
    }

    if (result) return new SuccessRes() // 成功
    return new ErrorRes(updateChannelFailInfo)
}

module.exports = deleteChannel
