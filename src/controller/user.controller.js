const fs = require('fs')
const userService = require('../service/user.service')
const fileService = require('../service/file.service')
const {
    AVATAR_PATH
} = require('../constants/file-path')
const {
    log
} = require('console')
class userController {
    //1:创建用户
    async create(ctx, next) {
        // 获取用户请求传递的参数
        const user = ctx.request.body
        // 获取SQL语句执行结果,设置到ctx.body中
        await userService.create(user)
        // 返回数据
        ctx.body = {
            status: 200,
            message: '注册成功,赶快登录吧'
        }
    }


    //2:获取用户信息
    async getUserInfo(ctx, next) {
        // 获取用户请求传递的参数
        const {
            userId
        } = ctx.params
        const info = await userService.getUserInfoById(userId)
        ctx.body = {
            message: '获取用户信息成功',
            status: 200,
            info
        }
    }

    //3:更新用户信息信息
    async updateUserInfo(ctx, next) {
        //1:获取用户id
        const {
            userId
        } = ctx.params

        //2:将信息存储到user表中
        const res = await userService.updateUserInfo(ctx.request.body, userId)
        if (res) {
            ctx.body = {
                status: 200,
                message: '更新用户信息成功'
            }
        } else {
            ctx.body = {
                status: 400,
                message: '该用户名已存在'
            }
        }
    }
}

module.exports = new userController()