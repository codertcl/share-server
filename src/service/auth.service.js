const connection = require('../app/database')

class authService {
    //通过/删除的动态的用户userid  id为动态id或者评论id 判断是否是本人的动态获评论
    async checkResource(tableName, resourceId, id) {
        try {
            const statement = `SELECT * FROM ${tableName} WHERE id= ? AND user_id= ${id};`;
            const [result] = await connection.execute(statement, [resourceId]);
            console.log(result.length)
            return result.length;
        } catch (e) {
            console.log(e)
        }
    }

    // //通过/删除的动态的用户id 判断是否是本人的
    // async checkMome(id, momentId) {
    //     try {
    //         const statement = 'SELECT * FROM moment WHERE id= ?;';
    //         const [result] = await connection.execute(statement, [momentId]);
    //         return result[0].user_id === id;
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }
}

module.exports = new authService()
