const Koa = require('koa')
const app = new Koa()
// 设置静态目录
const serv = require('koa-static')
// 设置post请求参数
const koaBody = require('koa-body')
// 渲染模板
const render = require('koa-swig')
// 渲染模板需要使用co模块
const co = require('co')
const initRouter = require('./router')
// koa-body是个中间件，需要放在initRouter之前
app.use(koaBody());
app.use(serv(__dirname + '/static'));
app.context.render = co.wrap(render({ 
    root: './views', 
    autoescape: true,
    cache: 'memory', 
    writeBody: false, 
    ext: 'html' }))
initRouter(app);

app.listen(3000, () => {
    console.log('服务已启动，在 http://localhost:3000/');
});