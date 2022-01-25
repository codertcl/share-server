const errorType = require('../constants/error-types')
const service = require('../service/label.service')
const verifyLabelExists = async (ctx, next) => {
    //1:获取所有标签
    let {labels} = ctx.request.body;
    // 2.判断每一个标签是否存在于label表中
    const newLabels = []//要添加的标签信息
    for (let name of labels) {
        // 2.1.判断标签是否已经和动态有关系
        const labelResult = await service.getLabelByName(name);
        const label = {name}
        if (!labelResult) {
            //创建标签
            const result = await service.create(name);
            //创建标签时会返回的结果内包含insertId属性
            label.id = result.insertId
        } else {
            label.id = labelResult.id
        }
        newLabels.push(label)
    }
    ctx.labels = newLabels
    await next()
}

module.exports = {
    verifyLabelExists
}
