const router = require('koa-simple-router')
const koaBody = require('koa-body');
module.exports = function (app) {
    app.use(router(_ => {
        _.get('/', async (ctx, next) => {
            ctx.body = await ctx.render('tpl', { msg: 'hello' });
        })
        _.post('/path', (ctx, next) => {

        })
        // 同时支持get和post请求
        _.all('/login', (ctx, next) => {
            const username = ctx.query.username || ctx.request.body.username;
            const phone = ctx.query.phone;
            ctx.body = {
                username,
                phone,
                code: 666,
                msg: '登录成功'
            }
        })
        _.all('/register', (ctx, next) => {
            ctx.body = {
                code: 666,
                msg: '注册成功'
            }
        })
    }))
}