const Router = require('koa-router');
const userRouter = new Router({prefix: '/user'})
const {verifyUser,handlePassword} = require('../middleware/user.middleware')
const {create} = require('../controller/user.controller')

userRouter.post('/', verifyUser,handlePassword, create)

module.exports = userRouter
