import { createProxyMiddleware } from "http-proxy-middleware";
const apiUrl = process.env.API_URL
module.exports = function (app: any) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: apiUrl,
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );

  app.use(
    "/Auth",
    createProxyMiddleware({
      target: apiUrl,
      changeOrigin: true,
      pathRewrite: {
        "^/Auth": "",
      },
    })
  );
};
