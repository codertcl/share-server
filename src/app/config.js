const dotenv = require('dotenv')

dotenv.config()

console.log(process.env.APP_PORT)

module.exports = {
    APP_PORT,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD
} = process.env
