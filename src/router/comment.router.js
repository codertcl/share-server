const Router = require('koa-router')
const commentRouter = new Router({prefix: '/comment'})

const {
    create, reply, update, remove,list
} = require('../controller/comment.controller.js')

const {
    verifyAuth, verifyPermission
} = require('../middleware/auth.middleware.js')

//发布评论
commentRouter.post('/', verifyAuth, create)
//回复评论
commentRouter.post('/:commentId/reply', verifyAuth, verifyPermission, reply)
//获取评论列表
commentRouter.get('/', list)
// 修改和删除评论
// // 1.用户必须登录 2.用户具备权限
commentRouter.patch('/:commentId', verifyAuth, verifyPermission, update);
commentRouter.delete('/:commentId', verifyAuth, verifyPermission,remove);
module.exports = commentRouter;
