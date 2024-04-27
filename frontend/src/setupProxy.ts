import { createProxyMiddleware } from "http-proxy-middleware";
const apiUrl = process.env.API_URL
module.exports = function (app: any) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: process.env.API_URL,
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );

  app.use(
    "/Auth",
    createProxyMiddleware({
      target: process.env.API_URL,
      changeOrigin: true,
      pathRewrite: {
        "^/Auth": "",
      },
    })
  );
};
