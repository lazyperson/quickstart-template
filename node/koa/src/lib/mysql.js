

query(initSql.userTabel, []).then(res => {
    console.log(res);
}).catch(err => {
    console.log('异常', err)
});
query(initSql.userData, []).then(res => {
    console.log('结果', res[0].len);
    if (res[0].len === 0) {
        query(initSql.userDefaultData, [])
    }
});
