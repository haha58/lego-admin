const { findOneWorkService } = require('../../service/works')
const {
    findOneWorkFailInfo,
    findOneWorkDbErrorFailInfo,
} = require('../../res-model/failInfo/index')
const { ErrorRes, SuccessRes } = require('../../res-model/index')
const {formatTemplate} =require('./utils')

/**
 * 查询单个作品
 * @param {string} id id
 */
async function findOneTemplate(id) {
    if (!id) return new ErrorRes(findOneWorkFailInfo, 'id 为空')

    let template
    try {
        template = await findOneWorkService({
            id,
            isTemplate: 1,
            isPublic: 1, // 公开的
        })
    } catch (ex) {
        console.error('查询单个模板', ex)
        return new ErrorRes(findOneWorkDbErrorFailInfo) // 数据库错误
    }

    // 查询失败
    if (template == null) return new ErrorRes(findOneWorkFailInfo)

    // 格式忽视
    template = formatTemplate(template)

    // 查询成功
    return new SuccessRes(template)
}

module.exports = findOneTemplate