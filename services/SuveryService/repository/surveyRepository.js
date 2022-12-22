const config = require('../../../utility/initializer');

class SurveyRepository {
  constructor() {
  }


  async getSurvey(query) {
    return await config.mongoDB.collection('surveys').find(query).toArray();
  }
  async updateSurvey(inputData) {
    await config.mongoDB.collection('surveys').updateOne({id: inputData.id}, {
      $set: inputData
    });
    return await config.mongoDB.collection('surveys').findOne({id: inputData.id}, {projection: {_id: 0}});
  }
  async deleteSurvey(inputData) {
    inputData = await config.mongoDB.collection('surveys').deleteOne(inputData);
    if (inputData.deletedCount !== 1) {
      throw {
        status: 404,
        data: {
          message: 'داده ای برای حذف شدن یافت نشد'
        }
      }
    }
  }

}

module.exports = SurveyRepository;