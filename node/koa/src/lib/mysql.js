const mysql = require('mysql');
const config = require('../config/index');


const { DATABASE, USERNAME, PASSWORD, PORT, HOST } = mysql.config.database;

const pool  = mysql.createPool({
    host: HOST,
    user: USERNAME,
    password: PASSWORD,
    database: DATABASE,
    port: PORT
});

const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                connection.query(sql, values, (error, results, fields) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                    connection.release();
                })
            }
        })
    })
};

const initSql = {
    userTabel:  `create table if not exists users(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL COMMENT '用户名',
     pass VARCHAR(100) NOT NULL COMMENT '密码',
     moment VARCHAR(100) NOT NULL COMMENT '注册时间',
     PRIMARY KEY (id)
    );`,
    userData: `insert into users`
}

query(initSql.userTabel, []);
