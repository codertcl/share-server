const momentService = require('../service/moment.service')

class momentController {
    async create(ctx, next) {
        //1:获取user_id content
        const userId = ctx.user.id;
        const content = ctx.request.body.content;
        console.log(userId, content)

        //2:将数据插入到数据库
        // 获取SQL语句执行结果,设置到ctx.body中
        ctx.body = await momentService.create(userId, content)
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
        const {offset, size} = ctx.query;
        //2:查询列表
        const res = await momentService.getMomentList(offset, size)
        ctx.body = res
    }

    ////更新动态信息
    async update(ctx, next) {
        // //1:获取动态id momentId
        const {momentId} = ctx.params;
        const {content} = ctx.request.body;

        // //2:查根据momentId更新动态信息
        const res = await momentService.update(momentId,content)
        ctx.body = res
    }
}

module.exports = new momentController()
