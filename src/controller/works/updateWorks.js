const _ = require('lodash')
const { updateWorkService } = require('../../service/works')
const { ErrorRes, SuccessRes } = require('../../res-model/index')
const {
    updateWorkFailInfo,
    updateWorkDbErrorFailInfo,
} = require('../../res-model/failInfo/index')

/**
 * 修改作品
 * @param {string} id id
 * @param {string} author 作者 username （安全性，不允许修改他人作品）
 * @param {object} data 作品数据
 */
async function updateWorks(id, author, data = {}) {
    // 保证数据不为空
    if (!id || !author) return new ErrorRes(updateWorkFailInfo, 'id 或 author 不能为空')
    if (_.isEmpty(data)) return new ErrorRes(updateWorkFailInfo, '更新数据不能为空')

    let res
    try {
        res = await updateWorkService(data, { id, author })
    } catch (ex) {
        console.error('更新作品错误', id, ex)
        return new ErrorRes(updateWorkDbErrorFailInfo) // 数据库错误
    }

    // 更新成功
    if (res) return new SuccessRes()
    // 更新失败
    return new ErrorRes(updateWorkFailInfo, 'id 或 author 不匹配')
}
module.exports = updateWorks