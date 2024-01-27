const { findOneWorkService, updateWorkService } = require('../../server/works')
const { ErrorRes } = require('../../res-model/index')
const { forceOffLineFailInfo } = require('../../res-model/failInfo/index')
const createWorks = require('./createWorks')
/**
 * 复制作品（通过模板创建，也是复制）
 * @param {string} id id
 * @param {string} author 作者 username
 */
async function copyWorks(id, author) {
    const work = await findOneWorkService({ id }) // 被复制的项目不一定是自己的，所以查询条件**不加 author**

    // 是否强制下线
    if (parseInt(work.status, 10) === 3) {
        return new ErrorRes(forceOffLineFailInfo)
    }

    const { content } = work

    // 新项目的信息，要符合 WorksModel 属性规则
    const newData = {
        title: `${work.title}-复制`,
        desc: work.desc,
        coverImg: work.coverImg,

        // 其他信息，如 isTemplate status 等，都不需要
    }

    // 创新新项目
    const res = await createWorks(author, newData, content)

    // 更新源项目的使用次数
    await updateWorkService(
        {
            copiedCount: work.copiedCount + 1,
        },
        { id }
    )

    // 返回新项目
    return res
}

module.exports = copyWorks
