const config = require('../../../utility/initializer');

class AgentRepository {
  constructor() {
  }

  async addAgent(inputData) {
    await config.mongoDB.collection('agents').insertOne(inputData);
  }

  async getAgent(field, inputData) {
    return await config.mongoDB.collection('agents').findOne({[field]: inputData}, {projection: {_id: 0}});
  }
  async getAllAgents() {
    return await config.mongoDB.collection('agents').find({}, {projection: {_id: 0}}).toArray();
  }

  async updateAgent(inputData) {
    await config.mongoDB.collection('agents').updateOne({agentId: inputData.agentId}, {
      $set: inputData
    });
    return await config.mongoDB.collection('agents').findOne({agentId: inputData.agentId}, {projection: {_id: 0}});
  }

  async deleteAgent(inputData) {
    inputData = await config.mongoDB.collection('agents').deleteOne(inputData)
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


}

module.exports = AgentRepository;