const config = require('../../../utility/initializer');

class FinancialRepository {
  constructor() {
  }


  async getStock(inputData) {
    return await config.mongoDB.collection('wallet').findOne(inputData, {projection: {_id: 0}});
  }

  async getFactors(query, inputData) {
    let result = {};
    result.data = await config.mongoDB.collection('factors').find(query, {projection: {_id: 0}})
      .sort({_id: -1})
      .skip((inputData.page - 1) * inputData.limit)
      .limit(inputData.limit)
      .toArray();
    result.totalItem = await config.mongoDB.collection('factors').count();
    return result;
  }

  async getAllFactors(inputData) {
    return await config.mongoDB.collection('factors').find(inputData, {projection: {_id: 0}}).toArray();
  }

}

module.exports = FinancialRepository;