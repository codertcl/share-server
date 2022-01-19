const errorType = require('../constants/error-types')
const service = require('../service/user.service')
const md5password = require('../utils/password-handle')
//验证用户信息
const verifyUser = async (ctx, next) => {
    //1:获取用户信息
    const {name, password} = ctx.request.body

    //2:用户信息不能为空  空字符串==null false  !''为TRUE
    if (!name || !password) {
        const error = new Error(errorType.NAME_OR_PASSWORD_IS_NOT_REQUIRED)
        return ctx.app.emit('error', error, ctx)//第一个参数为事件名称 后面为参数
    }
    //3:判断本次注册用户是否已经存在
    const result = await service.getUserByName(name);
    if (result.length) {
        const error = new Error(errorType.USER_ALREADAY_EXISTS)
        return ctx.app.emit('error', error, ctx)
    }

    // 4:执行下一个中间件
    await next()
}

//加密密码
const handlePassword = async (ctx, next) => {
    let {password} = ctx.request.body;
    ctx.request.body.password = md5password(password);
    await next();//调用下一个中间件或者函数
}
module.exports = {
    verifyUser,
    handlePassword
}
