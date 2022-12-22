const config = require('../../../utility/initializer');

class PricingRepository {
  constructor() {
  }

  async addDistrictPrice(inputData) {
    const result = await config.mongoDB.collection('districtCost').find({
      city: inputData.city,
      district: inputData.district
    }).toArray();
    if (result.length > 0) {
      throw {
        status: 400,
        data: {
          message: 'برای این منطقه قبلا قیمت دهی ثبت شده است'
        }
      }
    }
    await config.mongoDB.collection('districtCost').insertOne(inputData);
  }

  async getAllDistrictPrice() {
    return await config.mongoDB.collection('districtCost').find({}, {projection: {_id: 0}}).toArray();
  }

  async getDistrictPrice(inputData) {
    return await config.mongoDB.collection('districtCost').find(inputData, {projection: {_id: 0}}).toArray();
  }

  async updateDistrictPrice(inputData) {
    await config.mongoDB.collection('districtCost').updateOne({id: inputData.id}, {
      $set: inputData
    });
    return await config.mongoDB.collection('districtCost').findOne({id: inputData.id}, {projection: {_id: 0}})

  }

  async deleteDistrictPrice(inputData) {
    inputData = await config.mongoDB.collection('districtCost').deleteOne(inputData);
    if (inputData.deletedCount !== 1) {
      throw {
        status: 404,
        data: {
          message: 'داده ای برای حذف شدن یافت نشد'
        }
      }
    }
  }


  async addRegionalizedCities(inputData) {
    const result = await config.mongoDB.collection('regionalizedCities').find({city: inputData.city}).toArray();
    if (result.length > 0) {
      throw {
        status: 400,
        data: {
          message: 'این شهر قبلا ثبت شده است'
        }
      }
    }
    await config.mongoDB.collection('regionalizedCities').insertOne(inputData);
  }

  async getRegionalizedCities() {
    return await config.mongoDB.collection('regionalizedCities').find({}, {projection: {_id: 0}}).toArray();
  }

  async deleteRegionalizedCities(inputData) {
    let result = await config.mongoDB.collection('regionalizedCities').findOne(inputData);
    await config.mongoDB.collection('districtCost').deleteMany({city: result.city});
    inputData = await config.mongoDB.collection('regionalizedCities').deleteOne(inputData);
    if (inputData.deletedCount !== 1) {
      throw {
        status: 404,
        data: {
          message: 'داده ای برای حذف شدن یافت نشد'
        }
      }
    }
  }


  async addCategoryPrice(inputData) {
    await config.redis.hset('categoryPrice', inputData.id, JSON.stringify(inputData));
    await config.mongoDB.collection('categoryCost').insertOne(inputData);
  }

  async getAllCategoryPrice() {
    return await config.mongoDB.collection('categoryCost').find({}, {projection: {_id: 0}}).toArray();
  }

  async getCategoryPrice(inputData) {
    return await config.mongoDB.collection('categoryCost').find(inputData, {projection: {_id: 0}}).toArray();
  }

  async updateCategoryPrice(inputData) {
    await config.mongoDB.collection('categoryCost').updateOne({id: inputData.id}, {
      $set: inputData
    });
    inputData = await config.mongoDB.collection('categoryCost').findOne({id: inputData.id}, {projection: {_id: 0}});
    await config.redis.hset('categoryPrice', inputData.id, JSON.stringify(inputData));
    return inputData
  }

  async deleteCategoryPrice(inputData) {
    await config.redis.hdel('categoryPrice', inputData.id);
    inputData = await config.mongoDB.collection('categoryCost').deleteOne(inputData);

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

module.exports = PricingRepository;