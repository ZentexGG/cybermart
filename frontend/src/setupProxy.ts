import { createProxyMiddleware } from "http-proxy-middleware";

module.exports = function (app: any) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://localhost:7166",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );

  app.use(
    "/Auth",
    createProxyMiddleware({
      target: "https://localhost:7166",
      changeOrigin: true,
      pathRewrite: {
        "^/Auth": "",
      },
    })
  );
};
