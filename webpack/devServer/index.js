const mock = require("./mock");

// const ignore = /\/point/gi;

module.exports = {
  port: 8089,
  open: true,
  compress: true,
  proxy: {
    // BIM模型
    "/models": {
      target: "http://192.168.8.203:20000",
    },
    // 基础服务
    "/basicinfo-service": {
      target: "http://192.168.8.203:8001",
    },
    // 智慧运维-巡检管理-巡检点
    // "/api/v1/operations/inspection/point": {
    //   target: "http://192.168.8.127:9022/",
    //   pathRewrite: { "^/api/v1": "" },
    // },
  },
  before(app) {
    app.get("*.gz", function(req, res, next) {
      res.setHeader("Content-Encoding", "gzip");
      next();
    });
    mock(app, this.proxy);
  },
};
