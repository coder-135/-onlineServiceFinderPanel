const CategoryBusinessLogic = require('../businessLogic/categoryBusinessLogic');
const Validator = require('../../../utility/validator');
const {categorySchema, subCategorySchema, miniSubCategorySchema} = require('../../../utility/schema');
const moment = require("moment-jalaali");

class CategoryController {
  constructor() {
  }

  async addCategory(req, res) {
    try {
      if (!req.file) throw {
        status: 400,
        data: {message: 'آیکون انتخاب نشده است'}
      }
      let inputData = {}
      /*
      نوع 1 دسته بندی
            نوع 2 زیر شاخه
      نوع 3 زیر شاخه لایه دوم
       */
      const categoryType = +req.body.type;

      if (categoryType === 1)
        await new Validator().validate(req.body, categorySchema);
      else if (categoryType === 2)
        await new Validator().validate(req.body, subCategorySchema);
      else if (categoryType === 3)
        await new Validator().validate(req.body, miniSubCategorySchema);


      inputData = req.body;
      inputData.type = +inputData.type;
      inputData.iconUrl = `http://hivepanell.ir/uploads/category/${req.file.filename}`;
      inputData.id = req.categoryId;
      inputData.date = moment().format('jYYYY/jMM/jDD');
      inputData.time = moment().format('HH:mm:ss');
      let result = await new CategoryBusinessLogic().addCategory(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async getCategory(req, res) {
    try {
      let inputData = {};
      if (+req.query.type === 2) {
        inputData.type = 2;
        inputData.parentCategoryId = req.query.id
      }
      if (+req.query.type === 3) {
        inputData.type = 3;
        inputData.subParentCategoryId = req.query.id
      }
      let result = await new CategoryBusinessLogic().getCategory(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async getAllCategories(req, res) {
    try {
      let result;
      if (req.query.all) {
        result = await new CategoryBusinessLogic().getAllCategoriesAndSubCategories();
        res.status(200).send(result);
      } else {
        result = await new CategoryBusinessLogic().getAllCategories();
        res.status(200).send(result);
      }

    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async updateCategory(req, res) {
    try {
      if (!req.body.id) {
        throw {
          status: 400,
          data: {
            message: 'شناسه دسته بندی ارسال نشده است'
          }
        }
      }
      let inputData = req.body;
      if (req.file) {
        inputData.iconUrl = `http://37.152.181.240/uploads/category/${req.file.filename}`;
      }
      let result = await new CategoryBusinessLogic().updateCategory(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async deleteCategory(req, res) {
    try {
      if (!req.query.id) {
        throw {
          status: 400,
          data: {
            message: 'شناسه دسته بندی ارسال نشده است'
          }
        }
      }
      const inputData = {id: req.query.id}
      let result = await new CategoryBusinessLogic().deleteCategory(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }


}

module.exports = CategoryController;