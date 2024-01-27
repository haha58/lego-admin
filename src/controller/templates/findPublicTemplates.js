const { findWorkListService } = require('../../service/works')
const { publicTemplatesCacheGet, publicTemplatesCacheSet } = require('../../cache/works/templates')
const { SuccessRes } = require('../../res-model/index')
const { DEFAULT_PAGE_SIZE } = require('../../config/constant')
const {formatTemplate} =require('./utils')
/**
 * 查询公共模板
 * @param {object} queryInfo 查询条件
 * @param {object} pageInfo 分页
 */
async function findPublicTemplates(queryInfo = {}, pageInfo = {}) {
    // 试图从 cache 中获取
    const templatesFromCache = await publicTemplatesCacheGet(queryInfo, pageInfo)
    if (templatesFromCache != null) {
        // 从缓存中获取
        return new SuccessRes(templatesFromCache)
    }

    const { id, uuid, title } = queryInfo
    let { pageIndex, pageSize } = pageInfo
    pageIndex = parseInt(pageIndex, 10) || 0
    pageSize = parseInt(pageSize, 10) || DEFAULT_PAGE_SIZE

    // 缓存中没有，从数据库获取
    const { list, count } = await findWorkListService(
        {
            id,
            uuid,
            title,
            isTemplate: 1,
            isPublic: 1, // 公开的
        },
        {
            pageIndex,
            pageSize,
        }
    )

    // 格式化模板
    const formatList = formatTemplate(list)

    // 记录到缓存
    publicTemplatesCacheSet(queryInfo, pageInfo, { list: formatList, count })

    // 返回
    return new SuccessRes({ list: formatList, count })
}

module.exports = findPublicTemplates
