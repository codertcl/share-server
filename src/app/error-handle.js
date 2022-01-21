const errorType = require('../constants/error-types')
//对错误逻辑进行处理
const errorHandler = (error, ctx) => {
    let status, message;
    switch (error.message) {
        case errorType.NAME_OR_PASSWORD_IS_NOT_REQUIRED:
            status = 400;//Bad Request
            // 1、语义有误，当前请求无法被服务器理解。除非进行修改，否则客户端不应该重复提交这个请求。
            // 2、请求参数有误
            message = '用户名或密码不能为空';
            break;
        case errorType.USER_ALREADAY_EXISTS:
            status = 409;//Conflict 由于和被请求的资源的当前状态之间存在冲突，请求无法完成
            message = '用户已存在';
            break;
        case errorType.USER_NOT_EXISTS:
            status = 400;//// 请求参数有误
            message = '用户不存在';
            break;
        case errorType.PASSWORD_WRONG:
            status = 400;//密码错误
            message = '密码错误';
            break;
        case errorType.UNAUTHORIAZTION:
            status = 401;//未授权
            message = '无效token';
            break;
        default:
            status = 404;
            message = 'NOT FOUND'
            break;
    }
    ctx.status = status
    ctx.body = message
}
module.exports = errorHandler
