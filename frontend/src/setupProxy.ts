import { createProxyMiddleware } from "http-proxy-middleware";
const apiUrl = process.env.API_URL
module.exports = function (app: any) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://ec2-18-199-33-90.eu-central-1.compute.amazonaws.com",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );

  app.use(
    "/Auth",
    createProxyMiddleware({
      target: "https://ec2-18-199-33-90.eu-central-1.compute.amazonaws.com",
      changeOrigin: true,
      pathRewrite: {
        "^/Auth": "",
      },
    })
  );
};
