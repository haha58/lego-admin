const { Op } = require('sequelize')
const _ = require('lodash')
const { WorkContentModel } = require('../models/WorkContentModel')
const WorksModel = require('../models/WorksModel')

/**
 * 创建作品!!
 * @param {object} data 作品数据，按照 WorksModel 的属性规则
 * @param {object} content 作品内容
 */
async function createWorkService(data = {}, content = {}) {
    // 创建作品内容 - mongoose
    const { components = [], props = {}, setting = {} } = content
    const newContent = await WorkContentModel.create({
        // 符合 WorkContentModel 属性规则
        components,
        props,
        setting,
    })
    const { _id: contentId } = newContent

    // 创建作品记录 - mysql
    const newWork = await WorksModel.create({
        // 符合 WorksModel 属性规则
        ...data,
        contentId: contentId.toString(), // 需要转换为字符串
    })
    return newWork.dataValues
}

module.exports = {
    createWorkService,
}
