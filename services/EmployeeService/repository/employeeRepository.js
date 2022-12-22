const config = require('../../../utility/initializer');

class EmployeeRepository {
  constructor() {
  }

  async addEmployee(inputData) {
    await config.mongoDB.collection('employees').insertOne(inputData);
  }

  async getAllEmployees() {
    return await config.mongoDB.collection('employees').find({}, {projection: {_id: 0}}).toArray()
  }

  async getEmployee(inputData) {
    return await config.mongoDB.collection('employees').findOne(inputData, {projection: {_id: 0}});
  }

  async updateEmployee(inputData) {
    await config.mongoDB.collection('employees').updateOne({id: inputData.id}, {
      $set: inputData
    });
    return await config.mongoDB.collection('employees').findOne({id: inputData.id}, {projection: {_id: 0}});
  }

  async deleteEmployee(inputData) {
    await config.mongoDB.collection('employees').deleteOne(inputData);
  }

}

module.exports = EmployeeRepository;