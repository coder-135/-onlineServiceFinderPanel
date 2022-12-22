const config = require('../../../utility/initializer');

class ServiceManagementRepository {
  constructor() {
  }

  async getAllServices(inputData) {
    return await config.mongoDB.collection('services').find(inputData, {
      projection: {
        _id: 0,
        categoryName: 1,
        serviceCode: 1,
        serviceType:1,
        serviceDate:1
      }
    }).toArray();
  }

  async getServices(inputData) {
    return await config.mongoDB.collection('services').find(inputData, {
      projection: {
        _id: 0
      }
    }).toArray();
  }
  async singleService(inputData) {
    return await config.mongoDB.collection('services').findOne(inputData, {
      projection: {
        _id: 0
      }
    });
  }

  async getVipReserved() {
    return await config.mongoDB.collection('services').find({serviceType: 'reservation',operatorStatus: false},
      {projection: {_id: 0}}).toArray();
  }
  async getVipServices() {
    return await config.mongoDB.collection('services').find({serviceType: 'normal',operatorStatus: false},
      {projection: {_id: 0}}).toArray();
  }

  async updateVipReserved(inputData) {
    await config.mongoDB.collection('services').updateOne({serviceCode: inputData.serviceCode}, {
      $set: inputData
    });
    return await config.mongoDB.collection('services').findOne({serviceCode: inputData.serviceCode},
      {projection: {_id: 0}});
  }

  async updateVipServices(inputData) {
    await config.mongoDB.collection('services').updateOne({serviceCode: inputData.serviceCode}, {
      $set: inputData
    });
    return await config.mongoDB.collection('services').findOne({serviceCode: inputData.serviceCode},
      {projection: {_id: 0}});  }


  //redis Queries

  async updateServicedRedis(inputData) {
    await config.redis.hset('services', inputData.serviceCode, JSON.stringify(inputData));
  }
  async getAgentStatusRedis(inputData) {
   let res = await config.redis.hget('onlineAgents', inputData.agentId);
   return JSON.parse(res);
  }

}

module.exports = ServiceManagementRepository;