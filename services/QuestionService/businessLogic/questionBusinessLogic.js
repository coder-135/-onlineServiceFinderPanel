const QuestionRepository = require('../repository/questionRepository');
const accessManager = require('../../accessManagementService/accessManager');
const us = require('underscore');

class QuestionBusinessLogic {
  constructor() {
  }

  async addSurveyQuestion(inputData) {
    await new QuestionRepository().addSurveyQuestion(inputData);
    delete inputData._id;
    return {
      status: 'success',
      data: {
        message: `ثبت سوال برای نظر سنجی با موفقیت انجام شد`,
        result: inputData
      }
    }
  }
  async getAllSurveyQuestion() {
    const surveyQuestions = await new QuestionRepository().getSurveyQuestion({category: 'survey'});
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
        message: ` سوالات نظر سنجی موفقیت دریافت شد`,
        result: surveyQuestions
      }
    }
  }
  async getSurveyQuestion(inputData) {
    const surveyQuestion = await new QuestionRepository().getSurveyQuestion(inputData);
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
        result: surveyQuestion
      }
    }
  }
  async updateSurveyQuestion(inputData) {
    inputData = await new QuestionRepository().updateSurveyQuestion(inputData);
    return {
      status: 'success',
      data: {
        message: `سوال نظرسنجی با موفقیت آپدیت شد`,
        result: inputData
      }
    }
  }
  async deleteSurveyQuestion(inputData) {
    await new QuestionRepository().deleteSurveyQuestion(inputData);
    return {
      status: 'success',
      data: {
        message: `حذف سوال نظرسنجی با موفقیت انجام شد`,
      }
    }
  }


  async addCancellationQuestion(inputData) {
    await new QuestionRepository().addCancellationQuestion(inputData);
    delete inputData._id;
    return {
      status: 'success',
      data: {
        message: `ثبت سوال برای لغو سرویس با موفقیت انجام شد`,
        result: inputData
      }
    }
  }
  async getAllCancellationQuestion() {
    const cancellationQuestions = await new QuestionRepository().getCancellationQuestion({category: 'cancellation'});
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
        message: ` سوالات لغو سرویس با موفقیت دریافت شد`,
        result: cancellationQuestions
      }
    }
  }
  async getCancellationQuestion(inputData) {
    const cancellationQuestion = await new QuestionRepository().getCancellationQuestion(inputData);
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
        message: `سوال لغو سرویس با موفقیت دریافت شد`,
        result: cancellationQuestion
      }
    }
  }
  async updateCancellationQuestion(inputData) {
    inputData = await new QuestionRepository().updateCancellationQuestion(inputData);
    return {
      status: 'success',
      data: {
        message: `سوال لغو سرویس با موفقیت آپدیت شد`,
        result: inputData
      }
    }
  }
  async deleteCancellationQuestion(inputData) {
    await new QuestionRepository().deleteCancellationQuestion(inputData);
    return {
      status: 'success',
      data: {
        message: `حذف سوال لغو سرویس با موفقیت انجام شد`,
      }
    }
  }

}

module.exports = QuestionBusinessLogic;