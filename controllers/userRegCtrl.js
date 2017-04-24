/**
 * 用户注册，旨在获取form表单数据
 * @param {*} ctx 
 * @param {*} next 
 */
const userReg = async(ctx, next) => {
    console.log(ctx.request.body); //表单数据
    // console.log(ctx.request.body.name);
    let userData = ctx.request.body;
    // for (let key in userData) {
    //     if (userData.hasOwnProperty(key)) {
    //         let element = userData[key];
    //         console.log(element);
    //     }
    //     console.log(key);
    // }

    //返回信息,必须
    ctx.body = {
        success: true,
        msg: '注册成功',
        data: userData
    };
    await next();
};

/**
 * 用户登录
 * @param {*} ctx 
 * @param {*} next 
 */
const userLogin = async(ctx, next) => {
    console.log(ctx.request.body);
    let reqbody = ctx.request.body;
    if (reqbody.username === 'zhanghao' && reqbody.password === '111111') {
        ctx.body = {
            msg: '登录成功',
            statusCode: 0,
            success: true
        };
    } else {
        ctx.body = {
            msg: '登录失败',
            statusCode: 100,
            success: false
        };
    }
    await next();
};

/**
 * 请求用户数据
 * @param {*} ctx 
 * @param {*} next 
 */
const userList = async(ctx, next) => {
    //教程上说需要这行，可注释掉也能正常返回数据
    // ctx.response.type = 'application/json';
    console.log(ctx.request.query); //获取到所有的请求参数
    ctx.body = {
        success: true,
        msg: 'hello',
        data: [{
            userId: 1,
            user: 'admin'
        }]
    };
    await next((() => {
        console.log('this.is next()');
    })());
};

/**
 * 根据ID获取用户
 * @param {*} ctx 
 * @param {*} next 
 */
const getUserById = async(ctx, next) => {
    console.log(ctx.params.id);
    ctx.body = {
        success: true,
        msg: 'hello',
        data: [{
            userId: ctx.params.id,
            user: 'admin' + ctx.params.id
        }]
    };
    await next();
};

const updatUser = async(ctx, next) => {
    console.log(ctx.request.body);
    ctx.body = {
        success: true
    }
}

//路由
module.exports = (router) => {
    router.post('/user/register', userReg);
    router.post('/login', userLogin);
    router.get('/user/userList', userList);
    router.get('/user/userInfo/:id', getUserById);
    router.delete('/user/:id', getUserById);
    router.post('/user/update/:id', updatUser);
    router.put('/user/update/:id', updatUser);
};