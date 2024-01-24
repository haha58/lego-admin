const mongoose = require('../db/mongoose')

const contentSchema = mongoose.Schema(
  {
    // mongodb 会自动生成 _id,不用自己专门定义
    //标题
    title: String,
    // 页面的组件列表
    components: [Object],
    // 页面的属性
    props: Object,
    setting: Object,
  },
  {
    timestamps: true
  }
)

const WorkContentModel = mongoose.model('workContent', contentSchema)
// 发布的内容
const WorkPublishContentModel = mongoose.model('workPublishContent', contentSchema)

module.exports = {
  WorkContentModel,
  WorkPublishContentModel,
}
