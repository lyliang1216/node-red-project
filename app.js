const http = require("http");
const express = require("express");
const RED = require("node-red");
const config = require("./settings");

const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use("/", express.static("public"));

const server = http.createServer(app);

// 配置
const settings = {
  ...config,
  // nodered访问前缀
  httpAdminRoot: "/red",
  // api访问前缀
  httpNodeRoot: "/api",
  // 用户编辑流程保存地址
  userDir: __dirname + "/flowData",
  functionGlobalContext: {}, // enables global context
};

// 端口
const port = 1880;

// 初始化服务配置
RED.init(server, settings);

// 编辑器入口 /editor
app.use(settings.httpAdminRoot, RED.httpAdmin);

// 接口入口 /api
app.use(settings.httpNodeRoot, RED.httpNode);

app.get("/api/data", (req, res) => {
  res.send({
    code: "success",
    msg: "成功",
    data: {
      value: `这是接口接收到的get请求参数,${JSON.stringify(req.query)}`,
    },
  });
});

server.listen(port);

// Start the runtime
RED.start().then(() => {
  console.log("----------------------------------------------------");
  console.log(
    `启动成功，通过 http://localhost:${port}/${settings.httpAdminRoot} 访问NodeRed`
  );
  console.log("----------------------------------------------------");
});
