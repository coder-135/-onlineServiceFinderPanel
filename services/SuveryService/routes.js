const router = require('express').Router();
const SurveyController = require('./controller/surveyController');


router.get('/survey/', SurveyController.prototype.getSurvey);
router.put('/survey', SurveyController.prototype.updateSurvey);
router.delete('/survey', SurveyController.prototype.deleteSurvey);

module.exports = router;