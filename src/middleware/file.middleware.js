const path = require('path')
const multer = require('koa-multer')
const Jimp = require('jimp')
const {AVATAR_PATH, PICTURE_PATH} = require('../constants/file-path')
// const avatarUpload = multer({
//     dest: AVATAR_PATH
// })
//
// const pictureUpload = multer({
//     dest: PICTURE_PATH
// })


const avatarUpload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, AVATAR_PATH);
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    })
});
const pictureUpload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, PICTURE_PATH);
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    })
});

const pictureHandler = pictureUpload.array('picture', 18)

const avatarHandler = avatarUpload.single('avatar')

//图片进行处理 将上传的动态配图生成三张不同大小的图到uploads文件中
const pictureResize = async (ctx, next) => {
    // 1.获取所有的图像信息
    const files = ctx.req.files;
    // 2.对图像进行处理(sharp/jimp)
    for (let file of files) {
        let filename = file.filename.split('.')[0]
        let filetype = file.filename.split('.')[1]
        Jimp.read(file.path).then(image => {
            // resize the width to 1280 and scale the height accordingly
            // 将宽度调整为250，并相应缩放高度
            image.resize(1280, Jimp.AUTO).write(path.join(`${file.destination}`,
                filename + "-large." + filetype));
            image.resize(640, Jimp.AUTO).write(path.join(`${file.destination}`,
                filename + "-middle." + filetype));
            image.resize(320, Jimp.AUTO).write(path.join(`${file.destination}`,
                filename + "-small." + filetype));
        })
    }
    await next()
}

module.exports = {
    avatarHandler,
    pictureHandler,
    pictureResize
}
