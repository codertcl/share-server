const Router = require('koa-router');
// const userRouter = new Router({
//     prefix: '/user'
// })
const userRouter = new Router()
const {
    verifyUser,
    handlePassword
} = require('../middleware/user.middleware')

const {
    verifyAuth,
    verifyPermission,
    verifyLogin
} = require('../middleware/auth.middleware')
const {
    create,
    getUserInfo,
    updateUserInfo,
    updatePassword
} = require('../controller/user.controller')
//1:添加用户
userRouter.post('/register', handlePassword, create)
//2:通过接口请求获取用信息
userRouter.get('/:userId/userInfo', getUserInfo)
//3:通过接口更新用户信息
userRouter.post('/:userId/userInfo', updateUserInfo)
//4:更新用户密码
userRouter.patch('/:userId/updatePassword',verifyAuth,handlePassword, updatePassword)
module.exports = userRouter