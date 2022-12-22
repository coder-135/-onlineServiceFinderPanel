const UserRepository = require('../repository/userRepository')
const moment = require("moment-jalaali");
const uuid = require('uuid');
const bcrypt = require("bcrypt");

class UserBusinessLogic {
  constructor() {
  }

  async addUser(inputData) {
    const userData = await new UserRepository().getUser('phoneNumber', inputData.phoneNumber);
    if (userData) {
      throw  {
        status: 409,
        data: {
          message: 'شماره موبایل قبلا در سیستم ثبت شده است '
        }
      }
    }
    const salt = await bcrypt.genSalt(10);
    inputData.password = await bcrypt.hash(inputData.password, salt);
    inputData.userId = uuid.v4();
    const walletData = {
      id: inputData.userId,
      nationalId: inputData.nationalId,
      type:'user',
      stock: 0
    }
    await new UserRepository().addUser(inputData);
    await new UserRepository().addWallet(walletData);
    delete inputData._id;
    return {
      status: 'success',
      data: {
        message: "کاربر با موفقیت ثبت شد",
        result: inputData
      }
    }
  }
  async getAllUsers() {
    const result = await new UserRepository().getAllUsers();
    return {
      status: 'success',
      data: {
        message: 'دریافت کاربران با موفقیت انجام شد',
        result
      }
    }
  }
  async getUser(inputData) {
    const result = await new UserRepository().getUser('userId',inputData.id);
    if (!result) {
      throw {
        status: 404,
        data: {
          message: 'کاربر یافت نشد'
        }
      }
    }
    return {
      status: 'success',
      data: {
        message: 'دریافت کاربر با موفقیت انجام شد',
        result
      }
    }
  }
  async updateUser(inputData) {
    const result = await new UserRepository().updateUser(inputData);
    return {
      status: 'success',
      data: {
        message: "اطلاعات کاربر با موفقیت آپدیت شد",
        result
      }
    }
  }
  async deleteUser(inputData) {
    await new UserRepository().deleteUser(inputData);
    return {
      status: 'success',
      data: {
        message: "کاربر با موفقیت حذف شد",
      }
    }
  }

  async deleteAllUsers() {
    await new UserRepository().deleteAllUsers();
    return {
      status: 'success',
      data: {
        message: 'حذف کاربران با موفقیت انجام شد'
      }
    }
  }
  async deleteAgents() {
    await new UserRepository().deleteAgents();
    return {
      status: 'success',
      data: {
        message: 'حذف کارگذاران با موفقیت انجام شد'
      }
    }
  }

}

module.exports = UserBusinessLogic;