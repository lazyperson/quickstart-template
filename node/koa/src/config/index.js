const config = {
    // 启动端口
    port: 3001,
    staticPath: `${process.cwd()}/public`,
    // 数据库配置
    database: {
        DATABASE: 'koasql',
        USERNAME: 'root',
        PASSWORD: '123456',
        PORT: '3306',
        HOST: 'localhost'
    }
};

module.exports = config;
