const axios = require("axios");

module.exports = function (RED) {
  function Device(config) {
    RED.nodes.createNode(this, config);
    this.on("input", function (msg) {
      // 这里处理接收到的消息
      console.log("Received:", msg.payload);
      // 发送消息到下一个节点
      this.send(msg);
    });

    // 监听Node-RED的部署事件
    RED.events.on("deploy", function () {
      console.log("deploy: Here Can't trigger Device");
    });
    RED.events.on("nodes:deploy", function () {
      console.log("nodes:deploy: Here Can't trigger Device");
    });
    RED.events.on("flows:started", function () {
      console.log("flows:started: Can trigger Device");
    });

    // RED.events.on("flows:started", function () {
    //   console.log("可以触发");

    //   // 发送HTTP请求到Node.js服务接口
    //   axios
    //     .post("http://localhost:3000/deploy", {
    //       message: "Node-RED 流程部署完成", // 根据需要发送的数据进行配置
    //     })
    //     .then(function (response) {
    //       console.log(
    //         "HTTP请求成功发送到Node.js服务接口",
    //         JSON.stringify(response)
    //       );
    //       // 可选：在这里处理接收到的响应数据
    //     })
    //     .catch(function (error) {
    //       console.log("发送HTTP请求时发生错误", JSON.stringify(error));
    //     });
    // });
  }
  RED.nodes.registerType("device", Device);
};
