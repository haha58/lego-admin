const _ = require('lodash')
const { findOneUserService } = require('../../service/users')
const { ErrorRes } = require('../../res-model/index')
const {
    transferWorkFailInfo,
} = require('../../res-model/failInfo/index')
const updateWorks = require('./updateWorks')

/**
 * 转赠作品
 * @param {string} id id
 * @param {string} author 作者 username
 * @param {string} receiverUsername 接收人 username
 */
async function transferWorks(id, author, receiverUsername) {
    // 两者一样
    if (author === receiverUsername) return new ErrorRes(transferWorkFailInfo, '作者和接收人相同')

    // 判断接收者是否存在
    const receiver = await findOneUserService({ username: receiverUsername })
    if (receiver == null) return new ErrorRes(transferWorkFailInfo, '接收人未找到')

    const res = await updateWorks(id, author, {
        author: receiverUsername,
    })
    return res
}

module.exports = transferWorks
