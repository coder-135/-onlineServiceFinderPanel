const router = require('express').Router();
const FinancialController = require('./controller/financialController');


router.get('/financial/wallet', FinancialController.prototype.getStock);
router.get('/financial/factors', FinancialController.prototype.getFactors);
router.get('/financial/income', FinancialController.prototype.income);


module.exports = router;