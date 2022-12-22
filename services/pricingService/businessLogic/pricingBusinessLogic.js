const PricingRepository = require('../repository/pricingRepository');
const accessManager = require('../../accessManagementService/accessManager');
const us = require('underscore');

class PricingBusinessLogic {
  constructor() {
  }

  async addDistrictPrice(inputData) {
    await new PricingRepository().addDistrictPrice(inputData);
    delete inputData._id;
    return {
      status: 'success',
      data: {
        message: `قیمت دهی برای منطقه ${inputData.district} ${inputData.city}  با موفقیت ثبت شد `,
        result: inputData
      }
    }
  }

  async addRegionalizedCities(inputData) {
    await new PricingRepository().addRegionalizedCities(inputData);
    delete inputData._id;
    return {
      status: 'success',
      data: {
        message: `شهر با موفقیت ثبت شد`,
        result: inputData
      }
    }
  }

  async getRegionalizedCities() {
    let cities = []
    let result = await new PricingRepository().getRegionalizedCities();
    let districts = await new PricingRepository().getAllDistrictPrice();
    districts = us.groupBy(districts, 'city');
    result.map(item => {
      if (!districts[item.city]) {
        cities.push({
          city: item.city,
          districtsCount: 0,
          id:item.id
        })
      }
    });
    Object.keys(districts).map(item => {
      cities.push({
        city: item,
        districtsCount: districts[item].length,
        id: result.filter(item2=>item2.city===item)[0].id
      })
    })

    return {
      status: 'success',
      data: {
        message: `شهر با موفقیت ثبت شد`,
        result: cities
      }
    }
  }
  async deleteRegionalizedCities(inputData) {
    inputData = await new PricingRepository().deleteRegionalizedCities(inputData);
    return {
      status: 'success',
      data: {
        message: `حذف شهر با موفقیت انجام شد`,
        result: inputData
      }
    }
  }

  async getAllDistrictPrice() {
    const costTypes = await new PricingRepository().getAllDistrictPrice();
    if (costTypes.length === 0) {
      throw {
        status: 400,
        data: {
          message: 'قیمت دهی برای هیچ منطقه ای ثبت نشده است'
        }
      }
    }
    return {
      status: 'success',
      data: {
        message: `دریافت مناطق به همراه شیوه قیمت گذاری با موفقیت دریافت شد`,
        result: costTypes
      }
    }
  }

  async getDistrictPrice(inputData) {
    const costTypes = await new PricingRepository().getDistrictPrice(inputData);
    // if (costTypes.length === 0) {
    //   throw {
    //     status: 400,
    //     data: {
    //       message: 'قیمت دهی برای هیچ منطقه ای ثبت نشده است'
    //     }
    //   }
    // }
    return {
      status: 'success',
      data: {
        message: `دریافت مناطق به همراه شیوه قیمت گذاری با موفقیت دریافت شد`,
        result: costTypes
      }
    }
  }

  async updateDistrictPrice(inputData) {
    inputData = await new PricingRepository().updateDistrictPrice(inputData);
    return {
      status: 'success',
      data: {
        message: `دریافت مناطق به همراه شیوه قیمت گذاری با موفقیت دریافت شد`,
        result: inputData
      }
    }
  }

  async deleteDistrictPrice(inputData) {
    await new PricingRepository().deleteDistrictPrice(inputData);
    return {
      status: 'success',
      data: {
        message: `حذف قیمت با موفقیت انجام شد`,
      }
    }
  }

  async addCategoryPrice(inputData) {
    await new PricingRepository().addCategoryPrice(inputData);
    delete inputData._id;
    return {
      status: 'success',
      data: {
        message: `قیمت دسته بندی با موفقیت ثبت شد`,
        result: inputData
      }
    }
  }

  async getAllCategoryPrice() {
    const categoryPrices = await new PricingRepository().getAllCategoryPrice();
    // if (categoryPrices.length === 0) {
    //   throw {
    //     status: 400,
    //     data: {
    //       message: 'برای دسته بندی ها قیمت تعیین نشده است'
    //     }
    //   }
    // }
    return {
      status: 'success',
      data: {
        message: ` قیمت دسته بندی ها موفقیت دریافت شد`,
        result: categoryPrices
      }
    }
  }

  async getCategoryPrice(inputData) {
    const categoryPrice = await new PricingRepository().getCategoryPrice(inputData);
    // if (categoryPrice.length === 0) {
    //   throw {
    //     status: 400,
    //     data: {
    //       message: 'ّبرای دسته بندی مورد نظر قیمت تعیین نشده است'
    //     }
    //   }
    // }
    return {
      status: 'success',
      data: {
        message: `قیمت دسته بندی با موفقیت دریافت شد`,
        result: categoryPrice
      }
    }
  }

  async updateCategoryPrice(inputData) {
    inputData = await new PricingRepository().updateCategoryPrice(inputData);
    return {
      status: 'success',
      data: {
        message: `قیمت دسته بندی با موفقیت آپدیت شد`,
        result: inputData
      }
    }
  }

  async deleteCategoryPrice(inputData) {
    await new PricingRepository().deleteCategoryPrice(inputData);
    return {
      status: 'success',
      data: {
        message: `حذف قیمت با موفقیت انجام شد`,
      }
    }
  }


}

module.exports = PricingBusinessLogic;