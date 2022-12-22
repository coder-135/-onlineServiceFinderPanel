const router = require('express').Router();
const MessagingController = require('./controller/messagingController');


router.post('/message', MessagingController.prototype.addMessage);
router.get('/message', MessagingController.prototype.getMessage);
router.put('/message', MessagingController.prototype.updateMessages);
router.delete('/message', MessagingController.prototype.deleteMessages);

module.exports = router;