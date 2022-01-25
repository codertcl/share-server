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
        const statement = `SELECT 
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) author,
        IF(COUNT(l.id),JSON_ARRAYAGG(
          JSON_OBJECT('id', l.id, 'name', l.name)
        ),NULL) labels,
        (SELECT IF(COUNT(c.id),JSON_ARRAYAGG(
          JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id, 'createTime', c.createAt,
                      'user', JSON_OBJECT('id', cu.id, 'name', cu.name, 'avatarUrl', cu.avatar_url))
        ),NULL) FROM comment c LEFT JOIN user cu ON c.user_id = cu.id WHERE m.id = c.moment_id) comments,
        (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:3000/moment/images/', file.filename)) 
        FROM file WHERE m.id = file.moment_id) images
      FROM moment m
      LEFT JOIN user u ON m.user_id = u.id
      LEFT JOIN moment_label ml ON m.id = ml.moment_id
      LEFT JOIN label l ON ml.label_id = l.id
      WHERE m.id = ?
      GROUP BY m.id;`;
        return await connection.execute(statement, [momentId]);
    }

    //分页查询查询多条动态 包括一条动态的评论数量 动态的标签数量
    async getMomentList(offset, size) {
        const statement = `SELECT
            m.id id,m.content content, m.createAt createTime,  m.updateAt updateTime,
            JSON_OBJECT('id',u.id,'name',u.name) author,
            (SELECT COUNT(*) FROM comment c WHERE c.moment_id=m.id) commentCount
            (SELECT COUNT(*) FROM moment_label ml WHERE m.id=ml.moment_id) labelCount
            (SELECT JSONAGG('路由') FROM moment_label ml WHERE m.id=ml.moment_id) labelCount
            FROM moment m LEFT JOIN user u on m.user_id=u.id LIMIT ?,?;`;
        const [res] = await connection.execute(statement, [offset, size]);
        return res;
    }

    //更新动态信息
    async update(momentId, content) {
        const statement = `UPDATE moment SET content = ? WHERE id = ?;`;
        const [result] = await connection.execute(statement, [content, momentId]);
        return result;
    }

    //更新动态信息
    async remove(momentId) {
        const statement = `DELETE FROM moment WHERE id = ?;`;
        const [result] = await connection.execute(statement, [momentId]);
        return result;
    }

    //判断标签是否存在
    async hasLabel(momentId, labelId) {
        const statement = `select * FROM moment_label WHERE moment_id = ? and label_id=?;`;
        const [result] = await connection.execute(statement, [momentId, labelId]);
        return !!result[0];
    }

    //添加标签
    async addLabel(momentId, labelId) {
        const statement = `insert into moment_label (moment_id, label_id) values (?,?);`;
        const [result] = await connection.execute(statement, [momentId, labelId]);
        return result;
    }

}

module.exports = new momentService()
