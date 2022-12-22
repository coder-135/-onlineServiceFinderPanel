const config = require('../../../utility/initializer');

class DiscountRepository {
  constructor() {
  }


  async addDiscounts(inputData) {
    await config.mongoDB.collection('discounts').insertMany(inputData);
  }

  async getDiscount(query) {
    return await config.mongoDB.collection('discounts').find(query, {projection: {_id: 0}}).toArray();
  }

  async deleteDiscount(inputData) {
    await config.mongoDB.collection('discounts').deleteMany(inputData);
  }
}

module.exports = DiscountRepository;