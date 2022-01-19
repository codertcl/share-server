class authController {
    async login(ctx, next) {
        // 获取用户请求传递的参数
        const {name} = ctx.request.body
        ctx.body = `登陆成功,欢迎${name}回来`
    }
}

module.exports = new authController()
