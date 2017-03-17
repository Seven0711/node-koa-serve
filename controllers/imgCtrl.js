const fs = require('fs');
const getPath = require('../commom/getPathSync');


const getImg = async(ctx, next) => {
    var lmgList = [];
    lmgList = await getPath('../koa-server/static_img');
    ctx.body = {
        success: true,
        msg: 'images is there',
        data:  Array.from(new Set(lmgList))
    };
    await next();
};

module.exports = (router) => {
    router.get('/img/index', getImg);
};