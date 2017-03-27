const Koa = require('koa');
// 注意require('koa-router')返回的是函数:
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const fs = require('fs');
const convert = require('koa-convert');
const path = require('path');
const KoaStatic = require('koa-static');
const registerControllers = require('./controllers/index');
const router = new Router({
    prefix: '/webapi'
});
const app = new Koa();


app.use(bodyParser({
    formLimit: '5mb',
    detectJSON: (ctx) => {
        return /\.json$/i.test(ctx.path);
    },
    extendTypes: {
        json: ['application/json'] 
    }
}));

require('koa-qs')(app, 'extended');
// app.use(KoaStatic('static_img'));
// 由于koa-static目前不支持koa2
// 所以只能用koa-convert封装一下
let newPath = path.join(__dirname, '/static_img/');

app.use(convert(KoaStatic('static_img')));
// app.use(convert(KoaStatic(path.join(__dirname, '/static_img'))))
// app.use(KoaStatic(__dirname + '/static_img'));
// app.use(KoaStatic(path.join(__dirname, '/static_img')));

// app.use(async(ctx, next) => {
//     const start = new Date()
//     await next()
//     const ms = new Date() - start
//     console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })
// // log request URL:
app.use(async(ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// response
// app.use(async(ctx, next) => {
//     ctx.body = ctx.request.body;
//     await next();
// });

registerControllers(router);


app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);
console.log('app started at port 3000...');