const Router = require('koa-router')
const labelRouter = new Router({prefix:'/label'})

const {
    create,list
} = require('../controller/label.controller.js')

const {
    verifyLogin,
    verifyAuth
} = require('../middleware/auth.middleware.js')
//创建标签
labelRouter.post('/',verifyAuth,create)
//分页获取标签
labelRouter.get('/',list)
module.exports = labelRouter;
