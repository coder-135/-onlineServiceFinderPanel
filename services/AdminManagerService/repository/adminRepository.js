const config = require('../../../utility/initializer');

class AdminRepository {
  constructor() {
  }

  async getAdmin(field, inputData) {
    return await config.mongoDB.collection('admins').findOne({[field]: inputData}, {projection: {_id: 0}});
  }

}

module.exports = AdminRepository;