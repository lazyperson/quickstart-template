const router = require('koa-router')();

const userCtrl = require('../controllers/user');
router.prefix('/user');


router.get('/login', userCtrl.login);

router.post('/login', userCtrl.login2);


router.get('/admin', userCtrl.admin);

module.exports = router;
