const userTable = `CREATE TABLE IF NOT EXISTS users(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(50) NOT NULL COMMENT '用户名',
     pass VARCHAR(50) NOT NULL COMMENT '密码',
     datetime VARCHAR(100) NOT NULL COMMENT '注册时间',
     PRIMARY KEY (id)
    );`;

const userSelect = 'select count(1) as len from users';

const userInsert = `INSERT INTO users (name, pass, datetime) VALUES ('lazyperson', '123456', '2020-10-22 10:10:40');`;

module.exports = {
    userTable,
    userSelect,
    userInsert
};
