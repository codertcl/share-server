const Router = require('koa-router');
const userRouter = new Router({prefix: '/user'})
const {verifyUser,handlePassword} = require('../middleware/user.middleware')
const {create,avatarInfo} = require('../controller/user.controller')
//1:添加用户
userRouter.post('/', verifyUser,handlePassword, create)
//2:通过接口请求获取用户头像 可以直接在浏览器中显示
userRouter.get('/:userId/avatar',avatarInfo)
module.exports = userRouter
