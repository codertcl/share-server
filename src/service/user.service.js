const connection = require('../app/database')

class userService {
    // //插入数据到users中
    async create(user) {
        //执行SQL语句,返回结果
        const {name, password} = user
        const statement = 'INSERT INTO users (name,password) VALUES (?,?);';
        const result = await connection.execute(statement, [name, password]);
        return result
    }

    ////通过name查询用户信息
    async getUserByName(name) {
        const statement = 'SELECT * FROM users WHERE name= ?;';
        const result = await connection.execute(statement, [name]);
        return result[0];//第一个元素为查询到的用户信息
    }
}

module.exports = new userService()
