const Router = require('koa-router');
const { authWebhooksGitee, authWebhooksGithub } = require('../middleware/webhooks.middleware');
const { handleWebHooks } = require('../controller/webhooks.controller');

const WebHooksRouter = new Router({ prefix: '/webhooks' });
WebHooksRouter.post('/gitee', authWebhooksGitee, handleWebHooks);
WebHooksRouter.post('/github', authWebhooksGithub, handleWebHooks);
WebHooksRouter.get('/', async (ctx,next) => {
  console.log('aaaaaaaa');
  await next()
});
module.exports = WebHooksRouter;
