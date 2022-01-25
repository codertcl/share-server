const Router = require('koa-router')
const momentRouter = new Router({prefix:'/moment'})

const {
    create,detail,list,update,remove,addLabels,fileInfo
} = require('../controller/moment.controller.js')

const {
    verifyAuth,verifyPermission
} = require('../middleware/auth.middleware.js')

const {
    verifyLabelExists
} = require('../middleware/label.middleware.js')
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

//给动态添加标签
momentRouter.post('/:momentId/labels',verifyAuth,verifyPermission,verifyLabelExists,addLabels)
//在浏览器通过请求查看动态图片
momentRouter.get('/images/:filename',fileInfo)
module.exports = momentRouter;
