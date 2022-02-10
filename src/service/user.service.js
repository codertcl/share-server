const connection = require('../app/database')

class userService {
    // //插入数据到user中
    async create(user) {
        //执行SQL语句,返回结果
        const {
            name,
            password,
            age,
            birthday,
            sex
        } = user
        const statement = 'INSERT INTO user (name,password,age,birthday,sex) VALUES (?,?,?,?,?);';
        const result = await connection.execute(statement, [name, password, age, birthday, sex]);
        return result
    }

    ////通过name查询用户信息
    async getUserByName(name) {
        const statement = 'SELECT * FROM user WHERE name= ?;';
        const result = await connection.execute(statement, [name]);
        return result[0]; //第一个元素为查询到的用户信息
    }

    ////通过id更新user表中用户的头像信息
    async updateAvatarUrlById(avatarUrl, id) {
        const statement = 'update user set avatar_url=? WHERE id= ?;';
        const [result] = await connection.execute(statement, [avatarUrl, id]);
        return result;
    }
}

module.exports = new userService()