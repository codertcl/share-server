const Router = require('koa-router')
const fileRouter = new Router({prefix: '/upload'})
const {avatarHandler, pictureHandler,pictureResize} = require('../middleware/file.middleware')
const {verifyAuth} = require('../middleware/auth.middleware')
const {saveAvatarInfo, savePictureInfo} = require('../controller/file.controller')

//上传头像 并通过saveAvatarInfo将图片数据存储到数据库
fileRouter.post('/avatar', verifyAuth, avatarHandler, saveAvatarInfo)
//动态中上传图片
fileRouter.post('/picture', verifyAuth, pictureHandler,pictureResize, savePictureInfo)

module.exports = fileRouter
