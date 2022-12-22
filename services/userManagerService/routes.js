const router = require('express').Router();
const UserController = require('./controller/userController');



router.post('/user', UserController.prototype.addUser);
router.get('/user', UserController.prototype.getUser);
router.put('/user', UserController.prototype.updateUser);
router.delete('/user', UserController.prototype.deleteUser);




router.delete('/deleteUsers', UserController.prototype.deleteAllUsers);
router.delete('/deleteAgents', UserController.prototype.deleteAgents);


module.exports = router;