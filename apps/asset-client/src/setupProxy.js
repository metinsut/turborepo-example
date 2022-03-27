const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      },
      target: 'https://quattrogatewayassetclient.dev.bordatech.com',
      secure: false
    })
  );
};
