const router = require('koa-router')()
const { findPublicTemplates } = require('../controller/templates')
// 路由前缀
router.prefix('/api/templates')

// 获取公共模板
router.get('/', async ctx => {
    const { title, pageIndex, pageSize } = ctx.query
    const res = await findPublicTemplates({ title }, { pageIndex, pageSize })
    ctx.body = res
})

module.exports = router