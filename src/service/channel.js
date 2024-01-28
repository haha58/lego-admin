const ChannelModel = require('../models/ChannelModel')

/**
 * 创建渠道
 * @param {object} data 渠道数据
 */
async function createChannelService(data = {}) {
    const newChannel = await ChannelModel.create(data)
    return newChannel.dataValues
}

module.exports = {
    createChannelService,
}
