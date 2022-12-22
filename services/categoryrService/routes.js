const router = require('express').Router();
const CategoryController = require('./controller/categoryController');
const {uploadCategory} = require('../../utility/uploader');

router.post('/category', uploadCategory.single('category'),CategoryController.prototype.addCategory);

router.get('/category', CategoryController.prototype.getCategory);
router.get('/categories', CategoryController.prototype.getAllCategories);

router.put('/category',uploadCategory.single('category'), CategoryController.prototype.updateCategory);
router.delete('/category', CategoryController.prototype.deleteCategory);




module.exports = router;