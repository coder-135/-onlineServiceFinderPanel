const router = require('express').Router();
const EmployeeController = require('./controller/employeeController');
const {uploadAvatar} = require('../../utility/uploader');


router.put('/employee/login', EmployeeController.prototype.login);
router.put('/employee/logout', EmployeeController.prototype.logout);



router.post('/employee', EmployeeController.prototype.addEmployee);
router.get('/employee', EmployeeController.prototype.getEmployee);
router.post('/employee/avatar',uploadAvatar.single('avatar'), EmployeeController.prototype.updateAvatar)
router.put('/employee', EmployeeController.prototype.updateEmployee);
router.delete('/employee', EmployeeController.prototype.deleteEmployee);

module.exports = router;