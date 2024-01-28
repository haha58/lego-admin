const ChannelModel = require('../models/ChannelModel')
const _ = require('lodash')

/**
 * 创建渠道
 * @param {object} data 渠道数据
 */
async function createChannelService(data = {}) {
    const newChannel = await ChannelModel.create(data)
    return newChannel.dataValues
}

/**
 * 更新渠道
 * @param {object} data 要更新的数据
 * @param {object} whereOpt 查询条件
 */
async function updateChannelService(data = {}, whereOpt = {}) {
    if (_.isEmpty(whereOpt)) return false
    if (_.isEmpty(data)) return false

    const result = await ChannelModel.update(data, { where: whereOpt })

    return result[0] !== 0
}

module.exports = {
    createChannelService,
    updateChannelService
}
