const router = require('express').Router();
const QuestionController = require('./controller/questionController');


router.post('/question/survey', QuestionController.prototype.addSurveyQuestion);
router.get('/question/survey', QuestionController.prototype.getSurveyQuestion);
router.put('/question/survey', QuestionController.prototype.updateSurveyQuestion);
router.delete('/question/survey', QuestionController.prototype.deleteSurveyQuestion);


router.post('/question/cancellation', QuestionController.prototype.addCancellationQuestion);
router.get('/question/cancellation', QuestionController.prototype.getCancellationQuestion);
router.put('/question/cancellation', QuestionController.prototype.updateCancellationQuestion);
router.delete('/question/cancellation', QuestionController.prototype.deleteCancellationQuestion);



module.exports = router;