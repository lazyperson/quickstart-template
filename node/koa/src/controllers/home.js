exports.index = async ctx => {
    const title = 'Hello koa2';

    await ctx.render('home', {
        title,
        desc: '这是一段测试文字'
    })
}
