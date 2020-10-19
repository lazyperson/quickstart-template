const router = require('koa-router')();

const userCtrl = require('../controllers/user');
router.prefix('/u');


router.get('/login', userCtrl.login);

module.exports = router;
