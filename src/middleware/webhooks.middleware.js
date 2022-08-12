const crypto = require('crypto')

const config = require('../app/config')

const { errorTypes } = require('../error/error-types')

class WebHooksMiddleware {
  // 校验gitee的参数
  async authWebhooksGitee(ctx, next) {
    const repositoryName = ctx.request.body.project?.name
    if (!repositoryName) ctx.emitError(errorTypes.MISSING_PARAMETER)
    const { password } = ctx.request.body

    if (config.password !== password) {
      ctx.emitError(errorTypes.TOKEN_CHECK_FAILED)
    }

    ctx.request.body._repositoryName = repositoryName
    await next()
  }

  // 校验github的参数
  async authWebhooksGithub(ctx, next) {
    const sha1 = ctx.request.headers['x-hub-signature']
    const repositoryName = ctx.request.body.repository?.name

    if (!sha1) ctx.emitError(errorTypes.TOKEN_CHECK_FAILED)
    if (!repositoryName) ctx.emitError(errorTypes.MISSING_PARAMETER)

    const token = `sha1=${crypto
      .createHmac('sha1', config.password)
      .update(JSON.stringify(ctx.request.body))
      .digest('hex')}`

    if (token !== sha1) {
      ctx.emitError(errorTypes.TOKEN_CHECK_FAILED)
    }

    ctx.request.body._repositoryName = repositoryName

    await next()
  }
}

module.exports = new WebHooksMiddleware()
