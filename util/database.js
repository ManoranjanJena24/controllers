const mySql = require('mysql2')
const pool = mySql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'new_schema',
    password:'user',
})

module.exports=pool.promise()