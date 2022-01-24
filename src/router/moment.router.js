const Router = require('koa-router')
const momentRouter = new Router({prefix:'/moment'})

const {
    create,detail,list,update,remove
} = require('../controller/moment.controller.js')

const {
    verifyAuth,verifyPermission
} = require('../middleware/auth.middleware.js')
//根据动态id查询单条动态
momentRouter.get('/:momentId',detail)
//分页查询查询多条动态
momentRouter.get('/',list)
//发布动态
momentRouter.post('/',verifyAuth,create)
//修改和删除动态信息
// 1.用户必须登录 2.用户具备权限
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update);
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove);
module.exports = momentRouter;
