
const { v4: uuidV4 } = require('uuid')
const { ErrorRes, SuccessRes } = require('../../res-model/index')
const {createWorksFailInfo,createWorksDbErrorFailInfo} = require('../../res-model/failInfo')
const { createWorkService} = require('../../service/works')
/**
 * 创建作品
 * @param {string} author 作者 username
 * @param {object} data 作品数据
 * @param {object} content 作品内容（复制作品时，会传入）
 */
async function createWorks(author, data = {}, content = {}) {
  const { title } = data
  if (!title) {
      // 标题不能为空
      return new ErrorRes(createWorksFailInfo, '标题不能为空')
  }

  // uuidV4() 生成的格式如 'bc5af863-dd15-4bd9-adbe-37ea1e6450ce'
  // uuid 要用于拼接作品发布后的 url ，url 太长会导致二维码混乱。所以，只取 uuid 前几位即可。
  // uuid 太短，重复了怎么办？—— 可参考发布作品，生成 url 时的代码逻辑和注释。
  const uuid = uuidV4().slice(0, 4)
  try {
      const newWork = await createWorkService(
          {
              // 按照 WorksModel 属性
              ...data,
              author,
              uuid,
          },
          content
      )

      // 创建成功
      return new SuccessRes(newWork)
  } catch (ex) {
      console.error('创建作品失败', ex)
      return new ErrorRes(createWorksDbErrorFailInfo) // 写入数据库失败
  }
}

module.exports = createWorks