const GeneralRepository = require('../repository/generalRepository')
const uuid = require('uuid');


class GeneralBusinessLogic {
  constructor() {
  }

  async addBillboard(inputData) {
    await new GeneralRepository().addBillboard(inputData);
    return {
      status: 'success',
      data: {
        message: "بیلبورد با موفقیت آپلود شد",
        result: inputData
      }
    }
  }


  async addRules(inputData) {
    await new GeneralRepository().addRules(inputData);
    delete inputData._id;
    return {
      status: 'success',
      data: {
        message: "قوانین با موفقیت اضافه شد",
        result: inputData
      }
    }
  }

  async getRules() {
    const result = await new GeneralRepository().getRules();
    return {
      status: 'success',
      data: {
        message: "قوانین با موفقیت دریافت شد",
        result: result ? result[0] : null
      }
    }
  }

  async updateRules(inputData) {
    const result = await new GeneralRepository().updateRules(inputData);
    return {
      status: 'success',
      data: {
        message: "قوانین با موفقیت آپدیت شد",
        result
      }
    }
  }

  async deleteRules(inputData) {
    await new GeneralRepository().deleteRules(inputData);
    return {
      status: 'success',
      data: {
        message: "قوانین با موفقیت حذف شد",
      }
    }
  }

  async addSkills(inputData) {
    await new GeneralRepository().addSkills(inputData);
    delete inputData._id;
    return {
      status: 'success',
      data: {
        message: "مهارت با موفقیت اضافه شد",
        result: inputData
      }
    }
  }

  async getSkills() {
    const result = await new GeneralRepository().getSkills();
    return {
      status: 'success',
      data: {
        message: "مهارت ها با موفقیت دریافت شد",
        result: result
      }
    }
  }

  async deleteSkills(inputData) {
    await new GeneralRepository().deleteSkills(inputData);
    return {
      status: 'success',
      data: {
        message: "مهارت با موفق حذف شد",
      }
    }
  }


  async addAboutUs(inputData) {
    await new GeneralRepository().addAboutUs(inputData);
    delete inputData._id;
    return {
      status: 'success',
      data: {
        message: "درباره ما با موفقیت اضافه شد",
        result: inputData
      }
    }
  }

  async getAboutUs() {
    const result = await new GeneralRepository().getAboutUs();
    return {
      status: 'success',
      data: {
        message: "درباره ما با موفقیت دریافت شد",
        result: result[0]
      }
    }
  }

  async updateAboutUs(inputData) {
    const result = await new GeneralRepository().updateAboutUs(inputData);
    return {
      status: 'success',
      data: {
        message: "درباره ما با موفقیت آپدیت شد",
        result
      }
    }
  }

  async deleteAboutUs(inputData) {
    await new GeneralRepository().deleteAboutUs(inputData);
    return {
      status: 'success',
      data: {
        message: "درباره ما با موفقیت حذف شد",
      }
    }
  }

  async addContactUs(inputData) {
    await new GeneralRepository().addContactUs(inputData);
    delete inputData._id;
    return {
      status: 'success',
      data: {
        message: "تماس با ما موفقیت اضافه شد",
        result: inputData
      }
    }
  }

  async getContactUs() {
    const result = await new GeneralRepository().getContactUs();
    return {
      status: 'success',
      data: {
        message: "تماس با ما موفقیت دریافت شد",
        result: result[0]
      }
    }
  }

  async updateContactUs(inputData) {
    const result = await new GeneralRepository().updateContactUs(inputData);
    return {
      status: 'success',
      data: {
        message: "تماس با ما موفقیت آپدیت شد",
        result
      }
    }
  }

  async deleteContactUs(inputData) {
    await new GeneralRepository().deleteContactUs(inputData);
    return {
      status: 'success',
      data: {
        message: "تماس با ما موفقیت حذف شد",
      }
    }
  }

  async addPrize(inputData) {
    await new GeneralRepository().addPrize(inputData);
    delete inputData._id;
    return {
      status: 'success',
      data: {
        message: "جایزه با موفقیت اضافه شد",
        result: inputData
      }
    }
  }

  async getAllPrizes() {
    const result = await new GeneralRepository().getPrizes();
    return {
      status: 'success',
      data: {
        message: "جوایز ما موفقیت دریافت شد",
        result
      }
    }
  }

  async getPrize(inputData) {
    const result = await new GeneralRepository().getPrize(inputData);
    return {
      status: 'success',
      data: {
        message: "جایزه ما موفقیت دریافت شد",
        result
      }
    }
  }

  async updatePrize(inputData) {
    const result = await new GeneralRepository().updatePrize(inputData);
    return {
      status: 'success',
      data: {
        message: "تماس با ما موفقیت آپدیت شد",
        result
      }
    }
  }

  async deletePrize(inputData) {
    await new GeneralRepository().deletePrize(inputData);
    return {
      status: 'success',
      data: {
        message: "جایزه با موفقیت حذف شد",
      }
    }
  }

  async addUpdateLinks(inputData) {
    await new GeneralRepository().addUpdateLinks(inputData);
    delete inputData._id;
    return {
      status: 'success',
      data: {
        message: "لینک های آپدیت با موفقیت اضافه شد",
        result: inputData
      }
    }
  }

  async getUpdateLinks() {
    const result = await new GeneralRepository().getUpdateLinks();
    return {
      status: 'success',
      data: {
        message: "لینک های آپدیت با موفقیت دریافت شد",
        result: result[0]
      }
    }
  }

  async updateUpdateLinks(inputData) {
    const result = await new GeneralRepository().updateUpdateLinks(inputData);
    return {
      status: 'success',
      data: {
        message: "لینک های آپدیت با موفقیت ویرایش شد",
        result
      }
    }
  }

  async deleteUpdateLinks(inputData) {
    await new GeneralRepository().deleteUpdateLinks(inputData);
    return {
      status: 'success',
      data: {
        message: "لینک های آپدیت با موفقیت حذف شد",
      }
    }
  }

  async addGuide(inputData) {
    await new GeneralRepository().addGuide(inputData);
    delete inputData._id;
    return {
      status: 'success',
      data: {
        message: "توضیحات راهنما با موفقیت اضافه شد",
        result: inputData
      }
    }
  }

  async getGuide() {
    const result = await new GeneralRepository().getGuide();
    return {
      status: 'success',
      data: {
        message: "توضیحات راهنما با موفقیت دریافت شد",
        result: result[0]
      }
    }
  }

  async updateGuide(inputData) {
    const result = await new GeneralRepository().updateGuide(inputData);
    return {
      status: 'success',
      data: {
        message: "توضیحات راهنما با موفقیت ویرایش شد",
        result
      }
    }
  }

  async deleteGuide(inputData) {
    await new GeneralRepository().deleteGuide(inputData);
    return {
      status: 'success',
      data: {
        message: "توضیحات راهنما با موفقیت حذف شد",
      }
    }
  }

  async getDailyVisit(inputData) {
    let result = await new GeneralRepository().getDailyVisit(inputData);
    if(result.length === 0) {
      result = [{
        id: uuid.v4(),
        date: inputData.date,
        viewCounter: 0,
        pageViewCounter: 0,
        type: 'user'
      }]
    }
    return {
      status: 'success',
      data: {
        message: "بازدید های روزانه اپ های کاربر و کارگذار با موفقیت دریافت شد",
        result: result[0]
      }
    }
  }

  async getOnlineUsers() {
    let users = await new GeneralRepository().getOnlineUsers();
    let agents = await new GeneralRepository().getOnlineAgents();

    const result = {
      users,
      agents
    }
    return {
      status: 'success',
      data: {
        message: "کارگذاران و کاربران با موفقیت دریافت شد",
        result
      }
    }
  }


  async getCities() {
    const result = await new GeneralRepository().getCities();
    return {
      status: 'success',
      data: {
        message: "دریافت شهر ها با موفقیت انجام شد",
        result
      }
    }
  }

  async getProvinces() {
    const result = await new GeneralRepository().getProvinces();
    return {
      status: 'success',
      data: {
        message: "دریافت استان ها با موفقیت انجام شد",
        result
      }
    }
  }
}


module.exports = GeneralBusinessLogic;