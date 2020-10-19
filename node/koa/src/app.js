const Koa = require('koa');
const app = new Koa();
const path = require('path')
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const render = require('koa-ejs');

const config = require('./config/index');

const home = require('./routes/home');
const user = require('./routes/user');

// error handler
onerror(app);

// middlewares
app.use(bodyparser({
    enableTypes:['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(require('koa-static')(config.staticPath));

app.use(views(path.join(__dirname, 'views'), {
    extension: 'ejs'
}));

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'base',
    viewExt: 'ejs',
    cache: false,
    debug: true
});

// logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(home.routes());
app.use(user.routes());

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});


app.listen(config.port, () => {
    console.warn(`Server Running! Port at ${config.port}`)
});
