const config = require('../../../utility/initializer');

class AccessManagementRepository {
  constructor() {
  }


  // role
  async addRole(inputData) {
    await config.mongoDB.collection('access').insertOne(inputData);
  }
  async getAllRoles() {
    return await config.mongoDB.collection('access').find({}, {projection: {_id: 0}}).toArray()
  }
  async getRole(inputData) {
    return await config.mongoDB.collection('access').findOne(inputData, {projection: {_id: 0}});
  }
  async updateRole(inputData) {
    await config.mongoDB.collection('access').updateOne({id: inputData.id}, {
      $set: inputData
    });
    return await config.mongoDB.collection('access').findOne({id: inputData.id}, {projection: {_id: 0}});
  }
  async deleteRole(inputData) {
    inputData = await config.mongoDB.collection('access').deleteOne(inputData);
    if (inputData.deletedCount !== 1) {
      throw {
        status: 404,
        data: {
          message: 'داده ای برای حذف شدن یافت نشد'
        }
      }
    }
  }
  async assignFeatureToRole(inputData) {
    await config.mongoDB.collection('access').updateOne({id: inputData.id}, {
      $push: {features: inputData.feature}
    });
    return await config.mongoDB.collection('access').findOne({id: inputData.id}, {projection: {_id: 0}});
  }



  // Feature

  async addFeature(inputData) {
    await config.mongoDB.collection('features').insertOne(inputData);
  }
  async getAllFeatures() {
    return await config.mongoDB.collection('features').find({}, {projection: {_id: 0}}).toArray()
  }
  async getFeature(inputData) {
    return await config.mongoDB.collection('features').findOne(inputData, {projection: {_id: 0}});
  }
  async updateFeature(inputData) {
    await config.mongoDB.collection('features').updateOne({id: inputData.id}, {
      $set: inputData
    });
    return await config.mongoDB.collection('features').findOne({id: inputData.id}, {projection: {_id: 0}});
  }
  async deleteFeature(inputData) {
    inputData = await config.mongoDB.collection('features').deleteOne(inputData);
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

module.exports = AccessManagementRepository;