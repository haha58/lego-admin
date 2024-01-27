const { findWorkListService } = require('../../service/works')
const { SuccessRes } = require('../../res-model/index')
const { DEFAULT_PAGE_SIZE } = require('../../config/constant')

/**
 * 获取自己的作品或模板
 * @param {string} author 作者
 * @param {object} queryInfo 查询条件
 * @param {object} pageInfo 分页
 */
async function findMyWorks(author, queryInfo = {}, pageInfo = {}) {
    const { id, uuid, title, status, isTemplate } = queryInfo

    let { pageIndex, pageSize } = pageInfo
    pageIndex = parseInt(pageIndex, 10) || 0
    pageSize = parseInt(pageSize, 10) || DEFAULT_PAGE_SIZE

    const { list, count } = await findWorkListService(
        {
            id,
            uuid,
            title,
            status,
            author,
            isTemplate,
        },
        {
            pageIndex,
            pageSize,
        }
    )
    return new SuccessRes({ list, count })
}

module.exports = findMyWorks
