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

        // 注册的用户的名字不能重复
        let executeRes = await connection.execute('SELECT * FROM user WHERE name= ?;', [name]);
        // 判断该用户名对应用户是否存在 如果存在且查到的用户id和当前登录用户id不同 则该用户名会重复 提示错误
        if (executeRes[0].length) {
            return false
        }

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

    ////通过id查询用户信息
    async getUserInfoById(id) {
        const statement = 'SELECT * FROM user WHERE id= ?;';
        const result = await connection.execute(statement, [id]);
        // console.log(result);
        return result[0]; //第一个元素为查询到的用户信息
    }


    ////通过id更新user表中用户的信息
    async updateUserInfo(info, id) {
        const {
            name,
            age,
            sex,
            avatar_url
        } = info

        let executeRes = await connection.execute('SELECT * FROM user WHERE name= ?;', [name]);
        // 判断该用户名对应用户是否存在 如果存在且查到的用户id和当前登录用户id不同 则该用户名会重复 提示错误
        if (executeRes[0].length && executeRes[0][0].id != id) {
            return false
        }

        const statement = 'update user set name=?,age=?,sex=?,avatar_url=? WHERE id= ?;';
        const result = await connection.execute(statement, [name, age, sex, avatar_url, id]);
        return true;
    }

    ////通过id更新user表中用户密码
    async updatePassword(password, id) {
        const statement = 'update user set password=? WHERE id= ?;';
        const result = await connection.execute(statement, [password, id]);
        return result;
    }
}

module.exports = new userService()