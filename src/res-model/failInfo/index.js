const errorInfos = require('./error')
const validateInfos = require('./validate')
const usersInfos = require('./users')
const worksInfos = require('./works')
const utilsInfos = require('./utils')
const channelInfos = require('./channel')

module.exports = {
    ...errorInfos,
    ...validateInfos,
    ...usersInfos,
    ...worksInfos,
    ...utilsInfos,
    ...channelInfos,
}