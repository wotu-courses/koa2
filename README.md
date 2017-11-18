## nodejs框架Koa2初探
#### nodejs基础（参考菜鸟教程的nodejs教程 ）
1. JavaScript语法
2. 创建服务器模块http
3. 文件读取模块fs
4. 路径path
5. 模块系统 require、module.exports
6. es6语法（新版本的nodejs除了模块外全部支持

#### nodejs框架-express
文档地址：http://www.expressjs.com.cn/

#### nodejs框架-koa
中文文档地址：https://koa.bootcss.com/
node模块仓库地址：https://www.npmjs.com/
##### 1、初始化package.json
新建目录koademo，执行 npm init，一路回车
##### 2、创建一个简单的koa应用（hello world）
```
安装koa模块 npm install koa --save
在项目根目录新建app.js，app.js代码如下：

const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);

执行node app.js
用浏览器访问 http://localhost:3000

```
##### 3、koa路由，使用koa-simple-router
https://www.npmjs.com/package/koa-simple-router
安装 koa-simple-router模块，然后修改上面的app.js代码，变成下面这个样子
```
const Koa = require('koa')
const router = require('koa-simple-router')
const app = new Koa()
 
app.use(router(_ => {
  _.get('/', (ctx, next) => {
    ctx.body = 'hello world';
  })
  _.post('/path', (ctx, next) => {
 
  })
  // 同时支持get和post请求
  _.all('/login', (ctx, next) => {
    ctx.body = {
        code: 666,
        msg: '登录成功'
    }
  })
  _.all('/regester', (ctx, next) => {
    ctx.body = {
        code: 666,
        msg: '注册成功'
    }
  })
}))

app.listen(3000,()=>{
    console.log('服务已启动，在 http://localhost:3000/');
});

重启服务，用浏览器访问 
http://localhost:3000/login 和
http://localhost:3000/register
```
为了让代码结构性更好，我们可以把路由这部分单独放在一个文件里

##### 4、supervisor 服务器自动重启模块
我们发现没修改一次代码，都必须重启才能生效，这显然不方便，supervisor模块就可以解决这个问题
使用supervisor我们需要这样
1. 全局安装supervisor npm i supervisor -g
2. 启动服务的时候用supervisor app.js代替node app.js

##### 6、设置静态目录
在目录中创建目录static，在static下创建文件demo.html，访问http://localhost:3000/static/demo.html是无法访问得到，因为我们还没有设置静态资源目录
设置静态资源目录要用到koa-static模块
安装koa-static npm i koa-static --save
在app.j是里加入如下代码
```
const serv = require('koa-static');
app.use(serv(__dirname + '/static'));
```
再来访问 http://localhost:3000/static/demo.html，就可以访问了

##### 7、获取请求参数
给刚才的demo.html添加jquery用来发送请求，然后在demo里添加如下代码：
```
 var url = 'http://localhost:3000/login';
var data = {
    username: 'laohu',
    phone: '15013795539'
}
$.ajax({
    url,
    data,
    type: 'get',
    dataType: 'json',
    success: function(res) {
        console.log(res);
    },
    error: function() {
        console.log('请求失败');
    }
})
```
1. 获取get请求参数
在router.js的login接口里加入如下代码
```
// 获取get请求参数
const username = ctx.query.username;
const phone = ctx.query.phone;
并把username和phone放入ctx.body
```

2.获取post请求
获取post请求需要使用koa-body模块
安装koa-body npm i koa-body --save
在app.js里加入如下代码：
```
const koaBody = require('koa-body');
app.use(koaBody());
```
获取post请求参数的代码如下
```
ctx.request.body.xxx
```

##### 8、模板
一般请求一个接口返回的是一坨数据，然而有时候我们希望返回的是一个html网页或者一段html代码（上周分享的服务器渲染）
我们试用koa-swig模块来向前端返回一个html
安装koa-swig npm i koa-swig
* 在根目录创建views目录，在views目录下创建tpl.html
* 在app.js添加如下代码：
```
const render = require('koa-swig')
const co = require('co')
app.context.render = co.wrap(render({ 
    root: './views', 
    autoescape: true,
    cache: 'memory', 
    writeBody: false, 
    ext: 'html' }))
    
// 在router.js里面的根路由修改成下面这样,同时给模板传递变量msg
_.get('/', async (ctx, next) => {
    ctx.body = await ctx.render('tpl', { msg: 'hello' });
})
```
* 在tpl.html里面添加代码：
```
<p>{{msg}}</p>
```
* 访问 http://localhost:3000，就可以看到一个html页面

##### 9、相关地址
本文github地址：https://github.com/wotu-courses/koa2

本文相关nodejs项目地址： https://github.com/wotu-courses/zhihu_server.git



