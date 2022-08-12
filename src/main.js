const app = require('./app')
const config = require('./app/config')
app.listen(config.port, '0.0.0.0', () => {
  console.log(`服务器启动成功，端口号为：${config.port}`)
})
