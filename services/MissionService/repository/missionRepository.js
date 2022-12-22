const config = require('../../../utility/initializer');

class MissionRepository {
  constructor() {
  }

  async addMission(inputData) {
    await config.mongoDB.collection('missions').insertOne(inputData);
  }

  async getAllMissions() {
    return await config.mongoDB.collection('missions').find({}, {projection: {_id: 0}}).toArray()
  }

  async getMission(inputData) {
    return await config.mongoDB.collection('missions').findOne(inputData, {projection: {_id: 0}});
  }

  async updateMission(inputData) {
    await config.mongoDB.collection('missions').updateOne({id: inputData.id}, {
      $set: inputData
    });

    return await config.mongoDB.collection('missions').findOne({id: inputData.id}, {projection: {_id: 0}});
  }

  async deleteMission(inputData) {
    inputData = await config.mongoDB.collection('missions').deleteOne(inputData);
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

module.exports = MissionRepository;