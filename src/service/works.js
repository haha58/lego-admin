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

/**
 * 更新作品数据
 * @param {object} data 要更新的数据
 * @param {object} whereOpt 查询提交件
 * @returns {boolean} true/false
 */
async function updateWorkService(data = {}, whereOpt = {}) {
    // 保证数据不为空
    if (_.isEmpty(data)) return false
    if (_.isEmpty(whereOpt)) return false

    // 判断要更新的数据，是否存在
    const work = await findOneWorkService(whereOpt)
    if (work == null) return false

    // 要更新的数据
    const updateData = data

    // 更新 content - mongodb
    const { content } = updateData
    if (content) {
        // 更新 content
        const { contentId } = work
        await WorkContentModel.findByIdAndUpdate(contentId, {
            // 属性符合 ContentModel 规定
            components: content.components || [],
            props: content.props || {},
            setting: content.setting || {},
        })
    }

    // 删除不需要更新的数据
    delete updateData.id
    delete updateData.uuid
    delete updateData.content
    delete updateData.contentId

    if (_.isEmpty(updateData)) {
        // 至此，更新数据为空。
        // 这也可能正常，例如用户只更新 content ，content 是存储到 mongodb 的，不会更新 mysql
        return true
    }

    // 更新作品数据 - mysql
    const result = await WorksModel.update(updateData, { where: whereOpt })

    return result[0] !== 0
}

module.exports = {
    createWorkService,
    findOneWorkService,
    updateWorkService
}
