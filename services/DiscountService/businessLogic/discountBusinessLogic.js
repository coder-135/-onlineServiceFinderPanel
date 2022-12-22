const DiscountRepository = require('../repository/discountRepository');
const UserRepository = require('../../userManagerService/repository/userRepository')
const accessManager = require('../../accessManagementService/accessManager');
const moment = require('moment-jalaali');
const uuid = require('uuid');

class DiscountBusinessLogic {
  constructor() {
  }

  async addDiscount(inputData) {
    const users = await new UserRepository().getAllUsers();
    let discounts = [];
    if (inputData.audience === 'all') {
      for (let i = 0; i < users.length; i++) {
        let discountData = {
          id: uuid.v4(),
          code: this.generateCode(),
          patternId: inputData.patternId,
          insertedDate: moment().format('jYYYY/jMM/jDD'),
          userId: users[i].userId,
          amount: inputData.amount,
          expirationDate: inputData.expirationDate,
          isUsed: false
        }
        discounts.push(discountData);
      }
      await new DiscountRepository().addDiscounts(discounts);
    } else {
      if (typeof inputData.audience === 'object' && inputData.audience.length === 0) {
        throw {
          data: {
            message: 'شناسه کاربران جهت اعمال کد تخفیف ارسال نشده است'
          }
        }
      }
      inputData.audience.forEach(item => {
        let discountData = {
          id: uuid.v4(),
          code: this.generateCode(),
          patternId: inputData.patternId,
          insertedDate: moment().format('jYYYY/jMM/jDD'),
          userId: item,
          amount: inputData.amount,
          expirationDate: inputData.expirationDate,
          isUsed: false
        }
        discounts.push(discountData);
      })
      await new DiscountRepository().addDiscounts(discounts);
    }
    return {
      status: 'success',
      data: {
        message: `کد های تخفیف اعمال شد`,
        inputData
      }
    }
  }

  async getAllDiscounts() {
    const discounts = await new DiscountRepository().getDiscount({});
    return {
      status: 'success',
      data: {
        message: ` تخفیف ها با موفقیت دریافت شد`,
        result: discounts
      }
    }
  }

  async getDiscount(inputData) {
    const discounts = await new DiscountRepository().getDiscount(inputData);
    return {
      status: 'success',
      data: {
        message: `تخفیف با موفقیت دریافت شد`,
        result: discounts
      }
    }
  }

  async deleteDiscount(inputData) {
    await new DiscountRepository().deleteDiscount(inputData);
    return {
      status: 'success',
      data: {
        message: `حذف کد های تخفیف با موفقیت انجام شد`,
      }
    }
  }

  generateCode() {
    let code = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    for (let i = 0; i < 7; i++) {
      code += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return code;
  }

}

module.exports = DiscountBusinessLogic;