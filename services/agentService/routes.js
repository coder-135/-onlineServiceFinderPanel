const router = require('express').Router();
const AgentController = require('./controller/agentController');



router.post('/agent', AgentController.prototype.addAgent);
router.get('/agent', AgentController.prototype.getAgent);
router.put('/agent', AgentController.prototype.updateAgent);
router.put('/agent/status', AgentController.prototype.updateAgentStatus);
router.delete('/agent', AgentController.prototype.deleteAgent);



module.exports = router;