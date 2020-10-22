const mysql = require('mysql');
const config = require('../config/index');


const { DATABASE, USERNAME, PASSWORD, PORT, HOST } = config.database;

const pool  = mysql.createPool({
    connectionLimit: 50,
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

exports.query = query;
