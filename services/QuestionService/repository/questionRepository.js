const config = require('../../../utility/initializer');

class QuestionRepository {
  constructor() {
  }

  async addSurveyQuestion(inputData) {
    await config.mongoDB.collection('questions').insertOne(inputData);
  }
  async getSurveyQuestion(query) {
    return await config.mongoDB.collection('questions').find(query,{projection: {_id: 0}}).toArray();
  }
  async updateSurveyQuestion(inputData) {
    await config.mongoDB.collection('questions').updateOne({id: inputData.id}, {
      $set: inputData
    });
    return await config.mongoDB.collection('questions').findOne({id: inputData.id}, {projection: {_id: 0}});
  }
  async deleteSurveyQuestion(inputData) {
    inputData = await config.mongoDB.collection('questions').deleteOne(inputData);
    if (inputData.deletedCount !== 1) {
      throw {
        status: 404,
        data: {
          message: 'داده ای برای حذف شدن یافت نشد'
        }
      }
    }
  }



  async addCancellationQuestion(inputData) {
    await config.mongoDB.collection('questions').insertOne(inputData);
  }
  async getCancellationQuestion(query) {
    return await config.mongoDB.collection('questions').find(query).toArray();
  }
  async updateCancellationQuestion(inputData) {
    await config.mongoDB.collection('questions').updateOne({id: inputData.id}, {
      $set: inputData
    });
    return await config.mongoDB.collection('questions').findOne({id: inputData.id}, {projection: {_id: 0}});
  }
  async deleteCancellationQuestion(inputData) {
    inputData = await config.mongoDB.collection('questions').deleteOne(inputData);
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

module.exports = QuestionRepository;