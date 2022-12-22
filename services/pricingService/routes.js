const router = require('express').Router();
const PricingController = require('./controller/pricingController');


router.post('/pricing/district', PricingController.prototype.addDistrictPrice);
router.get('/pricing/district', PricingController.prototype.getDistrictPrice);
router.put('/pricing/district', PricingController.prototype.updateDistrictPrice);
router.delete('/pricing/district', PricingController.prototype.deleteDistrictPrice);

router.post('/pricing/regionalizedCity',PricingController.prototype.addRegionalizedCities);
router.get('/pricing/regionalizedCity',PricingController.prototype.getRegionalizedCities);
router.delete('/pricing/regionalizedCity',PricingController.prototype.deleteRegionalizedCities);

// router.post('/pricing/category' , PricingController.prototype.addCategoryPrice);
router.get('/pricing/category' , PricingController.prototype.getCategoryPrice);
router.put('/pricing/category' , PricingController.prototype.updateCategoryPrice);
router.delete('/pricing/category' , PricingController.prototype.deleteCategoryPrice);

module.exports = router;