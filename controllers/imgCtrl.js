// var formParse = require('co-busboy');
const fs = require('fs');
const path = require('path');

const getPath = require('../commom/getPathSync');
const { uploadFile } = require('../commom/uploadImg');


// 获取所有图片url
const getImg = async(ctx, next) => {
    var imgList = [];
    imgList = await getPath('./static_img');
    ctx.body = {
        success: true,
        msg: 'images is there',
        data: Array.from(new Set(imgList))
    };
    await next();
};

// 上传图片
// const uploadImg = async(ctx, next) => {
//     console.log(ctx.request.body); //Missing Content-Type
//     // ctx.set({'Content-Type': 'application/json'});
//     var parts = await formParse(ctx.request.body),
//         part;
//     //此数组用于存储图片的url
//     var fileNames = [];
//     while (part = await parts) {
//         //此时part为返回的流对象
//         var filename = part.filename
//         fileNames.push(filename);
//         var homeDir = path.resolve(__dirname, '..');
//         var newpath = homeDir + '/static_img/' + filename;
//         //生成存储路径，要注意这里的newpath必须是绝对路径，否则Stream报错
//         var stream = fs.createWriteStream(newpath);
//         //写入文件流
//         part.pipe(stream);
//     }
//     if (fileNames.length > 0) {
//         console.log('fileNames', fileNames)
//         var imgUrls = [];
//         for (var item of fileNames) {
//             imgUrls.push('http://localhost:3000/' + item)
//         }
//         ctx.body = {
//             code: 0,
//             message: '上传成功',
//             result: {
//                 urls: imgUrls
//             }
//         };
//     }

//     await next();
// };

const uploadImg = async(ctx, next) => {
    let result = {
        success: false
    };
    let serverFilePath = path.join(__dirname, '../static_img/upload');


    // 上传文件事件
    result = await uploadFile(ctx, {
        // fileType: 'album',
        fileType: 'upload',
        path: serverFilePath
    })
    ctx.body = result;

    await next();
}

module.exports = (router) => {
    router.get('/img/index', getImg);
    router.post('/img/upload', uploadImg);
};