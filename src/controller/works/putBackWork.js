const deleteWork = require('./deleteWork')

/**
 * 恢复删除
 * @param {string} id id
 * @param {string} author 作者 username
 */
async function putBackWork(id, author) {
  const res = await deleteWork(id, author, true)
  return res
}

module.exports = putBackWork

