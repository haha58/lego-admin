const fs = require('fs')
const url = require('url')
const COS = require('cos-nodejs-sdk-v5')
const { OSSConfig, BucketConfig,OSS_CDNHost } = require('../config/index')

// 初始化 oss 实例
// 配置 COS 实例
const cos = new COS(OSSConfig)
function setContentType(suffix){
    switch (suffix) {
      case 'jpg':
      case 'jpeg':
       return 'image/jpeg';
      case 'png':
        return 'image/png';
      default:
        return 'application/octet-stream';
    }
}

/**
 * 替换 url 的 host 为 CDN host
 * @param {string} u url
 */
function replaceCDNHost(u = '') {
    if (!u) return u
    const res = url.parse(u)
    let _protocol
    const { protocol, path } = res
    if(!protocol){
        _protocol='https:'
    }
    const u1 = `${_protocol}//${OSS_CDNHost}${path}` // 替换 CDN host
    return u1
}

/**
 * 上传文件到 oss
 * @param {string} fileName 文件名
 * @param {string} filePath 文件路径
 */
async function uploadOSS(fileName, filePath,suffix) {
    const contentType=setContentType(suffix)
    return new Promise((resolve, reject) => {
        // 上传本地文件到 COS
        cos.putObject(
            {
                ...BucketConfig,
                Key: fileName,
                Body: fs.createReadStream(filePath),
                Headers:{
                    'Content-Disposition':"inline",
                    'Content-Type':contentType
                }
            },
            function (err, data) {
                if (err) {
                    reject(err)
                } else {
                    resolve(replaceCDNHost(data.Location))
                }
            }
        )
    })
}

module.exports = uploadOSS
