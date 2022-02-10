const jwt = require('jsonwebtoken')
const {
    PRIVATE_KEY
} = require("../app/config");

class authController {
    async login(ctx, next) {
        // 获取用户请求传递的参数
        const {
            id,
            name
        } = ctx.user
        const token = jwt.sign({
            id,
            name
        }, PRIVATE_KEY, {
            expiresIn: 60 * 60 * 24,
            algorithm: 'RS256'
        })
        ctx.body = {
            status: 200,
            message: '登录成功~',
            info: {
                id,
                name,
                token
            }
        }
    }

    async success(ctx, next) {
        ctx.body = '授权成功'
    }
}

module.exports = new authController()