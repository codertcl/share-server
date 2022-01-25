const service = require('../service/label.service')

class labelController {
    //1:创建标签
    async create(ctx, next) {
        const {name} = ctx.request.body
        ctx.body = await service.create(name)
    }

    //2:获取标签列表接口
    async list(ctx, next) {
        const {limit, offset} = ctx.query
        ctx.body = await service.getLabels(limit, offset)
    }
}

module.exports = new labelController()
