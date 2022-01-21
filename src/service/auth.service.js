const connection = require('../app/database')

class authService {
    //通过/删除的动态的用户id 判断是否是本人的
    async checkResource(id,momentId) {
        const statement = 'SELECT * FROM moment WHERE id= ?;';
        const [result] = await connection.execute(statement, [momentId]);
        return result[0].user_id===id;
    }
}

module.exports = new authService()
