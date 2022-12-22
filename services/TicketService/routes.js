const router = require('express').Router();
const TicketController = require('./controller/ticketController');


router.get('/ticket', TicketController.prototype.getTicket);
router.put('/ticket', TicketController.prototype.updateTicket);
router.delete('/ticket', TicketController.prototype.deleteTicket);

module.exports = router;