const Sequelize = require('sequelize')
const sequelize = new Sequelize('new_schema', 'root', 'user', { dialect: 'mysql', host: 'localhost'})
module.exports=sequelize