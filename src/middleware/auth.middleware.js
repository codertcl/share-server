const errorType = require('../constants/error-types')
const service = require('../service/user.service')
const md5password = require('../utils/password-handle')

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
    const result = await service.getUserByName(name);////存储查询到的用户信息
    if (!result[0]) {//用户不存在
        const error = new Error(errorType.USER_NOT_EXISTS)
        return ctx.app.emit('error', error, ctx)
    }

    //4:用户存在了，则判断密码是否正确
    //用户输入的密码加密后和数据库内存储的加密后密码是否不同
    if (md5password(password)!==result[0].password) {
        const error = new Error(errorType.PASSWORD_WRONG)
        return ctx.app.emit('error', error, ctx)
    }

    // 4:执行下一个中间件
    await next()
}

module.exports = {
    verifyLogin,
}
