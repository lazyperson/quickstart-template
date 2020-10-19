const router = require('koa-router')();

const homeCtrl = require('../controllers/home');

router.get('/', homeCtrl.index);

module.exports = router;
