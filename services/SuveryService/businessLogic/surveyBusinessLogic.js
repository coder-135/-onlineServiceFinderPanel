const SurveyRepository = require('../repository/surveyRepository');
const accessManager = require('../../accessManagementService/accessManager');

class SurveyBusinessLogic {
  constructor() {
  }

  async getAllSurvey() {
    const surveys = await new SurveyRepository().getSurvey({});
    return {
      status: 'success',
      data: {
        message: ` نظر سنجی ها با موفقیت دریافت شد`,
        result: surveys
      }
    }
  }
  async getSurvey(inputData) {
    const surveyQuestion = await new SurveyRepository().getSurvey(inputData);
    return {
      status: 'success',
      data: {
        message: `نظرسنجی با موفقیت دریافت شد`,
        result: surveyQuestion
      }
    }
  }
  async updateSurvey(inputData) {
    inputData = await new SurveyRepository().updateSurvey(inputData);
    return {
      status: 'success',
      data: {
        message: `نظرسنجی با موفقیت آپدیت شد`,
        result: inputData
      }
    }
  }
  async deleteSurvey(inputData) {
    await new SurveyRepository().deleteSurvey(inputData);
    return {
      status: 'success',
      data: {
        message: `حذف نظرسنجی با موفقیت انجام شد`,
      }
    }
  }

}

module.exports = SurveyBusinessLogic;