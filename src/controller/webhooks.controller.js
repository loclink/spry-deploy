const { runCmd } = require("../utils/run-cmd");
const { errorTypes } = require("../error/error-types");
const config = require("../app/config");

class WebHooksController {
  async handleWebHooks(ctx, next) {
    const repositoryName = ctx.request.body._repositoryName;
    const shellIsExist = config.shellNames.includes(repositoryName);
    const workPath = config.workPathMap[repositoryName];
    if (!shellIsExist) ctx.emitError(errorTypes.NO_EXECUTION_FILE);
    if(!workPath) ctx.emitError(errorTypes.WORK_PATH_NOT_EXIST)
    runCmd(
      "sh",
      [`${config.libPath}/${repositoryName}.sh`, workPath],
      {
        cwd: workPath,
      },
      () => {
        console.log(`[${repositoryName}] 任务执行结束!`);
      },
    );

    ctx.body = {
      code: 200,
      message: "回调成功",
    };
  }
}

module.exports = new WebHooksController();
