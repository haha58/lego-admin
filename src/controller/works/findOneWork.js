const { findOneWorkService } = require('../../server/works')
const { ErrorRes, SuccessRes } = require('../../res-model/index')
const {
    findOneWorkFailInfo,
    findOneWorkDbErrorFailInfo,
} = require('../../res-model/failInfo/index')

/**
 * 查询单个作品
 * @param {string} id id
 * @param {string} author 作者 username（保证安全性，避免查询他人作品）
 */
async function findOneWork(id, author) {
    if (!id || !author) return new ErrorRes(findOneWorkFailInfo, 'id 或 author 为空')

    let work
    try {
        work = await findOneWorkService({
            id,
            author,
        })
    } catch (ex) {
        console.error('查询单个作品', ex)
        return new ErrorRes(findOneWorkDbErrorFailInfo) // 数据库错误
    }

    // 查询失败
    if (work == null) return new ErrorRes(findOneWorkFailInfo, 'id 或 author 不匹配')

    // 查询成功
    return new SuccessRes(work)
}

module.exports = findOneWork