exports.login = async ctx => {
    await ctx.render('login');
}

exports.login2 = async ctx => {
    // TODO: 链接数据库查询是否登录成功，成功后则跳转页面。 session
}

exports.admin = async ctx => {
    // TODO: Sequelize查询mySQL 展示当前登录用户个人信息
    await ctx.render('admin');
}
