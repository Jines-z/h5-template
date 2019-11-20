const path     = require('path')
const NODE_ENV = process.env.NODE_ENV || 'development'

const ex = {
    port       : 8080,
    host       : 'web1.jituancaiyun.net',
    alias      : '@root',
    aliasURL   : '@url',
    baseDir    : __dirname,
    srcDir     : path.resolve(__dirname, 'src'),
    outDir     : path.resolve(__dirname, 'dist'),
    revDir     : path.resolve(__dirname, 'dist', 'rev'),
    tempDir    : path.resolve(__dirname, 'temp/'),
    publicPath : NODE_ENV === 'development' ? './' : 'https://xx.xx.com',
    publicURL  : ''
}

// publicPath：若使用cdn，打包前请修改成静态资源服务器地址，否则直接写 "./"
// publicURL ：若使用跨域代理，请配置服务器地址，使用“/@url”即可代理

module.exports = ex
