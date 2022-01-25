const fs=require('fs')
const userService = require('../service/user.service')
const fileService = require('../service/file.service')
const {AVATAR_PATH}=require('../constants/file-path')
class userController {
    //1:创建用户
    async create(ctx, next) {
        // 获取用户请求传递的参数
        const user = ctx.request.body
        // 获取SQL语句执行结果,设置到ctx.body中
        // 返回数据
        ctx.body = await userService.create(user)
    }


    //2:获取头像信息
    async avatarInfo(ctx, next) {
        // 获取用户请求传递的参数
        const {userId} = ctx.params
        const avatarInfo = await fileService.getAvatarByUserId(userId)
        ctx.response.set('content-type',avatarInfo.mimeType)
        ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`)
    }
}

module.exports = new userController()
