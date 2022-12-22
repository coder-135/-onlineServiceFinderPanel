const config = require('../../../utility/initializer');

class GeneralRepository {
  constructor() {
  }


  async addBillboard(inputData) {
    await config.mongoDB.collection('billboards').insertOne(inputData);
  }


  async addRules(inputData) {
    await config.mongoDB.collection('rules').insertOne(inputData);
  }

  async getRules() {
    return await config.mongoDB.collection('rules').find({}, {projection: {_id: 0}}).toArray();
  }

  async updateRules(inputData) {
    await config.mongoDB.collection('rules').updateOne({id: inputData.id}, {
      $set: inputData
    });
    return await config.mongoDB.collection('rules').findOne({id: inputData.id}, {projection: {_id: 0}});
  }

  async deleteRules(inputData) {
    inputData = await config.mongoDB.collection('rules').deleteOne(inputData)
    if (inputData.deletedCount !== 1) {
      throw {
        status: 404,
        data: {
          message: 'داده ای برای حذف شدن یافت نشد'
        }
      }
    }
  }


  async addSkills(inputData) {
    await config.mongoDB.collection('skills').insertOne(inputData);
  }

  async getSkills() {
    return await config.mongoDB.collection('skills').find({}, {projection: {_id: 0}}).toArray();
  }

  async deleteSkills(inputData) {
    inputData = await config.mongoDB.collection('skills').deleteOne(inputData);
    if (inputData.deletedCount !== 1) {
      throw {
        status: 404,
        data: {
          message: 'داده ای برای حذف شدن یافت نشد'
        }
      }
    }
  }


  async addAboutUs(inputData) {
    await config.mongoDB.collection('about').insertOne(inputData);
  }

  async getAboutUs() {
    return await config.mongoDB.collection('about').find({}, {projection: {_id: 0}}).toArray();
  }

  async updateAboutUs(inputData) {
    await config.mongoDB.collection('about').updateOne({id: inputData.id}, {
      $set: inputData
    });
    return await config.mongoDB.collection('about').findOne({id: inputData.id}, {projection: {_id: 0}});
  }

  async deleteAboutUs(inputData) {
    inputData = await config.mongoDB.collection('about').deleteOne(inputData);
    if (inputData.deletedCount !== 1) {
      throw {
        status: 404,
        data: {
          message: 'داده ای برای حذف شدن یافت نشد'
        }
      }
    }
  }


  async addContactUs(inputData) {
    await config.mongoDB.collection('contact').insertOne(inputData);
  }

  async getContactUs() {
    return await config.mongoDB.collection('contact').find({}, {projection: {_id: 0}}).toArray();
  }

  async updateContactUs(inputData) {
    await config.mongoDB.collection('contact').updateOne({id: inputData.id}, {
      $set: inputData
    });
    return await config.mongoDB.collection('contact').findOne({id: inputData.id}, {projection: {_id: 0}});
  }

  async deleteContactUs(inputData) {
    inputData = await config.mongoDB.collection('contact').deleteOne(inputData);
    if (inputData.deletedCount !== 1) {
      throw {
        status: 404,
        data: {
          message: 'داده ای برای حذف شدن یافت نشد'
        }
      }
    }
  }

  async addPrize(inputData) {
    await config.mongoDB.collection('prizes').insertOne(inputData);
  }

  async getPrizes() {
    return await config.mongoDB.collection('prizes').find({}, {projection: {_id: 0}}).toArray();
  }

  async getPrize(inputData) {
    return await config.mongoDB.collection('prizes').findOne(inputData, {projection: {_id: 0}});
  }

  async updatePrize(inputData) {
    await config.mongoDB.collection('prizes').updateOne({id: inputData.id}, {
      $set: inputData
    });
    return await config.mongoDB.collection('prizes').findOne({id: inputData.id}, {projection: {_id: 0}});
  }

  async deletePrize(inputData) {
    inputData = await config.mongoDB.collection('prizes').deleteOne(inputData);
    if (inputData.deletedCount !== 1) {
      throw {
        status: 404,
        data: {
          message: 'داده ای برای حذف شدن یافت نشد'
        }
      }
    }
  }

  async addUpdateLinks(inputData) {
    await config.mongoDB.collection('links').insertOne(inputData);
  }

  async getUpdateLinks() {
    return await config.mongoDB.collection('links').find({}, {projection: {_id: 0}}).toArray();
  }

  async updateUpdateLinks(inputData) {
    await config.mongoDB.collection('links').updateOne({id: inputData.id}, {
      $set: inputData
    });
    return await config.mongoDB.collection('links').findOne({id: inputData.id}, {projection: {_id: 0}});
  }

  async deleteUpdateLinks(inputData) {
    inputData = await config.mongoDB.collection('links').deleteOne(inputData);
    if (inputData.deletedCount !== 1) {
      throw {
        status: 404,
        data: {
          message: 'داده ای برای حذف شدن یافت نشد'
        }
      }
    }
  }

  async addGuide(inputData) {
    await config.mongoDB.collection('guide').insertOne(inputData);
  }

  async getGuide() {
    return await config.mongoDB.collection('guide').find({}, {projection: {_id: 0}}).toArray();
  }

  async updateGuide(inputData) {
    await config.mongoDB.collection('guide').updateOne({id: inputData.id}, {
      $set: inputData
    });
    return await config.mongoDB.collection('guide').findOne({id: inputData.id}, {projection: {_id: 0}});
  }

  async deleteGuide(inputData) {
    inputData = await config.mongoDB.collection('guide').deleteOne(inputData);
    if (inputData.deletedCount !== 1) {
      throw {
        status: 404,
        data: {
          message: 'داده ای برای حذف شدن یافت نشد'
        }
      }
    }
  }

  async getDailyVisit(inputData) {
    return await config.mongoDB.collection('dailyVisit').find(inputData, {projection: {_id: 0}}).toArray();
  }

  async getOnlineUsers() {
    let res = await config.redis.hgetall('onlineUsers');
    res = Object.values(res).map(item=>{
      return JSON.parse(item)
    })
    return res;
  }
  async getOnlineAgents() {
    let res = await config.redis.hgetall('onlineAgents');
    res = Object.values(res).map(item=>{
      return JSON.parse(item)
    })
    return res;
  }


  async getProvinces() {
    return await config.mongoDB.collection('provinces').find({}).toArray();
  }

  async getCities() {
    return await config.mongoDB.collection('cities').find({}).toArray();
  }
}

module.exports = GeneralRepository;