const AgentRepository = require('../repository/agentRepository')
const bcrypt = require('bcrypt');
const moment = require("moment-jalaali");
const {activationSms} = require('../../../utility/smsSender')
const uuid = require('uuid');

class AgentBusinessLogic {
  constructor() {
  }

  async addAgent(inputData) {
    const agentData = await new AgentRepository().getAgent('phoneNumber', inputData.phoneNumber);
    if (agentData) {
      throw  {
        status: 409,
        data: {
          message: 'شماره موبایل قبلا در سیستم ثبت شده است '
        }
      }
    }
    const salt = await bcrypt.genSalt(10);
    inputData.password = await bcrypt.hash(inputData.password, salt);
    inputData.agentId = uuid.v4();
    const walletData = {
      id: inputData.agentId,
      nationalId: inputData.nationalId,
      type: 'agent',
      stock: 0
    }
    await new AgentRepository().addAgent(inputData);
    await new AgentRepository().addWallet(walletData);
    delete inputData._id;
    return {
      status: 'success',
      data: {
        message: "کارگذار با موفقیت ثبت شد",
        result: inputData
      }
    }
  }

  async getAgent(inputData) {
    let result = await new AgentRepository().getAgent('agentId', inputData.id);
    if (result) {
      result.lat = result.geoLocation.lat;
      result.lng = result.geoLocation.lng;
      delete result.geoLocation;
    }
    return {
      status: 'success',
      data: {
        message: "کارگذار با موفقیت دریافت شد",
        result: result ? result : null
      }
    }
  }

  async getAllAgents() {
    let result = await new AgentRepository().getAllAgents();
    if (result.length > 0) {
      result = result.map(item => {
        return {
          ...item,
          lat: item.geoLocation.lat,
          lng: item.geoLocation.lng
        }
      }).map(item => {
        delete item.geoLocation
        return item;
      })
    }
    return {
      status: 'success',
      data: {
        message: "کارگذاران با موفقیت دریافت شد",
        result: result ? result : null
      }
    }
  }

  async updateAgent(inputData) {
    const result = await new AgentRepository().updateAgent(inputData);
    return {
      status: 'success',
      data: {
        message: "اطلاعات کارگذار با موفقیت آپدیت شد",
        result
      }
    }
  }

  async updateAgentStatus(inputData) {
    const result = await new AgentRepository().updateAgent(inputData);
    if (!result)
      throw {
        status: 404,
        data: {message: 'کارگذاری یافت نشد'}
      }
    if (inputData.status) {
      const smsData = {
        userPhoneNumber: result.phoneNumber,
        fullName: result.fullName,
      }
      await activationSms(smsData);
    }
    return {
      status: 'success',
      data: {
        message: inputData.status ? " کارگذار با موفقیت فعال و پیامک ارسال شد" : 'وضعیت کارگذار غیرفعال شد' ,
        result
      }
    }
  }

  async deleteAgent(inputData) {
    await new AgentRepository().deleteAgent(inputData);
    return {
      status: 'success',
      data: {
        message: "کارگذار با موفقیت حذف شد",
      }
    }
  }

}

module.exports = AgentBusinessLogic;