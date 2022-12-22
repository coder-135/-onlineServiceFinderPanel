const router = require('express').Router();
const UserController = require('./controller/adminController');

//لاگین
router.put('/admin/login', UserController.prototype.login);
router.put('/admin/logout', UserController.prototype.logout);


module.exports = router;