const { Op } = require('sequelize')
const _ = require('lodash')
const { WorkContentModel } = require('../models/WorkContentModel')
const WorksModel = require('../models/WorksModel')
const UserModel = require('../models/UserModel')

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

/**
 * 查询单个作品
 * @param {object} whereOpt 查询条件
 */
async function findOneWorkService(whereOpt = {}) {
    if (_.isEmpty(whereOpt)) return null // 无查询条件

    // 查询作品记录 - mysql
    const result = await WorksModel.findOne({
        // 符合 WorksModel 的属性规则
        where: whereOpt,
        include: [
            // 关联 User
            {
                model: UserModel,
                attributes: ['userName', 'nickName', 'gender', 'picture'],
            },
        ],
    })

    if (result == null) {
        // 未查到
        return result
    }
    const work = result.dataValues

    // 查询作品内容 - mongodb
    const { contentId } = work
    const content = await WorkContentModel.findById(contentId)

    // 返回查询结果
    return {
        ...work,
        content, // 拼接上作品内容
    }
}


module.exports = {
    createWorkService,
    findOneWorkService
}
