const connection = require('../app/database')
const sqlFragment = `SELECT
            m.id id,m.content content, m.createAt createTime,  m.updateAt updateTime,
            JSON_OBJECT('id',u.id,'name',u.name) author
            FROM comment m LEFT JOIN user u on m.user_id=u.id`;

class commentService {
    // //1发布评论插入数据到comment中
    async create(momentId, content, id) {
        const statement = 'INSERT INTO comment (moment_id,user_id,content) VALUES (?,?,?);';
        const [result] = await connection.execute(statement, [momentId, id, content]);
        return result
    }

    // 2:回复评论
    async reply(momentId, content, id,commentId) {
        const statement = 'INSERT INTO comment (moment_id,user_id,content,comment_id) VALUES (?,?,?,?);';
        const [result] = await connection.execute(statement, [momentId, id, content,commentId]);
        return result
    }

    // //分页查询查询多条动态
    // async getMomentList(offset, size) {
    //     const statement = `${sqlFragment} LIMIT ?,?;`;
    //     const [res] = await connection.execute(statement, [offset, size]);
    //     return res;
    // }
    //
    //3:更改评论
    async update(content,commentId) {
        const statement = `UPDATE comment SET content = ? WHERE id = ?;`;
        const [result] = await connection.execute(statement, [content, commentId]);
        return result;
    }

    //4:删除评论信息
    async remove(commentId) {
        const statement = `DELETE FROM comment WHERE id = ?;`;
        const [result] = await connection.execute(statement, [commentId]);
        return result;
    }

    //5:根据动态id获取评论列表
    async getCommentsByMomentId(momentId){
        const statement = `SELECT c.id,c.content,c.comment_id commentId, c.createAt createTime,
                 JSON_OBJECT('id',u.id,'name',u.name) user
                 FROM comment c
                 LEFT JOIN user u on u.id=c.user_id  
                 WHERE moment_id = ?;`;
        const [result] = await connection.execute(statement, [momentId]);
        return result;
    }
}

module.exports = new commentService()
