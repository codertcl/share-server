const connection = require('../app/database')

class fileService {
    //1:添加图片数据到file表中
    async createAvatar(filename, mimetype, size, userId) {
        const statement = `insert into avatar (filename,mimetype,size,user_id) values (?,?,?,?);`;
        const [result] = await connection.execute(statement, [filename, mimetype, size, userId])
        return result
    }


    //2:通过用户id获取头像数据信息
    async getAvatarByUserId(userId) {
        const statement = `select * from avatar where user_id=?;`;
        const [result] = await connection.execute(statement, [userId])
        return result[0]
    }

    //3:添加动态图片数据到file表中
    async createFile(filename, mimetype, size, userId, momentId) {
        const statement = `insert into file (filename,mimetype,size,user_id,moment_id) values (?,?,?,?,?);`;
        const [result] = await connection.execute(statement, [filename, mimetype, size, userId, momentId])
        return result
    }

    //4:通过filename查询图片信息
    async getFileByFilename(filename) {
        const statement = `select * from file where filename=?;`;
        const [result] = await connection.execute(statement, [filename])
        return result[0]
    }
}

module.exports = new fileService()
