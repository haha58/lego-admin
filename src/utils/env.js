const process = require('node:process');

const ENV = process.env.NODE_ENV

module.exports = {
    ENV,
    isPrd: ENV === 'production',
    isPrdDev: ENV === 'prd_dev',
    isDev: ENV === 'dev',
    isTest: ENV === 'test',
    isTestRemote:ENV === 'test_remote',
    isTestLocal:ENV === 'test_local'
}