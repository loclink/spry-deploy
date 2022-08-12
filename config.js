module.exports = {
  port: 6666, // 服务端口号
  password: '123456', // 校验密码 - 对应github的secret 和 gitee的password
  // libPath: '/codermihu/mihu_project_node/mihu_deploy/lib',   // shell脚本存放的绝对路径
  workPathMap: {
    demo: '/root/demo' // 键:需要监听的git仓库名;  值:项目对应服务器的所在的绝对路径
  }
};
