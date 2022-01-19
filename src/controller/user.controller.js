const service = require('../service/user.service')

class userController {
    //1:创建用户
    async create(ctx, next) {
        // 获取用户请求传递的参数
        const user = ctx.request.body
        // 获取SQL语句执行结果,设置到ctx.body中
        const result = await service.create(user)

        // 返回数据
        ctx.body = result
    }
}

module.exports = new userController()
