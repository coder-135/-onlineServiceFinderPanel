const router = require('express').Router();
const DiscountController = require('./controller/discountController');


router.post('/discount', DiscountController.prototype.addDiscount);
router.get('/discount', DiscountController.prototype.getDiscount);
router.delete('/discount', DiscountController.prototype.deleteDiscount);

module.exports = router;