const mongoose = require('../db/mongoose')

const WorkScheme = mongoose.Schema(
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

const WorkModel = mongoose.model('work', WorkScheme)

module.exports =WorkModel

