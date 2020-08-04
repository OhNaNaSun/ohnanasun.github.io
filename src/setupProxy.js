/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-var-requires */
const { createProxyMiddleware } = require('http-proxy-middleware')

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8000',
      changeOrigin: true,
      pathRewrite: {
        '^/api/': '/', // remove base path
      },
    })
  )
}
