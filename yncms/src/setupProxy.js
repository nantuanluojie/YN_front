
const { createProxyMiddleware } = require('http-proxy-middleware')
 
module.exports = function (app) {
    app.use(
        createProxyMiddleware('/post', { 
            target: 'http://yncms.domiruby.cn',
            changeOrigin: true,
            pathRewrite: { '^/post': '' }
        })
    )
}