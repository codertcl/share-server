const connection = require('../app/database')

class labelService {
    //1:创建标签
    async create(name) {
        try {
            const statement = `insert into label (name) values (?) `;
            const [result] = await connection.execute(statement, [name]);
            return result;
        } catch (e) {
            console.log(e)
        }
    }

    //2:通过名称获取标签
    async getLabelByName() {
        try {
            const statement = `select * from label where name = ?`;
            const [result] = await connection.execute(statement, [name]);
            return result[0];
        } catch (e) {
            console.log(e)
        }
    }


    //3:获取标签
    async getLabels(limit, offset){
        const statement = `select * from label limit ?,?`;
        const [result] = await connection.execute(statement, [offset,limit ]);
        return result;
    }
}

module.exports = new labelService()
