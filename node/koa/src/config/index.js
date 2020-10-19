const config = {
    // 启动端口
    port: 3001,
    staticPath: `${process.cwd()}/public`,
    // 数据库配置
    database: {
        DATABASE: 'nodesql',
        USERNAME: 'root',
        PASSWORD: 'koa2',
        PORT: '3306',
        HOST: 'localhost'
    }
};

module.exports = config;
