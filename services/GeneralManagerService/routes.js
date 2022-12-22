const router = require('express').Router();
const GeneralController = require('./controller/generalController');
const {uploadBillboard} = require('../../utility/uploader');
const uuid = require("uuid");
const moment = require("moment-jalaali");

router.post('/general/billboard',
  uploadBillboard.single('billboard'), GeneralController.prototype.addBillboard);

router.get('/general/cities', GeneralController.prototype.getCities);
router.get('/general/provinces', GeneralController.prototype.getProvinces);


router.post('/general/rules', GeneralController.prototype.addRules);
router.get('/general/rules', GeneralController.prototype.getRules);
router.put('/general/rules', GeneralController.prototype.updateRules);
router.delete('/general/rules', GeneralController.prototype.deleteRules);

router.post('/general/skill', GeneralController.prototype.addSkills);
router.get('/general/skill', GeneralController.prototype.getSkills);
router.delete('/general/skill', GeneralController.prototype.deleteSkills);

router.post('/general/aboutUs', GeneralController.prototype.addAboutUs);
router.get('/general/aboutUs', GeneralController.prototype.getAboutUs);
router.put('/general/aboutUs', GeneralController.prototype.updateAboutUs);
router.delete('/general/aboutUs', GeneralController.prototype.deleteAboutUs);

router.post('/general/contactUs', GeneralController.prototype.addContactUs);
router.get('/general/contactUs', GeneralController.prototype.getContactUs);
router.put('/general/contactUs', GeneralController.prototype.updateContactUs);
router.delete('/general/contactUs', GeneralController.prototype.deleteContactUs);

router.post('/general/prize', GeneralController.prototype.addPrize);
router.get('/general/prize', GeneralController.prototype.getPrize);
router.put('/general/prize', GeneralController.prototype.updatePrize);
router.delete('/general/prize', GeneralController.prototype.deletePrize);

router.post('/general/updateLinks', GeneralController.prototype.addUpdateLinks);
router.get('/general/updateLinks', GeneralController.prototype.getUpdateLinks);
router.put('/general/updateLinks', GeneralController.prototype.updateUpdateLinks);
router.delete('/general/updateLinks', GeneralController.prototype.deleteUpdateLinks);

router.post('/general/guide', GeneralController.prototype.addGuide);
router.get('/general/guide', GeneralController.prototype.getGuide);
router.put('/general/guide', GeneralController.prototype.updateGuide);
router.delete('/general/guide', GeneralController.prototype.deleteGuide);


router.get('/general/dailyVisit', GeneralController.prototype.getDailyVisit)
router.get('/general/onlineUsers', GeneralController.prototype.getOnlineUsers)

module.exports = router;