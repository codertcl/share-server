const connection = require('../app/database')
const sqlFragment = `SELECT
            m.id id,m.content content, m.createAt createTime,  m.updateAt updateTime,
            JSON_OBJECT('id',u.id,'name',u.name) author
            FROM moment m LEFT JOIN user u on m.user_id=u.id`;

class momentService {
    // //插入数据到moment中
    async create(userId, content) {
        //执行SQL语句,返回结果
        const statement = 'INSERT INTO moment (user_id,content) VALUES (?,?);';
        const result = await connection.execute(statement, [userId, content]);
        return result
    }

    ////通过momentId查询某条动态
    async getMomentById(momentId) {
        const statement = `${sqlFragment} WHERE m.id=?;`;
        return await connection.execute(statement, [momentId]);
    }

    //分页查询查询多条动态
    async getMomentList(offset, size) {
        const statement = `${sqlFragment} LIMIT ?,?;`;
        const [res] = await connection.execute(statement, [offset, size]);
        return res;
    }

    //更新动态信息
    async update(momentId,content) {
        const statement = `UPDATE moment SET content = ? WHERE id = ?;`;
        const [result] = await connection.execute(statement, [content, momentId]);
        return result;
    }
}

module.exports = new momentService()
