const router = require('express').Router();
const MissionController = require('./controller/missionController');


router.post('/mission', MissionController.prototype.addMission);
router.get('/mission', MissionController.prototype.getMission);
router.put('/mission', MissionController.prototype.updateMission);
router.delete('/mission', MissionController.prototype.deleteMission);

module.exports = router;