const momentService = require('../service/moment.service')
const fileService = require('../service/file.service')
const {
    PICTURE_PATH
} = require("../constants/file-path");
const fs = require('fs')

class momentController {
    async create(ctx, next) {
        //1:获取user_id content
        const userId = ctx.user.id;
        const content = ctx.request.body.content;
        const pictures = ctx.request.body.pictures;

        let res = await momentService.create(userId, content, pictures)
        //2:将数据插入到数据库
        // 获取该动态在表中的id,便于和上传的图片关联并设置到ctx.body中
        ctx.body = {
            status: 200,
            message: '发布成功',
            momentId: res[0].insertId
        }
    }


    ////根据动态id查询单条动态
    async detail(ctx, next) {
        //1:获取id content
        const momentId = ctx.params.momentId;

        //2:将数据插入到数据库
        // 获取SQL语句执行结果,设置到ctx.body中
        const [res] = await momentService.getMomentById(momentId)
        ctx.body = res[0]
    }

    ////分页查询查询多条动态
    async list(ctx, next) {
        //1:获取查询参数
        const {
            offset,
            size
        } = ctx.query;
        //2:查询列表
        const res = await momentService.getMomentList(offset, size)
        ctx.body = res
    }

    ////更新动态信息
    async update(ctx, next) {
        // //1:获取动态id momentId
        const {
            momentId
        } = ctx.params;
        const {
            content
        } = ctx.request.body;

        // //2:查根据momentId更新动态信息
        const res = await momentService.update(momentId, content)
        ctx.body = res
    }

    ////删除动态信息
    async remove(ctx, next) {
        // //1:获取动态id momentId
        const {
            momentId
        } = ctx.params;

        // //2:查根据momentId删除动态信息
        ctx.body = await momentService.remove(momentId)
    }

    //为动态添加标签
    async addLabels(ctx, next) {
        // //1:获取动态 momentId
        const {
            momentId
        } = ctx.params;
        const {
            labels
        } = ctx;
        console.log(momentId, labels)

        //2：添加所有标签
        for (let label of labels) {
            const isExist = momentService.hasLabel(momentId, label.id)
            if (!isExist) {
                await momentService.addLabel(momentId, label.id)
            }
        }

        ctx.body = "给动态添加标签成功~";
    }

    //配置浏览器请求访问动态图片的接口
    async fileInfo(ctx, next) {
        // 获取用户请求传递的参数
        let {
            filename
        } = ctx.params;
        const fileInfo = await fileService.getFileByFilename(filename)
        //通过params参数设置三种格式图片的展示
        const {
            type
        } = ctx.query
        const types = ['small', 'middle', 'large']
        if (types.indexOf(type) !== -1) {
            let name = filename.split('.')[0],
                extraname = filename.split('.')[1]
            filename = name + '-' + type + '.' + extraname
        }
        ctx.response.set('content-type', fileInfo.mimeType)
        ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`)
    }


    // 获取该用户的关注列表中用户的动态
    async getAllMoments(ctx, next) {
        const res = await momentService.getAllMoments()
        ctx.body = {
            status: 200,
            info: res,
            message: '获取动态和评论信息成功'
        }
    }

    // 动态点赞数量的修改
    async updateLikeNum(ctx, next) {
        const {
            momentId
        } = ctx.params
        const {
            num
        } = ctx.request.body
        const res = await momentService.updateLikeNum(momentId,num)
        ctx.body = {
            status: 200,
            info: res,
            message: '点赞数目修改成功'
        }
    }
}

module.exports = new momentController()