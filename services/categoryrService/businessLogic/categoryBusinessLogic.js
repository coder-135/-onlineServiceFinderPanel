const CategoryRepository = require('../repository/categoryRepository')
const moment = require("moment-jalaali");
const PricingRepository = require('../../pricingService/repository/pricingRepository');
const uuid = require('uuid');

class CategoryBusinessLogic {
  constructor() {
  }

  async addCategory(inputData) {
    const pricingCategory = {
      name: inputData.name,
      id: inputData.id,
      cost: 0,
      percentInterest: 0
    }

    await new PricingRepository().addCategoryPrice(pricingCategory);
    await new CategoryRepository().addCategory(inputData);
    delete inputData._id;
    return {
      status: 'success',
      data: {
        message: 'عملیات درج با موفقیت انجام شد',
        result: inputData
      }
    }
  }

  async getAllCategories() {
    const result = await new CategoryRepository().getAllCategories();
    if (!result) {
      throw {
        status: 404,
        data: {
          message: 'دسته بندی یافت نشد'
        }
      }
    }
    return {
      status: 'success',
      data: {
        message: 'دریافت دسته بندی ها با موفقیت انجام شد',
        result
      }
    }
  }

  async getAllCategoriesAndSubCategories() {
    const result = await new CategoryRepository().getAllCategoriesAndSubCategories();
    if (!result) {
      throw {
        status: 404,
        data: {
          message: 'دسته بندی یافت نشد'
        }
      }
    }
    return {
      status: 'success',
      data: {
        message: 'دریافت دسته بندی ها با موفقیت انجام شد',
        result
      }
    }
  }

  async getCategory(inputData) {
    const result = await new CategoryRepository().getCategory(inputData);
    if (!result) {
      throw {
        status: 404,
        data: {
          message: 'دسته بندی یافت نشد'
        }
      }
    }
    return {
      status: 'success',
      data: {
        message: 'دریافت دسته بندی ها با موفقیت انجام شد',
        result
      }
    }
  }

  async updateCategory(inputData) {
    const result = await new CategoryRepository().updateCategory(inputData);
    if (!result) {
      throw {
        status: 404,
        data: {
          message: 'دسته بندی برای آپدیت وجود ندارد'
        }
      }
    }
    return {
      status: 'success',
      data: {
        message: 'دسته بندی با موفقیت آپدیت شد',
        result
      }
    }
  }

  async deleteCategory(inputData) {
    const categoryDetail = await new CategoryRepository().getCategory(inputData);
    if (categoryDetail[0].type === 1) {
      let categories = await new CategoryRepository().getCategory({parentCategoryId: inputData.id});
      for (let i = 0; i < categories.length; i++) {
        await new CategoryRepository().deleteCategory({id: categories[i].id})
      }
    }
    await new CategoryRepository().deleteCategory(inputData);
    return {
      status: 'success',
      data: {
        message: 'دسته بندی با موفقیت حذف شد'
      }
    }
  }
}

module.exports = CategoryBusinessLogic;