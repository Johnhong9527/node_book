const mysql = require('mysql')
const config = require('../config/index.js')
module.exports = mysql.createConnection(config.db) // mysql.createConnection 方法创建连接实例