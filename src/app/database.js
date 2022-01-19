const mysql = require('mysql2')
const config = require('./config')//导入数据库配置信息
const connection = mysql.createPool({
    host: config.MYSQL_HOST,
    post: config.MYSQL_PORT,
    user: config.MYSQL_USER,
    database: config.MYSQL_DATABASE,
    password: config.MYSQL_PASSWORD
})

connection.getConnection((err, conn) => {
    conn.connect(err => {
        if (err) {
            console.log('连接失败', err)
        } else {
            console.log('连接成功')
        }
    })
})

module.exports = connection.promise()
