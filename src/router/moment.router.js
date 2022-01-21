const Router = require('koa-router')
const momentRouter = new Router({prefix:'/moment'})

const {
    create,detail,list
} = require('../controller/moment.controller.js')

const {
    verifyAuth
} = require('../middleware/auth.middleware.js')
//根据动态id查询单条动态
momentRouter.get('/:momentId',detail)
//分页查询查询多条动态
momentRouter.get('/',list)
//发布动态
momentRouter.post('/',verifyAuth,create)
//修改动态信息
// momentRouter.post('/',verifyAuth,create)

module.exports = momentRouter;
