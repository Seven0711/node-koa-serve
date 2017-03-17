const router = require('koa-router')();

const md_controller = require('../controllers/mdcontroller');

router.get('/index', md_controller.getMd);
router.post('/save', md_controller.saveMd);

module.exports = router;