const Router = require('koa-router')
const authRouter = new Router()

const {
    login,
    success
} = require('../controller/auth.controller.js')

const {
    verifyLogin,
    verifyAuth
} = require('../middleware/auth.middleware.js')
// 登录
authRouter.post('/login',verifyLogin,login)
authRouter.get('/test',verifyAuth,success)

module.exports = authRouter;
