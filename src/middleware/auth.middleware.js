const jwt = require('jsonwebtoken')

const errorType = require('../constants/error-types')
const userService = require('../service/user.service')
const authService = require('../service/auth.service');
const md5password = require('../utils/password-handle')
const {PUBLIC_KEY} = require('../app/config')
//验证用户登录信息
const verifyLogin = async (ctx, next) => {
    //1:获取用户信息
    const {name, password} = ctx.request.body
    //2:用户信息不能为空  空字符串==null false  !''为TRUE
    if (!name || !password) {
        const error = new Error(errorType.NAME_OR_PASSWORD_IS_NOT_REQUIRED)
        return ctx.app.emit('error', error, ctx)//第一个参数为事件名称 后面为参数
    }
    //3:判断本次注册用户是否已经存在
    const result = await userService.getUserByName(name);////存储查询到的信息
    const user = result[0]//查询到用户信息
    if (!user) {//用户不存在
        const error = new Error(errorType.USER_NOT_EXISTS)
        return ctx.app.emit('error', error, ctx)
    }

    //4:用户存在了，则判断密码是否正确
    //用户输入的密码加密后和数据库内存储的加密后密码是否不同
    if (md5password(password) !== result[0].password) {
        const error = new Error(errorType.PASSWORD_WRONG)
        return ctx.app.emit('error', error, ctx)
    }

    ctx.user = user

    // 5:执行下一个中间件
    await next()
}

//判断是否认证成功
const verifyAuth = async (ctx, next) => {
    console.log('验证授权middleware')
    //1:获取token
    const authorization = ctx.headers.authorization;
    if (!authorization) {//判断是否携带token
        return ctx.app.emit('error', new Error(errorType.UNAUTHORIAZTION), ctx)
    }
    const token = authorization.replace('Bearer ', '')

    //2:验证token (token携带的数据)
    try {
        const result = jwt.verify(token, PUBLIC_KEY, {
            algorithms: ['RS256']
        })
        ctx.user = result
        await next()
    } catch (e) {
        console.log(e)
        const error = new Error(errorType.UNAUTHORIAZTION)
        ctx.app.emit('error', error, ctx)
    }
}

//判断用户是否有权限修改删除某条动态(判断自己是不是该动态作者)
const verifyPermission = async (ctx, next) => {
    console.log('验证权限middleware')
    //1:获取动态id momentId
    const {momentId} = ctx.params;
    const {content} = ctx.request.body;
    const {id} = ctx.user;

    //2:查询要修改/删除的动态的用户id 判断是否是本人的
    const isPremit = await authService.checkResource(id, momentId)
    if (isPremit) {
        await next()
    } else {
        const error = new Error(errorType.UNPERMISSION)
        ctx.app.emit('error', error, ctx)
    }
}
module.exports = {
    verifyLogin,
    verifyAuth,
    verifyPermission
}
