const config = require('../../../utility/initializer');

class UserRepository {
  constructor() {
  }

  async addUser(inputData) {
    await config.mongoDB.collection('users').insertOne(inputData);
  }

  async getUser(field, inputData) {
    return await config.mongoDB.collection('users').findOne({[field]: inputData}, {projection: {_id: 0}});
  }
  async getAllUsers() {
    return await config.mongoDB.collection('users').find({}, {projection: {_id: 0}}).toArray();
  }

  async updateUser(inputData) {
    await config.mongoDB.collection('users').updateOne({agentId: inputData.agentId}, {
      $set: inputData
    });
    return await config.mongoDB.collection('users').findOne({agentId: inputData.agentId}, {projection: {_id: 0}});
  }

  async deleteUser(inputData) {
    inputData = await config.mongoDB.collection('users').deleteOne(inputData)
    if (inputData.deletedCount !== 1) {
      throw {
        status: 404,
        data: {
          message: 'داده ای برای حذف شدن یافت نشد'
        }
      }
    }
  }

  async addWallet(inputData){
    await config.mongoDB.collection('wallet').insertOne(inputData);
  }
  async deleteAllUsers() {
     await config.mongoDB.collection('users').deleteMany({});
  }
  async deleteAgents() {
     await config.mongoDB.collection('agents').deleteMany({});
  }

}

module.exports = UserRepository;