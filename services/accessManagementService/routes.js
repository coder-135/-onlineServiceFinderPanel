const router = require('express').Router();
const AccessManagementController = require('./controller/accessManagementController');


// role
router.post('/access/role', AccessManagementController.prototype.addRole);
router.get('/access/role', AccessManagementController.prototype.getRole);
router.put('/access/role', AccessManagementController.prototype.updateRole);
router.delete('/access/role', AccessManagementController.prototype.deleteRole);
router.put('/access/assignRoleToEmployee', AccessManagementController.prototype.assignRoleToEmployee);

router.put('/access/removeFeatureRole', AccessManagementController.prototype.removeFeatureFromRole)



// feature
router.post('/access/feature', AccessManagementController.prototype.addFeature);
router.get('/access/feature', AccessManagementController.prototype.getFeature);
router.put('/access/feature', AccessManagementController.prototype.updateFeature);
router.delete('/access/feature', AccessManagementController.prototype.deleteFeature);

module.exports = router;