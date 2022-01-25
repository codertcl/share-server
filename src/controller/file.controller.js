const service = require('../service/file.service')
const userService = require('../service/user.service')
const {AVATAR_PATH} = require('../constants/file-path')
const {APP_PORT, APP_HOST} = require('../app/config')

class FileController {
    //保存头像信息
    async saveAvatarInfo(ctx, next) {
        //1:获取图片信息
        const {filename, mimetype, size} = ctx.req.file;
        const {id} = ctx.user
        // 2:信息保存到数据库中
        await service.createAvatar(filename, mimetype, size, id)

        //3:将图片url添加到user表中
        const avatarUrl = `${APP_HOST}:${APP_PORT}/user/${id}/avatar`
        await userService.updateAvatarUrlById(avatarUrl, id)
        ctx.body = '上传头像成功'
    }

    //保存头像信息
    async savePictureInfo(ctx, next) {
        //1:获取图片信息
        const files = ctx.req.files;//多张图片files
        const {id} = ctx.user
        const {momentId} = ctx.query
        // 2:信息保存到数据库中
        for (let file of files) {
            const {filename, mimetype, size} = file;
            await service.createFile(filename, mimetype, size, id, momentId)
        }
        ctx.body = '上传配图成功'
    }
}

module.exports = new FileController()
