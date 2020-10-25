const { query } = require('../lib/db');
const sql = require('../lib/data');

exports.loginPost = (params) => {
    return query(sql.userLogin, params).then(res => {
        console.log('-----', res)
        return res.length;
    });

}
