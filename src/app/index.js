const Koa = require('koa');
const bodyParser = require('koa-bodyparser')
const errorHandler = require('./error-handle')
const useRoutes = require('../router/index')
const app = new Koa()

app.use(bodyParser());
//注册使用路由 useRoutes函数中this绑定到了app
app.useRoutes = useRoutes;
app.useRoutes()
//错误处理
app.on('error', errorHandler)
module.exports = app
