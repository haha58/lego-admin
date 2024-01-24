const {strRule,numRule } = require('./commonRule')

module.exports = {
    type: 'object',
    // 用户信息要符合 ChannelModel 配置
    required: ['name'],
    properties: {
        name: strRule,
        workId: numRule,
    },
}
