const { query } = require('./db');
const sql = require('./data');

query(sql.userTable, []).then(res => {
    console.log(res);
}).catch(err => {
    console.log('异常', err);
});

query(sql.userSelect, []).then(res => {
    console.log('结果', res[0].len);
    if (res[0].len === 0) {
        query(sql.userInsert, []);
    }
});
