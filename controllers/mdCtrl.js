const fs = require('fs');

const readFile = (fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf-8', (error, data) => {
            if (error) reject(error);
            resolve(data);
        });
    });
};

const writeFile = (fileName, text) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, text, (error, data) => {
            if (error) reject(error);
            resolve(data);
        });
    });
};

//获取
const getMd = async(ctx, next) => {
    ctx.body = {
        success: true,
        msg: 'hello',
        data: await readFile('client.md')
    };
    await next();
}

//保存
const saveMd = async(ctx, next) => {
    console.log(ctx.response);
    var mdData = ctx.request.body.mdData;
    await writeFile('client.md', mdData);
    ctx.response.type = 'application/json';
    let resbody = {
        msg: '文件修改成功!',
        editDate: new Date()
    };
    ctx.response.body = ctx.response;
    console.log('*************');
    await next();
}


module.exports = (router) => {
    router.get('/markdown/index', getMd);
    router.post('/markdown/save', saveMd);
}



// router.get('/webapi/markdown/index', async(ctx, next) => {
//     ctx.body = {
//         success: true,
//         msg: 'hello',
//         data: await readFile('client.md')
//     };
//     await next();
// });

// router.post('/webapi/markdown/save', async(ctx, next) => {
//     console.log(ctx.response);
//     var mdData = ctx.request.body.mdData;
//     await writeFile('client.md', mdData);
//     ctx.response.type = 'application/json';
//     let resbody = {
//         msg: '文件修改成功!',
//         editDate: new Date()
//     };
//     ctx.response.body = ctx.response;
//     console.log('*************');
//     await next();
// });



// router.get('/webapi/hello/index/?page=page&size=size&keyword=keyword', async(ctx, next) => {
//     console.log('get.........');
//     console.log(ctx);
//     console.log(this);
//     // let name = ctx.params.name;
//     // ctx.body = {
//     //     msg: 'hello',
//     //     data: `${name}`
//     // }
//     await next();
// });