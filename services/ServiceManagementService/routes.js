const router = require('express').Router();
const ServiceManagementController = require('./controller/serviceManagementController');



router.get('/service/all',  ServiceManagementController.prototype.getAllServices);
router.get('/service/single',  ServiceManagementController.prototype.singleService);
router.get('/service/history', ServiceManagementController.prototype.historyService);

router.get('/service/vipReserved', ServiceManagementController.prototype.getVipReserved);
router.put('/service/vipReserved', ServiceManagementController.prototype.updateVipReserved);

router.get('/service/vip', ServiceManagementController.prototype.getVipServices);
router.put('/service/vip', ServiceManagementController.prototype.updateVipServices);

// router.delete('/survey', ServiceManagementController.prototype.deleteSurvey);

module.exports = router;