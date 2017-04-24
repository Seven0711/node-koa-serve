const nzd = require('node-zookeeper-dubbo');
const nzc = require('node-zookeeper-client');
const opt = {
    application: {
        name: 'dh-test'
    },
    register: '10.168.1.108:2181',
    dubboVer: '2.5.3.6',
    root: 'dubbo',
    dependencies: {
        App: {
            interface: 'co.daheng.service.internal.api.IApp',
            timeout: 6000
        }
    }
};

const Dubbo = new nzd(opt);

let resData = {
    '$class': 'co.daheng.service.internal.model.AppModel',
    '$': {

    }
};

const test = async(ctx, next) => {
    Dubbo.App
        .test({
            '$class': 'java.lang.String',
            '$': 'hello world'
        }).then(data => {
            console.log(data.name);
            ctx.body = {
                data: data.name
            }
        }).catch(err => {
            ctx.body = err;
        })
};

module.exports = (router) => {
    router.get('/test', test);
}
// app.get('/test', (req, res) => {
//     Dubbo.App
//         .test({
//             '$class': 'java.lang.String',
//             '$': 'hello world'
//         })
//         .then(data => {
//             console.log(data.name);
//             res.send(`${data.name}`);
//         })
//         .catch(err => {
//             console.log(err);
//             res.send(err);
//         });
// });