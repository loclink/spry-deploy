function MhGlobalMiddleware(app, handleError) {
  app.on('error', handleError)

  app.context.emitError = function (errorType) {
    this.throw(errorType)
  }

  return async function (ctx, next) {
    try {
      await next()
    } catch (error) {
      return ctx.app.emit('error', error, ctx)
    }
  }
}

module.exports = {
  MhGlobalMiddleware
}
