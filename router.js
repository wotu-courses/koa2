const axios = require('axios')
const router = require('koa-simple-router')
const koaBody = require('koa-body');
module.exports = function (app) {
  app.use(router(_ => {
    _.get('/', async(ctx, next) => {
      const url = "http://www.easy-mock.com/mock/5a0561fbe264ca23e8c73023/wotu/live_list";
      const res = await axios.get(url);
      console.log(res.data.list[0]);
      // 请求后台接口 request
      ctx.body = await ctx.render('index', {
        msg: res.data.list[0].title
      });

      ctx.body = await ctx.render('tpl', {
        msg: 'hello'
      });
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