const { spawn } = require('child_process')

function runCmd(cmd, args, options = {}, callback) {
  const child = spawn(cmd, args, options)

  child.stdout.on('data', function (buffer) {
    console.log(buffer.toString())
  })

  child.stdout.on('end', function () {
    callback && callback()
  })

  child.stderr.on('data', data => {
    console.log(data.toString())
  })

  // child.stderr.on('end', data => {
  //   console.log(data)
  // })

  child.on('close', code => {
    console.log(`子进程退出代码：${code}`)
  })
}

module.exports = {
  runCmd
}
